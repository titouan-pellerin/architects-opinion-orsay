import beginVertexShader from "../../../glsl/ground/beginVertex.glsl";
import commonFragmentShader from "../../../glsl/ground/commonFragment.glsl";
import commonVertexShader from "../../../glsl/ground/commonVertex.glsl";
import outputFragmentShader from "../../../glsl/ground/outputFragment.glsl";
import { CustomMeshToonMaterial } from "../CustomMeshToonMaterial";
import { BackSide, ExtrudeGeometry, Vector2 } from "three";
import { CatmullRomCurve3 } from "three";
import { Shape } from "three";
import { Vector3 } from "three";

export class ForestPathGeometry extends ExtrudeGeometry {
  constructor() {
    const curve = new CatmullRomCurve3(
      [
        new Vector3(0, 0, 0),
        new Vector3(0, 5, -15),
        new Vector3(0, 5, -20),
        new Vector3(0, 10, -25),
        new Vector3(0, 5, -45),
        new Vector3(0, -5, -55),
        new Vector3(0, 0, -65),
      ],
      false,
      "catmullrom",
      1
    );

    const points = curve.getPoints(500);
    const shape = new Shape(points);
    super(shape, {
      steps: 500,
      depth: 1000,
      bevelOffset: 5,
      bevelSegments: 36,
      bevelSize: 5,
      bevelThickness: 10,
      curveSegments: 100,
      bevelEnabled: true,
      extrudePath: curve,
    });
    this.rotateZ(Math.PI * 0.5);
  }
}
