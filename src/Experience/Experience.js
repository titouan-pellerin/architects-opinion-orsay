import * as THREE from "three";
import GUI from "lil-gui";

import Time from "./Utils/Time";
import Sizes from "./Utils/Sizes";
import Stats from "./Utils/Stats";
import Resources from "./Resources";
import Renderer from "./Renderer";
import Camera from "./Camera";
import World from "./World";
import assets from "./assets";

export default class Experience {
  static instance;

  constructor(_options = {}) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

    // Options
    this.targetElement = _options.targetElement;

    this.canvas = _options.canvas;

    if (!this.targetElement) {
      console.warn("Missing 'targetElement' property");
      return;
    }

    this.time = new Time();
    this.sizes = new Sizes();
    this.setConfig();
    this.setDebug();
    this.setStats();
    this.setScene();
    this.setCamera();
    this.setRenderer();
    this.setResources();
    this.setWorld();

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.update();
  }

  setConfig() {
    this.config = {};

    // Debug
    this.config.debug = window.location.hash === "#debug";

    // Pixel ratio
    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2);

    // Width and height
    const boundings = this.targetElement.getBoundingClientRect();
    this.config.width = boundings.width;
    this.config.height = boundings.height || window.innerHeight;
  }

  setDebug() {
    if (this.config.debug) {
      this.debug = new GUI();
    }
  }

  setStats() {
    if (this.config.debug) {
      this.stats = new Stats(true);
    }
  }

  setScene() {
    this.scene = new THREE.Scene();
  }

  setCamera() {
    this.camera = new Camera();
  }

  setRenderer() {
    this.renderer = new Renderer({ rendererInstance: this.rendererInstance });

    this.targetElement.appendChild(this.renderer.instance.domElement);
  }

  setResources() {
    this.resources = new Resources(assets);
  }

  setWorld() {
    this.world = new World();
  }

  update() {
    if (this.stats) this.stats.update();

    this.camera.update();

    if (this.world) this.world.update();

    if (this.renderer) this.renderer.update();

    window.requestAnimationFrame(() => {
      this.update();
    });
  }

  resize() {
    // Config
    const boundings = this.targetElement.getBoundingClientRect();
    this.config.width = boundings.width;
    this.config.height = boundings.height;

    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2);

    if (this.camera) this.camera.resize();

    if (this.renderer) this.renderer.resize();

    if (this.world) this.world.resize();
  }

  destroy() {}
}
