import { positions } from "../../utils/positions";
import { Line } from "three";
import { LineBasicMaterial } from "three";
import { BufferGeometry } from "three";
import { Vector2 } from "three";
import { SplineCurve } from "three";

export class ForestPathLine extends Line {
  constructor(splinePrecision = 1024, pathWidth, parameters) {
    const initPoints = positions.get("curvePoints");
    const spline = new SplineCurve(initPoints);
    const points = spline.getPoints(splinePrecision);
    const geometry = new BufferGeometry().setFromPoints(points);
    geometry.rotateX(Math.PI * 0.5);
    const material = new LineBasicMaterial({
      color: 0xff0000,
    });
    super(geometry, material);
    this.position.y = -1;
    this.scale.set(parameters.envScale, parameters.envScale, parameters.envScale);
    this.parameters = parameters;
    this.spline = spline;
    this.points = points;
    this.pathWidth = pathWidth;
    this.splinePrecision = splinePrecision;
  }

  isPositionInRange(position) {
    // const points = this.spline.getPoints(this.parameters.envScale * 5);
    // const point = points[Math.floor(position.x) + this.parameters.envScale * 0.5];
    const point =
      this.points[
        Math.floor(
          ((position.x + this.parameters.envScale * 0.5) / this.parameters.envScale) *
            this.splinePrecision
        )
      ];
    // console.log(point);
    // const inRange = this.points.some(
    //   (point) =>
    //     // point.x > position.x - this.pathWidth &&
    //     // point.x < position.x + this.pathWidth &&
    //     // point.z < position.y - this.pathWidth &&
    //     // point.z > position.y + this.pathWidth
    //     Math.abs(point.x - position.x) < this.pathWidth &&
    //     Math.abs(point.y - position.y) > this.pathWidth
    // );
    // console.log(position.x);
    return (
      Math.abs(point.x * this.parameters.envScale - position.x) < this.pathWidth &&
      Math.abs(point.y * this.parameters.envScale - position.y) > this.pathWidth
    );
  }
}
