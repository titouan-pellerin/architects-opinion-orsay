import { guiFolders } from "../../utils/Debug";
import { mouse } from "../../utils/Mouse";
import raf from "../../utils/Raf";
import { mainScene } from "../MainScene";
import { Vector3 } from "three";

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
    this.tick += raf.deltaTime * 0.001;

    const curvePoint = this.curve.getPointAt(this.tick);
    const curvePoint2 = this.curve.getPointAt(this.tick + 0.001);

    const camPos = new Vector3(
      curvePoint.x * this.envScale,
      -1,
      curvePoint.y * this.envScale
    );
    const camPos2 = new Vector3(
      curvePoint2.x * this.envScale,
      -1,
      curvePoint2.y * this.envScale
    );

    // mainScene.rotation.y +=
    //   0.005 * (mouse.normalizedMouseCoords.x * 0.1 - mainScene.rotation.y);
    // mainScene.rotation.z +=
    //   0.005 * (mouse.normalizedMouseCoords.y * 0.1 - mainScene.rotation.z);

    mainScene.camera.position.set(camPos.x, camPos.y, camPos.z);
    mainScene.camera.lookAt(camPos2.x, camPos2.y, camPos2.z);
    // mainScene.camera.rotation.x +=
    //   0.01 * (-mouse.normalizedMouseCoords.x * 0.3 - mainScene.camera.rotation.x);
    // mainScene.camera.rotation.y +=
    //   0.01 * (mouse.normalizedMouseCoords.y * 0.3 - mainScene.camera.rotation.y);
    // OrbitControls debug
    // mainScene.controls.target = new Vector3(
    //   mainScene.camera.position.x,
    //   -1,
    //   mainScene.camera.position.z
    // );

    this.percent =
      mainScene.camera.position.z / this.curve.points[this.curve.points.length - 1].z;

    this.timeline.style.transform = `scaleX(${this.percent})`;
  }
}
