import { SplineCurve } from "three";
import { Artwork } from "../Environment/Elements/Artwork";

export class Checkpoint {
  /**
   *
   * @param {Number} tick
   * @param {Number} duration
   * @param {SplineCurve} splineCurve
   * @param {Artwork[]} artworks
   */
  constructor(tick, duration, splineCurve, artworks) {
    this.tick = tick;
    this.duration = duration;
    this.position = splineCurve.getPointAt(tick + 0.035);
    this.artworks = artworks;
    for (const artwork of artworks)
      artwork.lookAt(this.position.x, -0.7, this.position.y);
  }
}
