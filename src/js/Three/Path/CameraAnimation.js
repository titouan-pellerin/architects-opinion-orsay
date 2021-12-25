import { guiFolders } from "../../utils/Debug";
import raf from "../../utils/Raf";
import { mainScene } from "../MainScene";

export class CameraAnimation {
  constructor(curve, envScale) {
    this.envScale = envScale;
    this.curve = curve;
    this.tick = 0;
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
    guiFolders.get("camera").add(this.debugObject, "subscribe").name("Camera path on");
    guiFolders.get("camera").add(this.debugObject, "unsubscribe").name("Camera path off");
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
    mainScene.camera.position.set(camPos.x * this.envScale, 1, camPos.y * this.envScale);

    const tangent = this.curve.getTangent(this.tick);
    mainScene.camera.rotation.x = -tangent.x;
    // mainScene.camera.rotation.y = -tangent.x;
    mainScene.camera.rotation.z = -tangent.z;

    this.percent =
      mainScene.camera.position.z / this.curve.points[this.curve.points.length - 1].z;

    this.timeline.style.transform = `scaleX(${this.percent})`;
  }
}
