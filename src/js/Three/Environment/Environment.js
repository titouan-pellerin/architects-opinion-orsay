import { Color } from "three";
import { texturesMap } from "../../utils/assets";
import { guiFolders } from "../../utils/Debug";
import { positions } from "../../utils/positions";
import { Voiceover } from "../../Voiceover/Voiceover";
import { CameraAnimation } from "../Path/CameraAnimation";
import { Checkpoint } from "../Path/Checkpoint";
import { ForestPathLine } from "../Path/ForestPathLine";
import { Artwork } from "./Elements/Artwork";
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

    this.artworks = [];
    for (let i = 0; i < positions.get("artworksPositions").length; i++) {
      const artwork = new Artwork(
        texturesMap.get("artworksTextures")[i],
        positions.get("artworksPositions")[i]
      );
      this.artworks.push(artwork);
    }

    const checkpoints = [];
    const checkpoint1 = new Checkpoint(0.13, 35, this.forestPathLine.spline, [
      this.artworks[0],
      this.artworks[1],
      this.artworks[2],
      this.artworks[3],
    ]);
    const checkpoint2 = new Checkpoint(0.345, 42, this.forestPathLine.spline, [
      this.artworks[4],
      this.artworks[5],
      this.artworks[6],
      this.artworks[7],
    ]);
    const checkpoint3 = new Checkpoint(0.545, 18, this.forestPathLine.spline, [
      this.artworks[8],
      this.artworks[9],
      this.artworks[10],
      this.artworks[11],
    ]);
    const checkpoint4 = new Checkpoint(0.745, 36, this.forestPathLine.spline, [
      this.artworks[11],
      this.artworks[12],
      this.artworks[13],
      this.artworks[14],
    ]);
    const checkpoint5 = new Checkpoint(0.95, 20, this.forestPathLine.spline, [
      this.artworks[15],
      this.artworks[16],
    ]);
    checkpoints.push(checkpoint1, checkpoint2, checkpoint3, checkpoint4, checkpoint5);

    this.grounds = new Grounds(
      texturesMap.get("curveTextures").length,
      this.parameters,
      this.forestPathLine,
      this.artworks
    );

    const voiceOver = new Voiceover();

    const cameraAnimation = new CameraAnimation(
      this.forestPathLine,
      this.parameters.envScale,
      checkpoints,
      voiceOver
    );

    this.debugObject = {
      start: () => {
        cameraAnimation.goToCheckpoint();
      },
    };

    guiFolders.get("experience").add(this.debugObject, "start").name("Next");
  }
}
