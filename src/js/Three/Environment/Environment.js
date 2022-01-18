import * as THREE from "three";
import { texturesMap } from "../../utils/assets";
import { CameraAnimation } from "../Path/CameraAnimation";
import { ForestPathLine } from "../Path/ForestPathLine";
import { Grounds } from "./Grounds";

export class Environment {
  constructor() {
    this.parameters = {
      envScale: 100,
      groundSize: 0.5,
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
  }
}
