import { guiFolders } from "../../utils/Debug";
import { mouse } from "../../utils/Mouse";
import raf from "../../utils/Raf";
import { positions } from "../../utils/positions";
import { mainScene } from "../MainScene";
import gsap from "gsap";
import { Vector3 } from "three";
import { Vector2 } from "three";

export class CameraAnimation {
  constructor(path, envScale) {
    this.envScale = envScale;
    this.path = path;
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
      addLine: () => {
        mainScene.add(path);
      },
      removeLine: () => {
        mainScene.remove(path);
      },
    };
    guiFolders.get("camera").add(this.debugObject, "subscribe").name("Camera path on");
    guiFolders.get("camera").add(this.debugObject, "unsubscribe").name("Camera path off");
    guiFolders.get("camera").add(this.debugObject, "addLine").name("Show line");
    guiFolders.get("camera").add(this.debugObject, "removeLine").name("Remove line");
  }

  onClick() {
    this.step1.addEventListener("click", () => {
      this.tick = 0.5;
      this.timeline.style.transform = `scaleX(${0.5})`;
    });
  }

  update() {
    this.tick += raf.deltaTime * 0.01;
    // this.tick += raf.deltaTime * 0.05;

    const curvePoint = this.path.spline.getPointAt(this.tick);
    const curvePoint2 = this.path.spline.getPointAt(this.tick + 0.05);

    const camPos = new Vector3(
      curvePoint.x * this.envScale,
      -0.5,
      curvePoint.y * this.envScale
    );
    const camPos2 = new Vector3(
      curvePoint2.x * this.envScale,
      -0.5,
      curvePoint2.y * this.envScale
    );

    const target = new Vector2();
    target.x = -mouse.normalizedMouseCoords.x * 0.5;
    target.y = mouse.normalizedMouseCoords.y * 0.8 - 0.3;

    mainScene.cameraContainer.rotation.x +=
      0.05 * (target.y - mainScene.cameraContainer.rotation.x);
    mainScene.cameraContainer.rotation.y +=
      0.05 * (target.x - mainScene.cameraContainer.rotation.y);

    if (
      mainScene.cameraContainer.position.z <=
        positions.get("checkpoints")[0].y * this.envScale + 10 &&
      mainScene.cameraContainer.position.z >=
        positions.get("checkpoints")[0].y * this.envScale
    ) {
      console.log("at checkpoint");
      gsap.to(mainScene.cameraContainer.position, {
        duration: 10,
        x: positions.get("checkpoints")[0].x * this.envScale,
        z: positions.get("checkpoints")[0].y * this.envScale,
        ease: "powerOut",
        // onComplete: () => {
        //   raf.unsubscribe("path");
        // },
      });
      // raf.unsubscribe("path");
    } else {
      mainScene.cameraContainer.position.set(camPos.x, camPos.y, camPos.z);
      mainScene.camera.lookAt(camPos2.x, camPos2.y, camPos2.z);
    }
    // OrbitControls debug
    // mainScene.controls.target = new Vector3(
    //   mainScene.camera.position.x,
    //   -1,
    //   mainScene.camera.position.z
    // );

    this.percent =
      mainScene.camera.position.z /
      this.path.spline.points[this.path.spline.points.length - 1].z;

    this.timeline.style.transform = `scaleX(${this.percent})`;
  }
}
