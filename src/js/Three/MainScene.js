import fragmentShader from "../../glsl/post/fragment.glsl";
import vertexShader from "../../glsl/post/vertex.glsl";
import { gui, guiFolders } from "../utils/Debug";
import raf from "../utils/Raf";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass.js";
import { CubeTexturePass } from "three/examples/jsm/postprocessing/CubeTexturePass.js";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

export class MainScene extends THREE.Scene {
  constructor() {
    super();
    const parameters = {
      skyBgColor: new THREE.Color("#fdfbd3"),
      noiseColor: new THREE.Color("#84b15a"),
      cornerColor: new THREE.Color("#000000"),
      lightColor: new THREE.Color("#84b15a"),
      lightIntensity: 1,
      light2Color: new THREE.Color("#84b15a"),
      light2Intensity: 0.5,
    };

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.canvas = document.querySelector(".webgl");
    this.camera = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 1000);
    this.camera.updateProjectionMatrix();

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableRotate = true;
    guiFolders.get("camera").add(this.controls, "enabled").name("OrbitControls");
    this.controls.update();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      powerPreference: "high-performance",
      antialias: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.background = new THREE.Color(parameters.skyBgColor);

    this.add(this.camera);
    this.camera.position.set(0, 0, 20);

    const fog = new THREE.Fog(parameters.skyBgColor, 6, 45);
    this.fog = fog;

    const directionalLight = new THREE.DirectionalLight(parameters.lightColor, parameters.lightIntensity);
    directionalLight.castShadow = true;
    directionalLight.shadow.bias = 0.0001;
    directionalLight.shadow.mapSize.set(2048, 2048);
    directionalLight.position.set(10, 10, -10);
    this.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(parameters.light2Color, parameters.light2Intensity);
    directionalLight2.position.set(-10, 10, 10);
    this.add(directionalLight2);

    let renderScene = new RenderPass(this, this.camera);

    // let unrealBloomPass = new UnrealBloomPass();
    // unrealBloomPass.strength = 0.1;
    // unrealBloomPass.radius = 0;
    // unrealBloomPass.threshold = 0.05;

    // let afterimagePass = new AfterimagePass();
    // afterimagePass.uniforms.damp.value = 0.99;

    // let dotScreenPass = new DotScreenPass();
    // let filmPass = new FilmPass();
    // let cubeTexturePass = new CubeTexturePass();
    // let bokehPass = new BokehPass();

    this.composer = new EffectComposer(this.renderer);
    this.composer.setSize(this.sizes.width, this.sizes.height);
    this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.composer.addPass(renderScene);

    const noiseShader = {
      uniforms: {
        uTime: { value: 0 },
        tDiffuse: { value: null },
        uNoiseColor: { value: parameters.noiseColor },
        uNoiseIntensity: { value: 0.3 },
        uCornerColor: { value: parameters.cornerColor },
        uCornerIntensity: { value: 0.2 },
        uCornerSize: { value: 2 },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    };

    this.noisePass = new ShaderPass(noiseShader);
    this.composer.addPass(this.noisePass);
    // this.composer.addPass(afterimagePass);
    // this.composer.addPass(filmPass);
    // this.composer.addPass(bokehPass)
    // this.composer.addPass(dotScreenPass);
    // this.composer.addPass(unrealBloomPass);

    const sceneFolder = guiFolders.get("scene");
    const atmosphereFolder = guiFolders.get("atmosphere");
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

    const postFolder = atmosphereFolder.addFolder("Postprocessing");
    const noiseFolder = postFolder.addFolder("Noise");
    noiseFolder
      .addColor(parameters, "noiseColor")
      .onChange(() => {
        this.noisePass.uniforms.uNoiseColor.value.set(parameters.noiseColor);
      })
      .name("Color");
    noiseFolder.add(this.noisePass.uniforms.uNoiseIntensity, "value").min(0).max(1).name("Intensity");
    // const renderScene = new RenderPass(this, this.camera);

    const unrealBloomPass = new UnrealBloomPass();
    unrealBloomPass.strength = 0.1;
    unrealBloomPass.radius = 0;
    unrealBloomPass.threshold = 0.05;

    const afterimagePass = new AfterimagePass();
    afterimagePass.uniforms.damp.value = 0.99;

    const dotScreenPass = new DotScreenPass();
    const filmPass = new FilmPass();
    // let cubeTexturePass = new CubeTexturePass();
    // let bokehPass = new BokehPass();

    const cornerFolder = postFolder.addFolder("Corner");
    cornerFolder
      .addColor(parameters, "cornerColor")
      .onChange(() => {
        this.noisePass.uniforms.uCornerColor.value.set(parameters.cornerColor);
      })
      .name("Color");
    cornerFolder.add(this.noisePass.uniforms.uCornerIntensity, "value").min(-1).max(1).name("Intensity");
    cornerFolder.add(this.noisePass.uniforms.uCornerSize, "value").min(0).max(10).name("Size");

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
    this.controls.update();
    this.composer.render();
    this.noisePass.uniforms.uTime.value = raf.elapsedTime;
    // console.log(raf.elapsedTime);
  }
}

const mainScene = new MainScene();
export { mainScene };
