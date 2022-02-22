import { AudioListener, Color, PositionalAudio } from "three";
import { soundsMap, texturesMap } from "../../utils/assets";
import { guiFolders } from "../../utils/Debug";
import { positions } from "../../utils/positions";
import { Voiceover } from "../../Voiceover/Voiceover";
import { mainScene } from "../MainScene";
import { CameraAnimation } from "../Path/CameraAnimation";
import { Checkpoint } from "../Path/Checkpoint";
import { ForestPathLine } from "../Path/ForestPathLine";
import { Raycasting } from "../utils/Raycasting";
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
    const checkpoint1 = new Checkpoint(0.16, 35.3, this.forestPathLine.spline, [
      this.artworks[0],
      this.artworks[1],
      this.artworks[2],
      this.artworks[3],
    ]);
    const checkpoint2 = new Checkpoint(0.43, 51.6, this.forestPathLine.spline, [
      this.artworks[4],
      this.artworks[5],
      this.artworks[6],
      this.artworks[7],
    ]);
    const checkpoint3 = new Checkpoint(0.62, 32.6, this.forestPathLine.spline, [
      this.artworks[8],
      this.artworks[9],
      this.artworks[10],
      this.artworks[11],
    ]);
    const checkpoint4 = new Checkpoint(0.8, 45.3, this.forestPathLine.spline, [
      this.artworks[11],
      this.artworks[12],
      this.artworks[13],
      this.artworks[14],
    ]);
    const checkpoint5 = new Checkpoint(0.9, 21.3, this.forestPathLine.spline, [
      this.artworks[15],
      this.artworks[16],
    ]);
    checkpoints.push(checkpoint1, checkpoint2, checkpoint3, checkpoint4, checkpoint5);

    const voiceOver = new Voiceover();

    const cameraAnimation = new CameraAnimation(
      this.forestPathLine,
      this.parameters.envScale,
      checkpoints,
      voiceOver
    );

    const raycasting = new Raycasting(cameraAnimation);

    this.grounds = new Grounds(
      this.parameters,
      this.forestPathLine,
      this.artworks,
      raycasting
    );

    raycasting.start();

    this.debugObject = {
      start: () => {
        const audioListener = new AudioListener();
        mainScene.camera.add(audioListener);
        const music = new PositionalAudio(audioListener);
        music.setRefDistance(30);
        music.setRolloffFactor(0);
        music.setBuffer(soundsMap.get("music"));
        music.setVolume(0.09);
        music.play();
        voiceOver.init(audioListener);
        cameraAnimation.goToCheckpoint(null, raycasting);
      },
      tpToCheckpoints0: () => {
        this.grounds.groundIndex = 0;
        cameraAnimation.tpToCheckpoint(0);
      },
      tpToCheckpoints1: () => {
        this.grounds.groundIndex = 0;
        cameraAnimation.tpToCheckpoint(1);
      },
      tpToCheckpoints2: () => {
        this.grounds.groundIndex = 1;
        cameraAnimation.tpToCheckpoint(2);
      },
      tpToCheckpoints3: () => {
        this.grounds.groundIndex = 2;
        cameraAnimation.tpToCheckpoint(3);
      },
      tpToCheckpoints4: () => {
        this.grounds.groundIndex = 3;
        cameraAnimation.tpToCheckpoint(4);
      },
      tpToCheckpoints5: () => {
        this.grounds.groundIndex = 3;
        cameraAnimation.tpToCheckpoint(5);
      },
    };

    guiFolders.get("experience").add(this.debugObject, "start").name("Next");
    guiFolders.get("experience").add(this.debugObject, "tpToCheckpoints0");
    guiFolders.get("experience").add(this.debugObject, "tpToCheckpoints1");
    guiFolders.get("experience").add(this.debugObject, "tpToCheckpoints2");
    guiFolders.get("experience").add(this.debugObject, "tpToCheckpoints3");
    guiFolders.get("experience").add(this.debugObject, "tpToCheckpoints4");
    guiFolders.get("experience").add(this.debugObject, "tpToCheckpoints5");
  }
}
