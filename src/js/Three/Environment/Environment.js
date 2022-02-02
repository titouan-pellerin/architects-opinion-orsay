import { Color } from "three";
import { texturesMap } from "../../utils/assets";
import { CameraAnimation } from "../Path/CameraAnimation";
import { Checkpoint } from "../Path/Checkpoint";
import { ForestPathLine } from "../Path/ForestPathLine";
import { Grounds } from "./Grounds";

export class Environment {
  constructor() {
    this.parameters = {
      envScale: 100,
      groundSize: 0.5,
      groundColor: new Color("#fbab32"),
      skyColor: new Color("#ffffff"),
      speed: 0.125,
      stroke: 5000,
      smallNoise: 500,
      bigNoise: 50,
      strokeSky: 1360,
      smallNoiseSky: 318,
      bigNoiseSky: 9.7,
    };

    this.forestPathLine = new ForestPathLine(1024, 1, this.parameters);

    const checkpoints = [];
    const checkpoint1 = new Checkpoint(0.165, 30, this.forestPathLine.spline);
    const checkpoint2 = new Checkpoint(0.345, 42, this.forestPathLine.spline);
    const checkpoint3 = new Checkpoint(0.545, 18, this.forestPathLine.spline);
    const checkpoint4 = new Checkpoint(0.745, 36, this.forestPathLine.spline);
    const checkpoint5 = new Checkpoint(0.99, 20, this.forestPathLine.spline);
    checkpoints.push(checkpoint1, checkpoint2, checkpoint3, checkpoint4, checkpoint5);

    this.grounds = new Grounds(
      texturesMap.get("curveTextures").length,
      this.parameters,
      this.forestPathLine,
      checkpoints
    );

    const cameraAnimation = new CameraAnimation(
      this.forestPathLine,
      this.parameters.envScale,
      checkpoints,
      [
        this.grounds.artwork1,
        // this.grounds.artwork2,
        // this.grounds.artwork3,
        // this.grounds.artwork4,
      ]
    );
  }
}
