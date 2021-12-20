import raf from "../utils/Raf";
import { mainScene } from "./MainScene";
import {
  BufferGeometry,
  CatmullRomCurve3,
  Line,
  LineBasicMaterial,
  Vector3,
} from "three";

export class CameraPath {
  constructor() {
    this.tick = 0;
    this.curve = new CatmullRomCurve3([
      new Vector3(0, 5, 0),
      new Vector3(-5, 5, -10),
      new Vector3(10, 5, 10),
      // new Vector3(0.1, 0, -0.2),
      // new Vector3(-0.1, 0, -0.3),
      // new Vector3(0.1, 0, -0.4),
    ]);

    this.curveGeometry = new BufferGeometry();
    this.curveGeometry.vertices = this.curve.getPoints(10);
    const curveMaterial = new LineBasicMaterial({
      color: 0xffffff,
    });
    this.splineObject = new Line(this.curveGeometry, curveMaterial);
    raf.subscribe("path", this.update.bind(this));
  }

  // onWheel(e) {
  //   const scroll = e.deltaY < 0 ? "up" : "down";
  //   let percent =
  //     mainScene.camera.position.z / this.curve.points[this.curve.points.length - 1].z;
  //   if (scroll === "up") {
  //     this.tick += 0.1;
  //   } else if (scroll === "down" && mainScene.camera.position.z < -5) {
  //     percent =
  //       mainScene.camera.position.z /
  //       mainScene.curve.points[mainScene.curve.points.length - 1].z;
  //     this.tick -= 0.1;
  //   }
  // }

  update() {
    this.tick += raf.deltaTime * 0.1;
    // console.log(this.tick);
    const camPos = this.curve.getPoint(this.tick);
    // console.log(camPos);
    mainScene.camera.position.set(camPos.x, camPos.y, camPos.z);
    // if (
    //   mainScene.camera.position.z <=
    //   this.curve.points[this.curve.points.length - 1].z + 1
    // ) {
    //   this.tick = 0;
    //   mainScene.camera.position.z = 0;
    // }
    const tangent = this.curve.getTangent(this.tick);
    mainScene.camera.rotation.y = -tangent.x;
  }
}
