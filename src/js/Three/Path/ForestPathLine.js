import { BufferGeometry, Line, LineBasicMaterial, SplineCurve } from "three";
import { texturesMap } from "../../utils/assets";
import { positions } from "../../utils/positions";

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
    this.position.y = -2;
    this.parameters = parameters;
    this.spline = spline;
    this.points = points;
    this.spacedPoints = this.spline.getSpacedPoints(
      parameters.envScale * texturesMap.get("curveTextures").length - 1
    );
    this.pathWidth = pathWidth;
    this.splinePrecision = splinePrecision;

    console.log(this.spline.getPointAt(0.1));
  }
}
