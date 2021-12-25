import { Line } from "three";
import { LineBasicMaterial } from "three";
import { BufferGeometry } from "three";
import { Vector2 } from "three";
import { SplineCurve } from "three";

export class ForestPathLine extends Line {
  constructor(splinePrecision = 10000) {
    const initPoints = [
      new Vector2(0, 0),
      new Vector2(-0.2227667969, -0.1521839844),
      new Vector2(-0.1036138672, -0.1521839844),
      new Vector2(-0.1036138672, -0.3524101563),
      new Vector2(0.2065521484, -0.04224394531),
      new Vector2(0.3754544922, 0.1561394531),
      new Vector2(0.0462484375, 0.1561394531),
      new Vector2(-0.2031126953, 0.2630085938),
      new Vector2(0.04379179688, 0.3391681641),
    ];
    const spline = new SplineCurve(initPoints);

    const points = spline.getPoints(splinePrecision);
    const geometry = new BufferGeometry().setFromPoints(points);
    geometry.rotateX(Math.PI * 0.5);
    const material = new LineBasicMaterial({
      color: 0xff0000,
    });
    super(geometry, material);
    this.position.y = -1;
    this.splinePrecision = splinePrecision;
    this.points = points;
  }
}
