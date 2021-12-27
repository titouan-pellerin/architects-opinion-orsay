import { Line } from "three";
import { LineBasicMaterial } from "three";
import { BufferGeometry } from "three";
import { Vector2 } from "three";
import { SplineCurve } from "three";

export class ForestPathLine extends Line {
  constructor(splinePrecision = 1024, pathWidth, parameters) {
    const initPoints = [
      new Vector2(0, 0),
      new Vector2(0, -0.5007),
      new Vector2(0.0131, -0.6156),
      new Vector2(0.0762, -0.6244),
      new Vector2(0.1437, -0.5892),
      new Vector2(0.2165, -0.5627),
      new Vector2(0.3136, -0.6288),
      new Vector2(0.2386, -0.7081),
      new Vector2(0.007, -0.7103),
      new Vector2(-0.2467, -0.8029),
      new Vector2(-0.3261, -0.9197),
      new Vector2(-0.2842, -1.0386),
      new Vector2(-0.1055, -0.9637),
      new Vector2(0.0312, -0.9505),
      new Vector2(0.1151, -0.8822),
      new Vector2(0.2915, -0.8756),
      new Vector2(0.2849, -1.0386),
      new Vector2(0.157, -1.1378),
      new Vector2(0.0048, -1.1091),
      new Vector2(-0.2136, -1.1819),
      new Vector2(-0.2246, -1.248),
      new Vector2(-0.0614, -1.2678),
      new Vector2(0.3202, -1.2986),
      new Vector2(0.3283, -1.3971),
      new Vector2(0.1173, -1.3663),
      new Vector2(0.0117, -1.4411),
      new Vector2(0, -1.5006),
      new Vector2(0.0131, -1.6156),
      new Vector2(0.0762, -1.6244),
      new Vector2(0.1437, -1.5892),
      new Vector2(0.2165, -1.5627),
      new Vector2(0.3136, -1.6288),
      new Vector2(0.2386, -1.7082),
      new Vector2(0.007, -1.7104),
      new Vector2(-0.2467, -1.8029),
      new Vector2(-0.3261, -1.9197),
      new Vector2(-0.2842, -2.0387),
      new Vector2(-0.1055, -1.9638),
      new Vector2(0.0312, -1.9505),
      new Vector2(0.1151, -1.8822),
      new Vector2(0.2915, -1.8756),
      new Vector2(0.2849, -2.0387),
      new Vector2(0.157, -2.1378),
      new Vector2(0.0048, -2.1092),
      new Vector2(-0.2136, -2.1819),
      new Vector2(-0.2246, -2.248),
      new Vector2(-0.0614, -2.2678),
      new Vector2(0.3202, -2.2987),
      new Vector2(0.3283, -2.3971),
      new Vector2(0.1173, -2.3663),
      new Vector2(0.0117, -2.4411),
      new Vector2(0, -2.5004),
      new Vector2(0.0131, -2.6153),
      new Vector2(0.0762, -2.6241),
      new Vector2(0.1437, -2.5888),
      new Vector2(0.2165, -2.5624),
      new Vector2(0.3136, -2.6285),
      new Vector2(0.2386, -2.7078),
      new Vector2(0.007, -2.71),
      new Vector2(-0.2467, -2.8025),
      new Vector2(-0.3261, -2.9193),
      new Vector2(-0.2842, -3.0383),
      new Vector2(-0.1055, -2.9634),
      new Vector2(0.0312, -2.9502),
      new Vector2(0.1151, -2.8819),
      new Vector2(0.2915, -2.8752),
      new Vector2(0.2849, -3.0383),
      new Vector2(0.157, -3.1374),
      new Vector2(0.0048, -3.1088),
      new Vector2(-0.2136, -3.1815),
      new Vector2(-0.2246, -3.2476),
      new Vector2(-0.0614, -3.2674),
      new Vector2(0.3202, -3.2983),
      new Vector2(0.3283, -3.3968),
      new Vector2(0.1173, -3.3659),
      new Vector2(0.0117, -3.4407),
      new Vector2(0, -3.5002),
      new Vector2(0.0131, -3.6151),
      new Vector2(0.0762, -3.6239),
      new Vector2(0.1437, -3.5886),
      new Vector2(0.2165, -3.5622),
      new Vector2(0.3136, -3.6283),
      new Vector2(0.2386, -3.7076),
      new Vector2(0.007, -3.7098),
      new Vector2(-0.2467, -3.8024),
      new Vector2(-0.3261, -3.9191),
      new Vector2(-0.2842, -4.0381),
      new Vector2(-0.1055, -3.9632),
      new Vector2(0.0312, -3.95),
      new Vector2(0.1151, -3.8817),
      new Vector2(0.2915, -3.8751),
      new Vector2(0.2849, -4.0381),
      new Vector2(0.157, -4.1373),
      new Vector2(0.0048, -4.1086),
      new Vector2(-0.2136, -4.1813),
      new Vector2(-0.2246, -4.2474),
      new Vector2(-0.0614, -4.2673),
      new Vector2(0.3202, -4.2981),
      new Vector2(0.3283, -4.3966),
      new Vector2(0.1173, -4.3657),
      new Vector2(0.0117, -4.4405),
      new Vector2(0, -4.5),
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
