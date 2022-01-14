import * as THREE from "three";
import { texturesMap } from "../../utils/assets";
import raf from "../../utils/Raf";
import { CameraAnimation } from "../Path/CameraAnimation";
import { ForestPathLine } from "../Path/ForestPathLine";
import { Grounds } from "./Grounds";
import { Sky } from "./Sky";

export class Environment {
  constructor() {
    this.parameters = {
      envScale: 100,
      groundColor: new THREE.Color("#fbab32"),
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

    this.sky = new Sky(this.parameters);
    this.grounds = new Grounds(
      texturesMap.get("curveTextures").length,
      this.parameters,
      this.forestPathLine
    );

    this.cameraAnimation = new CameraAnimation(
      this.forestPathLine,
      this.parameters.envScale,
      [
        this.grounds.artwork1,
        this.grounds.artwork2,
        this.grounds.artwork3,
        this.grounds.artwork4,
      ]
    );
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
