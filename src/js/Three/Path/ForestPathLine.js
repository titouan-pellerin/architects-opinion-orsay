import { texturesMap } from "../../utils/assets";
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
    this.spacedPoints = this.spline.getSpacedPoints(
      parameters.envScale * texturesMap.get("curveTextures").length - 1
    );
    this.pathWidth = pathWidth;
    this.splinePrecision = splinePrecision;
  }

  isPositionInRange(position) {
    const pointOnSameLine = this.spacedPoints.filter(
      (point) =>
        position.y > point.y * this.parameters.envScale - 1 &&
        position.y < point.y * this.parameters.envScale + 1
    )[0];
    let inRange = false;
    if (pointOnSameLine)
      inRange =
        pointOnSameLine.x * this.parameters.envScale >
          position.x - 6.5 + Math.random() * 3 &&
        pointOnSameLine.x * this.parameters.envScale <
          position.x + 3.5 + Math.random() * 3;
    return inRange;
  }
}
