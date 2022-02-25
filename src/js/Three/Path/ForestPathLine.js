import { BufferGeometry, Line, LineBasicMaterial, SplineCurve, Vector3 } from "three";
import { texturesMap } from "../../utils/assets";
import { positions } from "../../utils/positions";
import { mainScene } from "../MainScene";

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

    const camPos = new Vector3(spline.getPointAt(0).x, -1, spline.getPointAt(0).y);
    const camPos2 = new Vector3(
      spline.getPointAt(0.007).x,
      -1,
      spline.getPointAt(0.007).y
    );

    mainScene.cameraContainer.position.set(camPos.x, camPos.y, camPos.z);
    mainScene.cameraContainer.lookAt(camPos2.x, camPos2.y, camPos2.z);
    mainScene.cameraContainer.userData.lookingAt = camPos2;
    mainScene.cameraContainer.rotateX(Math.PI);
    mainScene.cameraContainer.rotateZ(Math.PI);
  }
}
