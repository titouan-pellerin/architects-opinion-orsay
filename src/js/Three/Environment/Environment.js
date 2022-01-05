import { guiFolders } from "../../utils/Debug";
import raf from "../../utils/Raf";
import { mainScene } from "../MainScene";
import { CameraAnimation } from "../Path/CameraAnimation";
import { ForestPathLine } from "../Path/ForestPathLine";
import { Grounds } from "./Grounds";
import { Sky } from "./Sky";
import * as THREE from "three";
import { Vector3 } from "three";

export class Environment {
  constructor() {
    this.parameters = {
      envScale: 100,
      groundColor: new THREE.Color("#ffffff"),
      skyColor: new THREE.Color("#ffffff"),
      speed: 0.125,
      stroke: 5000,
      smallNoise: 500,
      bigNoise: 50,
      strokeSky: 1360,
      smallNoiseSky: 318,
      bigNoiseSky: 9.7,
    };

    this.forestPathLine = new ForestPathLine(1024, 1, this.parameters);

    this.cameraAnimation = new CameraAnimation(
      this.forestPathLine,
      this.parameters.envScale
    );

    this.sky = new Sky(this.parameters);
    this.grounds = new Grounds(5, this.parameters);

    // setTimeout(() => {
    //   this.grounds.matrixAutoUpdate = false;
    //   this.sky.matrixAutoUpdate = false;
    // }, 1);

    raf.subscribe("environment", this.update.bind(this));
  }

  update() {
    this.sky.material.uniforms.uTime.value = raf.elapsedTime;
  }
}
