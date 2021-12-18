import raf from "../utils/Raf";
import * as THREE from "three";
import { gui } from "../utils/Debug";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js'
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js'
import { CubeTexturePass } from 'three/examples/jsm/postprocessing/CubeTexturePass.js'

export class MainScene extends THREE.Scene {
  constructor(canvas) {
    super();

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.canvas = canvas;
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      0.1,
      1000,
    );
    this.camera.updateProjectionMatrix();

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableRotate = true;
    this.controls.update();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      powerPreference: "high-performance",
      antialias: true,
    });

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor("#0ff5dd");

    this.add(this.camera);
    this.camera.position.set(0, 0, 10);

    // const fog = new THREE.Fog("#0ff5dd", 10, 20);
    // this.fog = fog;

    let renderScene = new RenderPass(this, this.camera)

    let unrealBloomPass = new UnrealBloomPass()
    unrealBloomPass.strength = 0.1
    unrealBloomPass.radius = 0
    unrealBloomPass.threshold = 0.05

    let afterimagePass = new AfterimagePass()
    afterimagePass.uniforms.damp.value = .99

    let dotScreenPass = new DotScreenPass();
    let filmPass = new FilmPass();
    let cubeTexturePass = new CubeTexturePass();
    // let bokehPass = new BokehPass();

    this.composer = new EffectComposer(this.renderer)
    this.composer.setSize(this.sizes.width, this.sizes.height)
    this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    this.composer.addPass(renderScene)
    // this.composer.addPass(this.afterimagePass)
    // this.composer.addPass(filmPass)
    // this.composer.addPass(bokehPass)
    // this.composer.addPass(dotScreenPass)
    // this.composer.addPass(this.unrealBloomPass)

    window.addEventListener("resize", this.resize.bind(this));

    // const folder = gui.addFolder('PostProcessing');
    // folder.add(unrealBloomPass, 'strength').min(0).max(5).name('Bloom Strength')
    // folder.add(unrealBloomPass, 'radius').min(0).max(50).name('Bloom Radius')
    // folder.add(unrealBloomPass, 'threshold').min(0).max(1).name('Bloom Threshold')

    raf.subscribe("scene", this.update.bind(this));
  }

  resize() {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;

    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.composer.setSize(this.sizes.width, this.sizes.height)
    this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  update() {
    this.controls.update();
    // this.composer.render()
    this.renderer.render(this, this.camera)
  }
}
