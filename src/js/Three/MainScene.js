import {
  ACESFilmicToneMapping,
  Color,
  DirectionalLight,
  Fog,
  Group,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import fragmentShader from "../../glsl/post/fragment.glsl";
import vertexShader from "../../glsl/post/vertex.glsl";
import { texturesMap } from "../utils/assets";
import { guiFolders } from "../utils/Debug";
import { isSafari } from "../utils/misc";
import { mouse } from "../utils/Mouse";
import raf from "../utils/Raf";

export class MainScene extends Scene {
  constructor() {
    super();

    this.resVec2 = new Vector2();
    this.blurVec2 = new Vector2();

    const parameters = {
      tintColor: new Color("#ffffff"),

      // Morning
      // skyBgColor: new Color("#bdbf36"),
      // lightColor: new Color("#47404f"),
      // light2Color: new Color("#c396e8"),
      // cornerColor: new Color("#6600ff"),

      // Morning backup for toto
      skyBgColor: new Color("#e5aa43"),
      cornerColor: new Color("#5a544e"),
      lightColor: new Color("#5a544e"),
      light2Color: new Color("#d8923d"),

      // Day
      // skyBgColor: new Color("#8ea1a9"),
      // cornerColor: new Color("#feffe1"),
      // lightColor: new Color("#4e4313"),
      // light2Color: new Color("#bbbd84"),

      // Night
      // skyBgColor: new Color("#7ad5ff"),
      // cornerColor: new Color("#11051f"),
      // lightColor: new Color("#3e70c1"),
      // light2Color: new Color("#d69ee5"),

      lightIntensity: 0.5,
      light2Intensity: 0.5,
    };
    this.aspectRatio =
      (window.innerWidth * devicePixelRatio) / (window.innerHeight * devicePixelRatio);
    this.sizes = {
      width: Math.min(window.innerWidth, (1440 / devicePixelRatio) * this.aspectRatio),
      height: Math.min(window.innerHeight, 1440 / devicePixelRatio),
    };

    this.canvas = document.querySelector(".webgl");
    this.camera = new PerspectiveCamera(30, this.aspectRatio, isSafari() ? 2 : 1, 35);
    this.camera.updateProjectionMatrix();
    this.cameraContainer = new Group();
    this.cameraContainer.add(this.camera);

    const orbitDebug = {
      enabled: false,
    };

    guiFolders
      .get("camera")
      .add(orbitDebug, "enabled")
      .name("OrbitControls")
      .onChange(() => {
        if (orbitDebug.enabled) {
          raf.unsubscribe("mouse");
          this.controls = new OrbitControls(this.camera, this.canvas);
          this.controls.target = new Vector3(
            this.cameraContainer.position.x,
            this.cameraContainer.position.y,
            this.cameraContainer.position.z - 0.01
          );
          this.add(this.camera);
          this.camera.position.copy(this.cameraContainer.position);
          this.remove(this.cameraContainer);
          this.controls.enableDamping = true;
          this.controls.dampingFactor = 0.05;
          this.controls.enableRotate = true;
          // this.controls.enablePan = false;
          // this.controls.enableZoom = false;
          // this.controls.rotateSpeed = -0.1;
          this.camera.position.z += 3;
          this.controls.enabled = true;
          this.controls.update();
        } else {
          this.controls.dispose();
          this.controls = null;
          raf.subscribe("mouse", mouse.update.bind(mouse));
          this.remove(this.camera);
          this.cameraContainer.add(this.camera);
        }
      });

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      powerPreference: "high-performance",
      antialias: false,
    });
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.stencil = false;
    this.renderer.preserveDrawingBuffer = false;
    this.renderer.depth = false;
    this.renderer.premultipliedAlpha = false;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.background = new Color(parameters.skyBgColor);

    this.cameraContainer.position.set(0, -1, 25);
    this.add(this.cameraContainer);

    const fog = new Fog(parameters.skyBgColor, 20, 35);
    this.fog = fog;

    const directionalLight = new DirectionalLight(
      parameters.lightColor,
      parameters.lightIntensity
    );
    directionalLight.position.set(10, 10, -10);
    this.add(directionalLight);

    const directionalLight2 = new DirectionalLight(
      parameters.light2Color,
      parameters.light2Intensity
    );
    directionalLight2.position.set(-10, 10, 10);
    this.add(directionalLight2);

    const renderScene = new RenderPass(this, this.camera);

    this.composer = new EffectComposer(this.renderer);
    this.composer.setSize(this.sizes.width, this.sizes.height);
    this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.composer.addPass(renderScene);

    const customShader = {
      uniforms: {
        uTime: { value: 0 },
        tDiffuse: { value: null },
        uTintColor: { value: parameters.tintColor },
        uCornerColor: { value: parameters.cornerColor },
        uCornerIntensity: { value: 1 },
        // uCornerSize: { value: 10 },
        uCornerSize: { value: 4.5 },
        // uBlurIntensity: { value: 3.5 },
        uBlurIntensity: { value: 1.75 },
        uNoiseTexture: { value: null },
        uBlurPos: {
          value: this.blurVec2.set(this.sizes.width, this.sizes.height),
          // value: this.blurVec2.set(this.sizes.width * 0.75, this.sizes.height * 1),
        },
        uRes: {
          value: this.resVec2.set(this.sizes.width, this.sizes.height),
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    };

    this.customPass = new ShaderPass(customShader);
    this.composer.addPass(this.customPass);
    this.customPass.material.uniforms.uNoiseTexture.value =
      texturesMap.get("noiseTexture")[0];

    // const effectSobel = new ShaderPass(SobelOperatorShader);
    // effectSobel.uniforms["resolution"].value.x =
    //   window.innerWidth * window.devicePixelRatio ;
    // effectSobel.uniforms["resolution"].value.y =
    //   window.innerHeight * window.devicePixelRatio ;
    // this.composer.addPass( effectSobel );

    const atmosphereFolder = guiFolders.get("atmosphere");
    // atmosphereFolder
    //   .add(() => {
    //     this.composer.removePass(noiseShader);
    //   })
    //   .name("Disable post");

    atmosphereFolder
      .addColor(parameters, "skyBgColor")
      .onChange(() => {
        fog.color.set(parameters.skyBgColor);
        this.background.set(parameters.skyBgColor);
      })
      .name("SkyBgColor");
    atmosphereFolder.add(fog, "near").min(-30).max(30).name("FogNear");
    atmosphereFolder.add(fog, "far").min(30).max(90).name("FogFar");

    const lightFolder = atmosphereFolder.addFolder("Light");
    lightFolder
      .addColor(parameters, "lightColor")
      .onChange(() => {
        directionalLight.color.set(parameters.lightColor);
      })
      .name("Color");
    lightFolder.add(directionalLight, "intensity").min(0).max(10).name("Intensity");
    lightFolder.add(directionalLight.position, "x").min(-30).max(30).name("PosX");
    lightFolder.add(directionalLight.position, "y").min(0).max(30).name("PosY");
    lightFolder.add(directionalLight.position, "z").min(-30).max(30).name("PosZ");

    const light2Folder = atmosphereFolder.addFolder("Light2");
    light2Folder
      .addColor(parameters, "light2Color")
      .onChange(() => {
        directionalLight2.color.set(parameters.light2Color);
      })
      .name("Color");
    light2Folder.add(directionalLight2, "intensity").min(0).max(10).name("Intensity");
    light2Folder.add(directionalLight2.position, "x").min(-30).max(30).name("PosX");
    light2Folder.add(directionalLight2.position, "y").min(0).max(30).name("PosY");
    light2Folder.add(directionalLight2.position, "z").min(-30).max(30).name("PosZ");

    const postGuiFunctions = {
      disablePost: () => {
        this.composer.removePass(this.customPass);
      },
      enablePost: () => {
        this.composer.addPass(this.customPass);
      },
    };

    const postFolder = atmosphereFolder.addFolder("Postprocessing");
    postFolder.add(postGuiFunctions, "disablePost");
    postFolder.add(postGuiFunctions, "enablePost");
    const cornerFolder = postFolder.addFolder("Corner");
    cornerFolder
      .addColor(parameters, "cornerColor")
      .onChange(() => {
        this.customPass.uniforms.uCornerColor.value.set(parameters.cornerColor);
      })
      .name("Color");
    cornerFolder
      .add(this.customPass.uniforms.uCornerIntensity, "value")
      .min(0)
      .max(1)
      .name("Intensity");
    cornerFolder
      .add(this.customPass.uniforms.uCornerSize, "value")
      .min(0)
      .max(10)
      .name("Size");

    const blurFolder = postFolder.addFolder("Blur");
    blurFolder
      .add(this.customPass.uniforms.uBlurIntensity, "value")
      .min(0)
      .max(1)
      .name("Intensity");

    window.addEventListener("resize", this.resize.bind(this));

    // const folder = gui.addFolder("PostProcessing");
    // folder.add(unrealBloomPass, "strength").min(0).max(5).name("Bloom Strength");
    // folder.add(unrealBloomPass, "radius").min(0).max(50).name("Bloom Radius");
    // folder.add(unrealBloomPass, "threshold").min(0).max(1).name("Bloom Threshold");

    raf.subscribe("scene", this.update.bind(this));
  }

  resize() {
    this.aspectRatio =
      (window.innerWidth * devicePixelRatio) / (window.innerHeight * devicePixelRatio);
    this.sizes.width = Math.min(
      window.innerWidth,
      (1440 / devicePixelRatio) * this.aspectRatio
    );
    this.sizes.height = Math.min(window.innerHeight, 1440 / devicePixelRatio);

    this.camera.aspect = this.aspectRatio;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.composer.setSize(this.sizes.width, this.sizes.height);
    this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.customPass.material.uniforms.uBlurPos.value = this.blurVec2.set(
      // this.sizes.width * 0.75,
      this.sizes.width,
      this.sizes.height
    );
    this.customPass.material.uniforms.uRes.value = this.resVec2.set(
      this.sizes.width,
      this.sizes.height
    );
  }

  update() {
    if (this.controls) this.controls.update();

    this.composer.render();
    // this.renderer.render(this, this.camera);
    this.customPass.uniforms.uTime.value = raf.elapsedTime;
  }
}

const mainScene = new MainScene();
export { mainScene };
