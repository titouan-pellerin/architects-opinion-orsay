import { SplineCurve } from "three";

export class Checkpoint {
  /**
   *
   * @param {Number} tick
   * @param {Number} duration
   * @param {SplineCurve} splineCurve
   */
  constructor(tick, duration, splineCurve) {
    this.tick = tick;
    this.duration = duration;
    this.position = splineCurve.getPointAt(tick);
  }
}
