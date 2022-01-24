import * as THREE from "three";
import { Group, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import fragmentShader from "../../glsl/post/fragment.glsl";
import vertexShader from "../../glsl/post/vertex.glsl";
import { texturesMap } from "../utils/assets";
import { guiFolders } from "../utils/Debug";
import { mouse } from "../utils/Mouse";
import raf from "../utils/Raf";

export class MainScene extends THREE.Scene {
  constructor() {
    super();

    const parameters = {
      tintColor: new THREE.Color("#ffffff"),

      // Morning
      // skyBgColor: new THREE.Color("#bdbf36"),
      // lightColor: new THREE.Color("#47404f"),
      // light2Color: new THREE.Color("#c396e8"),
      // cornerColor: new THREE.Color("#6600ff"),

      // Morning backup for toto
      skyBgColor: new THREE.Color("#e5ba43"),
      cornerColor: new THREE.Color("#631eb8"),
      lightColor: new THREE.Color("#5a544e"),
      light2Color: new THREE.Color("#d8923d"),

      // Day
      // skyBgColor: new THREE.Color("#8ea1a9"),
      // cornerColor: new THREE.Color("#feffe1"),
      // lightColor: new THREE.Color("#4e4313"),
      // light2Color: new THREE.Color("#bbbd84"),

      // Night
      // skyBgColor: new THREE.Color("#7ad5ff"),
      // cornerColor: new THREE.Color("#11051f"),
      // lightColor: new THREE.Color("#3e70c1"),
      // light2Color: new THREE.Color("#d69ee5"),

      lightIntensity: 0.5,
      light2Intensity: 0.5,
    };

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.canvas = document.querySelector(".webgl");
    this.camera = new THREE.PerspectiveCamera(
      30,
      this.sizes.width / this.sizes.height,
      0.1,
      45
    );
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

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      powerPreference: "high-performance",
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.stencil = false;
    this.renderer.preserveDrawingBuffer = false;
    this.renderer.depth = false;
    this.renderer.premultipliedAlpha = false;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.background = new THREE.Color(parameters.skyBgColor);

    this.cameraContainer.position.set(0, -0.5, 25);
    this.add(this.cameraContainer);
    // this.camera.lookAt(-0.08, 0, 22);

    const fog = new THREE.Fog(parameters.skyBgColor, 20, 45);
    this.fog = fog;

    const directionalLight = new THREE.DirectionalLight(
      parameters.lightColor,
      parameters.lightIntensity
    );
    directionalLight.position.set(10, 10, -10);
    this.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(
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
        uCornerIntensity: { value: 0.79 },
        // uCornerSize: { value: 10 },
        uCornerSize: { value: 2.58 },
        uBlurIntensity: { value: 2 },
        uNoiseTexture: { value: null },
        uBlurPos: {
          value: new THREE.Vector2(window.innerWidth * 0.5, window.innerHeight * 0.5),
        },
        uRes: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
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
    const tintFolder = postFolder.addFolder("Tint");
    tintFolder
      .addColor(parameters, "tintColor")
      .onChange(() => {
        this.customPass.uniforms.uTintColor.value.set(parameters.tintColor);
      })
      .name("Color");

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
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;

    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.composer.setSize(this.sizes.width, this.sizes.height);
    this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
