import { mainScene } from "../MainScene";

export class Checkpoints {
  constructor(positions = [], envScale) {
    this.positions = positions;
    this.envScale = envScale;
    this.currentCheckpoint = 0;
  }

  isArrivingAtCheckpoint() {
    const isArriving =
      mainScene.cameraContainer.position.z <=
        this.positions[this.currentCheckpoint].y * this.envScale + 10 &&
      mainScene.cameraContainer.position.z >=
        this.positions[this.currentCheckpoint].y * this.envScale;
    return isArriving;
  }
}
