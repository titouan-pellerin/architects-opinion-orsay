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
    this.spline = spline;
    this.points = points;
    this.pathWidth = pathWidth;
  }

  isPositionInRange(position) {
    return this.points.some(
      (point) =>
        point.x >= position.x - this.pathWidth && point.x <= position.x + this.pathWidth
    );
  }
}
