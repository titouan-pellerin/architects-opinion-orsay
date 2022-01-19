export class Checkpoints {
  constructor(positions = [], envScale) {
    this.positions = positions;
    this.envScale = envScale;
    this.currentCheckpoint = 0;
  }
}
