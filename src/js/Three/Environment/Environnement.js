import { guiFolders } from "../../utils/Debug";
import raf from "../../utils/Raf";
import { CameraAnimation } from "../Path/CameraAnimation";
import { ForestPathLine } from "../Path/ForestPathLine";
import { Grounds } from "./Grounds";
import { Sky } from "./Sky";
import * as THREE from "three";

export class Environnement {
  constructor() {
    this.parameters = {
      envScale: 100,
      groundColor: new THREE.Color("#ffffff"),
      skyColor: new THREE.Color("#ffffff"),
      speed: 0.75,
      stroke: 5000,
      smallNoise: 500,
      bigNoise: 50,
    };

    this.forestPathLine = new ForestPathLine(1024, 2);
    this.forestPathLine.scale.set(
      this.parameters.envScale,
      this.parameters.envScale,
      this.parameters.envScale
    );

    this.cameraAnimation = new CameraAnimation(
      this.forestPathLine.spline,
      this.parameters.envScale
    );

    this.sky = new Sky(this.parameters);
    this.grounds = new Grounds(5, this.parameters);
    this.ground = this.grounds.currentGround;

    raf.subscribe("environment", this.update.bind(this));
  }

  update() {
    this.sky.material.uniforms.uTime.value = raf.elapsedTime;
    this.ground.groundMaskUniforms.uTime.value = raf.elapsedTime;
  }
}
