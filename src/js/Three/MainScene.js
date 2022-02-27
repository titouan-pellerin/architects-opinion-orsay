import fogFragment from "@glsl/customFog/fogFragment.glsl";
import fogParsFragment from "@glsl/customFog/fogParsFragment.glsl";
import fogParsVertex from "@glsl/customFog/fogParsVertex.glsl";
import fogVertex from "@glsl/customFog/fogVertex.glsl";
import {
  ACESFilmicToneMapping,
  Color,
  DirectionalLight,
  Fog,
  Group,
  PerspectiveCamera,
  Scene,
  ShaderChunk,
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
import { mouse } from "../../main";
import { texturesMap } from "../utils/assets";
import { guiFolders } from "../utils/Debug";
import { customFogUniforms, isSafari } from "../utils/misc";
import raf from "../utils/Raf";
import Splitting from "splitting";

export class MainScene extends Scene {
  constructor(gpuTier) {
    super();

    Splitting();

    this.resVec2 = new Vector2();
    this.blurVec2 = new Vector2();

    this.parameters = {
      tintColor: new Color("#ffffff"),
      cornerColor: new Color("#5a544e"),
      lightIntensity: 0.5,
      light2Intensity: 0.5,
      environments: [
        // Checkpoint 0 - Morning
        {
          skyBgColor: new Color("#e5aa43"),
          lightColor: new Color("#5a544e"),
          light2Color: new Color("#d8923d"),
          cornerSize: 4,
          // sunProgress: 0.3,
          sunProgress: 0,
        },
        // Checkpoint 1
        {
          skyBgColor: new Color(0.958643, 0.864793, 0.523806),
          lightColor: new Color(0.60934, 0.562502, 0.513332),
          light2Color: new Color(0.856381, 0.733361, 0.514228),
          cornerSize: 5.188686,
          // sunProgress: 0.3,
          sunProgress: 0.297171,
        },
        // Checkpoint 2
        {
          skyBgColor: new Color(0.995253, 0.98448, 0.681511),
          lightColor: new Color(0.764234, 0.70331, 0.638656),
          light2Color: new Color(0.862015, 0.830539, 0.680415),
          cornerSize: 5.906854,
          // sunProgress: 0.3,
          sunProgress: 0.476714,
        },
        // Checkpoint 3
        {
          skyBgColor: new Color(0.739699, 0.9178, 0.850704),
          lightColor: new Color(0.56901, 0.525838, 0.480702),
          light2Color: new Color(0.851004, 0.731598, 0.799802),
          cornerSize: 6.998066,
          // sunProgress: 0.3,
          sunProgress: 0.749556,
        },
        // Checkpoint 4
        {
          skyBgColor: new Color(0.575353, 0.865901, 0.944616),
          lightColor: new Color(0.843588, 0.661146, 0.861603),
          light2Color: new Color(0.433102, 0.402285, 0.37074),
          cornerSize: 7.628346,
          // sunProgress: 0.3,
          sunProgress: 0.907074,
        },
        {
          skyBgColor: new Color("#7ad5ff"),
          lightColor: new Color("#5a544e"),
          light2Color: new Color("#d69ee5"),
          cornerSize: 8,
          sunProgress: 1,
        },

        // {
        //   skyBgColor: new Color("#ffffb3"),
        //   // skyBgColor: new Color("#91d17a"),
        //   lightColor: new Color("#c8b8a7"),
        //   light2Color: new Color("#dcd7b3"),
        //   cornerSize: 6,
        //   // sunProgress: 0.3,
        //   sunProgress: 0.5,
        // },

        /* 
        Checkpoint 3
        0.739699 0.9178 0.850704
        0.56901 0.525838 0.480702
        0.851004 0.731598 0.799802
        6.998066
        0.749556
        
        Checkpoint 4
        0.575353 0.865901 0.944616
        0.433102 0.402285 0.37074
        0.843588 0.661146 0.861603
        7.628346
        0.907074
        */
      ],
    };

    this.dustUniforms = {
      uTime: { value: 0 },
      uColor: { value: this.parameters.environments[0].skyBgColor.clone() },
      uAlpha: { value: 1 },
    };

    this.maxRes = gpuTier >= 2 ? 1440 : 1080;
    this.aspectRatio =
      (window.innerWidth * devicePixelRatio) / (window.innerHeight * devicePixelRatio);
    this.sizes = {
      width: Math.min(
        window.innerWidth,
        (this.maxRes / devicePixelRatio) * this.aspectRatio
      ),
      height: Math.min(window.innerHeight, this.maxRes / devicePixelRatio),
    };

    this.canvas = document.querySelector(".webgl");
    this.camera = new PerspectiveCamera(30, this.aspectRatio, isSafari() ? 2 : 1.5, 35);
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
    // this.renderer.compile(this, this.camera);
    this.background = this.parameters.environments[0].skyBgColor.clone();

    this.add(this.cameraContainer);

    const fog = new Fog(this.parameters.environments[0].skyBgColor.clone(), 20, 35);
    this.fog = fog;

    ShaderChunk.fog_pars_fragment = fogParsFragment;
    ShaderChunk.fog_fragment = fogFragment;
    ShaderChunk.fog_pars_vertex = fogParsVertex;
    ShaderChunk.fog_vertex = fogVertex;

    this.directionalLight = new DirectionalLight(
      this.parameters.environments[0].lightColor.clone(),
      this.parameters.lightIntensity
    );
    this.directionalLight.position.set(10, 10, -10);
    this.add(this.directionalLight);

    this.directionalLight2 = new DirectionalLight(
      this.parameters.environments[0].light2Color.clone(),
      this.parameters.light2Intensity
    );
    this.directionalLight2.position.set(-10, 10, 10);
    this.add(this.directionalLight2);

    const renderScene = new RenderPass(this, this.camera);

    this.composer = new EffectComposer(this.renderer);
    this.composer.setSize(this.sizes.width, this.sizes.height);
    this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.composer.addPass(renderScene);

    this.customShader = {
      uniforms: {
        uTime: { value: 0 },
        uMenuSwitch: { value: 0 },
        tDiffuse: { value: null },
        uTintColor: { value: this.parameters.tintColor },
        uCornerColor: { value: this.parameters.cornerColor },
        uCornerIntensity: { value: 1 },

        // MORNING
        // uCornerSize: { value: 4 },

        // DAY
        // uCornerSize: { value: 6 },

        // NIGHT
        uCornerSize: { value: this.parameters.environments[0].cornerSize },

        uProgress: { value: 0 },
        uFadeProgress: { value: 0 },
        uBorderFadeProgress: { value: 1 },
        uSunProgress: { value: this.parameters.environments[0].sunProgress },
        uBlurIntensity: { value: 1.75 },
        uNoiseTexture: { value: null },
        uBlurPos: {
          value: this.blurVec2.set(this.sizes.width, this.sizes.height),
        },
        uRes: {
          value: this.resVec2.set(this.sizes.width, this.sizes.height),
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    };

    this.customPass = new ShaderPass(this.customShader);
    this.customPass.setSize(this.sizes.width * 0.5, this.sizes.height * 0.5);
    this.composer.addPass(this.customPass);
    this.customPass.material.uniforms.uNoiseTexture.value =
      texturesMap.get("noiseTexture")[0];

    const atmosphereFolder = guiFolders.get("atmosphere");

    atmosphereFolder
      .addColor(this.parameters.environments[0], "skyBgColor")
      .onChange(() => {
        fog.color.set(this.parameters.environments[0].skyBgColor);
        this.background.set(this.parameters.environments[0].skyBgColor);
      })
      .name("SkyBgColor");
    atmosphereFolder.add(fog, "near").min(-30).max(30).name("FogNear");
    atmosphereFolder.add(fog, "far").min(30).max(90).name("FogFar");

    const lightFolder = atmosphereFolder.addFolder("Light");
    lightFolder
      .addColor(this.parameters.environments[0], "lightColor")
      .onChange(() => {
        this.directionalLight.color.set(this.parameters.environments[0].lightColor);
      })
      .name("Color");
    lightFolder.add(this.directionalLight, "intensity").min(0).max(10).name("Intensity");
    lightFolder.add(this.directionalLight.position, "x").min(-30).max(30).name("PosX");
    lightFolder.add(this.directionalLight.position, "y").min(0).max(30).name("PosY");
    lightFolder.add(this.directionalLight.position, "z").min(-30).max(30).name("PosZ");

    const light2Folder = atmosphereFolder.addFolder("Light2");
    light2Folder
      .addColor(this.parameters.environments[0], "light2Color")
      .onChange(() => {
        this.directionalLight2.color.set(this.parameters.environments[0].light2Color);
      })
      .name("Color");
    light2Folder
      .add(this.directionalLight2, "intensity")
      .min(0)
      .max(10)
      .name("Intensity");
    light2Folder.add(this.directionalLight2.position, "x").min(-30).max(30).name("PosX");
    light2Folder.add(this.directionalLight2.position, "y").min(0).max(30).name("PosY");
    light2Folder.add(this.directionalLight2.position, "z").min(-30).max(30).name("PosZ");

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
      .addColor(this.parameters, "cornerColor")
      .onChange(() => {
        this.customPass.uniforms.uCornerColor.value.set(this.parameters.cornerColor);
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

    postFolder
      .add(this.customPass.uniforms.uProgress, "value")
      .min(0)
      .max(1.3)
      .name("uProgress");
    postFolder
      .add(this.customPass.uniforms.uSunProgress, "value")
      .min(0)
      .max(1)
      .name("uSunProgress");

    window.addEventListener("resize", this.resize.bind(this));

    raf.subscribe("scene", this.update.bind(this));
  }

  resize() {
    this.aspectRatio =
      (window.innerWidth * devicePixelRatio) / (window.innerHeight * devicePixelRatio);
    this.sizes.width = Math.min(
      window.innerWidth,
      (this.maxRes / devicePixelRatio) * this.aspectRatio
    );
    this.sizes.height = Math.min(window.innerHeight, this.maxRes / devicePixelRatio);

    this.camera.aspect = this.aspectRatio;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.composer.setSize(this.sizes.width, this.sizes.height);
    this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.customPass.material.uniforms.uBlurPos.value = this.blurVec2.set(
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
    this.customPass.uniforms.uTime.value = raf.elapsedTime;

    customFogUniforms.time.value = raf.elapsedTime;
  }
}
