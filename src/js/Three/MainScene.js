import raf from "../utils/Raf";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

export class MainScene extends Scene {
  constructor(canvas) {
    super();

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.canvas = canvas;
    this.camera = new PerspectiveCamera(
      55,
      this.sizes.width / this.sizes.height,
      0.1,
      100,
    );
    this.camera.updateProjectionMatrix();

    this.camera.position.set(0, 0, 10);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableRotate = true;
    this.controls.update();

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      powerPreference: "high-performance",
      antialias: true,
    });

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.add(this.camera);

    window.addEventListener("resize", this.resize.bind(this));

    raf.subscribe("scene", this.update.bind(this));
  }

  resize() {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;

    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  update() {
    this.controls.update();
    this.renderer.render(this, this.camera);
  }
}
