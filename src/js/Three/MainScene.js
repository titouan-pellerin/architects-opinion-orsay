import fogFragment from "@glsl/customFog/fogFragment.glsl";
import fogParsFragment from "@glsl/customFog/fogParsFragment.glsl";
import fogParsVertex from "@glsl/customFog/fogParsVertex.glsl";
import fogVertex from "@glsl/customFog/fogVertex.glsl";
import gsap from "gsap";
import {
  ACESFilmicToneMapping,
  Color,
  DirectionalLight,
  Fog,
  Group,
  PerspectiveCamera,
  Scene,
  ShaderChunk,
  ShaderLib,
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
import { customFogUniforms, isMobile, isSafari } from "../utils/misc";
import { mouse } from "../utils/Mouse";
import raf from "../utils/Raf";

export class MainScene extends Scene {
  constructor() {
    super();

    this.fogUniforms = {
      coucou: { value: 0.2 },
      ...ShaderLib.toon.uniforms,
    };

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
    this.maxRes = isMobile() ? 1080 : 1440;
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

    ShaderChunk.fog_pars_fragment = fogParsFragment;
    ShaderChunk.fog_fragment = fogFragment;
    ShaderChunk.fog_pars_vertex = fogParsVertex;
    ShaderChunk.fog_vertex = fogVertex;

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
        uMenuSwitch: { value: 0 },
        tDiffuse: { value: null },
        uTintColor: { value: parameters.tintColor },
        uCornerColor: { value: parameters.cornerColor },
        uCornerIntensity: { value: 1 },
        uCornerSize: { value: 4.5 },
        uProgress: { value: 0 },
        uFadeProgress: { value: 0 },
        uBorderFadeProgress: { value: 1 },
        uSunProgress: { value: 0.3 },
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

    this.customPass = new ShaderPass(customShader);
    this.composer.addPass(this.customPass);
    this.customPass.material.uniforms.uNoiseTexture.value =
      texturesMap.get("noiseTexture")[0];

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

    const openMenu = document.querySelector(".menu-btn_open");
    const closeMenu = document.querySelector(".menu-btn_close");
    const li = document.querySelector(".menu-btn_section");
    const artworkIn = document.querySelector(".artwork-in");
    const artworkOut = document.querySelector(".artwork-out");

    openMenu.addEventListener("click", () => {
      openMenu.style.pointerEvents = "none";
      artworkIn.style.pointerEvents = "none";
      artworkOut.style.pointerEvents = "none";
      gsap.to(this.customPass.uniforms.uProgress, {
        value: 1.3,
        duration: 1.5,
        onComplete: () => {
          this.customPass.uniforms.uMenuSwitch.value = 1.0;
          this.customPass.uniforms.uProgress.value = 0;
          closeMenu.style.pointerEvents = "all";
          li.style.pointerEvents = "all";
        },
      });
    });
    closeMenu.addEventListener("click", () => {
      closeMenu.style.pointerEvents = "none";
      li.style.pointerEvents = "none";
      gsap.to(this.customPass.uniforms.uProgress, {
        value: 1.3,
        duration: 1.5,
        onComplete: () => {
          this.customPass.uniforms.uMenuSwitch.value = 0.0;
          this.customPass.uniforms.uProgress.value = 0;
          openMenu.style.pointerEvents = "all";
          artworkIn.style.pointerEvents = "all";
          artworkOut.style.pointerEvents = "all";
        },
      });
    });

    const menuAnimation = gsap.timeline({ paused: true });
    menuAnimation.to(closeMenu, { duration: 0, pointerEvents: "none" });
    menuAnimation.to(li, { duration: 0, pointerEvents: "none" });
    menuAnimation.to(this.customPass.uniforms.uMenuSwitch, {
      duration: 0,
      value: 2,
    });
    menuAnimation.to(customFogUniforms.progress, { duration: 3, value: 1.15 });
    menuAnimation.to(this.customPass.uniforms.uBorderFadeProgress, {
      duration: 1.25,
      value: 0.2,
      delay: -3,
    });
    menuAnimation.to(customFogUniforms.transitionIsIn, {
      duration: 0,
      value: 1,
      delay: -1,
    });
    menuAnimation.to(customFogUniforms.progress, { duration: 0, value: -0.1, delay: -1 });
    menuAnimation.to(customFogUniforms.progress, {
      duration: 3,
      value: 1.15,
      delay: -1,
    });
    menuAnimation.to(this.customPass.uniforms.uFadeProgress, {
      value: 1,
      duration: 1.5,
      delay: -2.5,
    });
    menuAnimation.to(customFogUniforms.transitionIsIn, { duration: 0, value: 0 });
    menuAnimation.to(customFogUniforms.progress, {
      duration: 0,
      value: -0.1,
      onComplete: () => {
        this.customPass.uniforms.uBorderFadeProgress.value = 1;
        this.customPass.uniforms.uMenuSwitch.value = 0.0;
        this.customPass.uniforms.uProgress.value = 0;
        this.customPass.uniforms.uMenuSwitch.value = 0;
        this.customPass.uniforms.uFadeProgress.value = 0;
        openMenu.style.pointerEvents = "all";
        artworkIn.style.pointerEvents = "all";
        artworkOut.style.pointerEvents = "all";
      },
    });

    li.addEventListener("click", () => {
      menuAnimation.pause(0);
      menuAnimation.play();
    });

    const chockwaveAnimation = gsap.timeline({ paused: true });
    chockwaveAnimation.to(customFogUniforms.transitionIsIn, {
      duration: 0,
      value: 2,
    });
    chockwaveAnimation.to(artworkIn, { duration: 0, pointerEvents: "none" });
    chockwaveAnimation.to(artworkOut, { duration: 0, pointerEvents: "none" });
    chockwaveAnimation.to(openMenu, { duration: 0, pointerEvents: "none" });
    chockwaveAnimation.to(customFogUniforms.progress, { duration: 2.25, value: 1.15 });
    chockwaveAnimation.to(customFogUniforms.transitionIsIn, {
      duration: 0,
      value: 3,
      delay: -1.25,
    });
    chockwaveAnimation.to(customFogUniforms.progress, {
      duration: 0,
      value: -0.1,
      delay: -1.25,
    });
    chockwaveAnimation.to(customFogUniforms.progress, {
      duration: 2.25,
      value: 1.15,
      delay: -1.25,
    });
    chockwaveAnimation.to(customFogUniforms.transitionIsIn, { duration: 0, value: 0 });
    chockwaveAnimation.to(customFogUniforms.progress, { duration: 0, value: -0.1 });
    chockwaveAnimation.to(artworkIn, { duration: 0, pointerEvents: "all" });
    chockwaveAnimation.to(artworkOut, { duration: 0, pointerEvents: "all" });
    chockwaveAnimation.to(openMenu, { duration: 0, pointerEvents: "all" });

    artworkIn.addEventListener("click", () => {
      chockwaveAnimation.pause(0);
      chockwaveAnimation.play();
    });
    artworkOut.addEventListener("click", () => {
      chockwaveAnimation.pause(0);
      chockwaveAnimation.play();
    });
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

const mainScene = new MainScene();
export { mainScene };
