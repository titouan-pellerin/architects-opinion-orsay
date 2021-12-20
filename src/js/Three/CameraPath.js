import { guiFolders } from "../utils/Debug";
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
      new Vector3(0, 0, 0),
      new Vector3(0, 0, 10),
      new Vector3(0, 0, 20),
      new Vector3(0, 0, 30),
      new Vector3(0, 0, 40),
    ]);

    this.curveGeometry = new BufferGeometry();
    this.curveGeometry.vertices = this.curve.getPoints(10);
    const curveMaterial = new LineBasicMaterial({
      color: 0xffffff,
    });
    this.splineObject = new Line(this.curveGeometry, curveMaterial);
    this.timeline = document.querySelector(".timeline");
    this.step1 = document.querySelector(".step1");
    this.onClick();
    this.debugObject = {
      subscribe: () => {
        raf.subscribe("path", this.update.bind(this));
      },
      unsubscribe: () => {
        raf.unsubscribe("path");
      },
    };
    guiFolders
      .get("camera")
      .add(this.debugObject, "subscribe")
      .name("Camera path on");
    guiFolders
      .get("camera")
      .add(this.debugObject, "unsubscribe")
      .name("Camera path off");
  }

  onClick() {
    this.step1.addEventListener("click", () => {
      this.tick = 0.5;
      this.timeline.style.transform = `scaleX(${0.5})`;
    });
  }

  update() {
    this.tick += raf.deltaTime * 0.01;
    const camPos = this.curve.getPoint(this.tick);
    mainScene.camera.position.set(camPos.x, camPos.y, camPos.z);
    // if (
    //   mainScene.camera.position.z >=
    //   this.curve.points[this.curve.points.length - 1].z + 1
    // ) {
    //   this.tick = 0;
    //   mainScene.camera.position.z = 0;
    // }
    const tangent = this.curve.getTangent(this.tick);
    mainScene.camera.rotation.y = -tangent.x;

    this.percent =
      mainScene.camera.position.z / this.curve.points[this.curve.points.length - 1].z;

    this.timeline.style.transform = `scaleX(${this.percent})`;
  }
}
