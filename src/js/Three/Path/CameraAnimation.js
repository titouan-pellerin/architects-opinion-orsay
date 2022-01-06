import { guiFolders } from "../../utils/Debug";
import { mouse } from "../../utils/Mouse";
import raf from "../../utils/Raf";
import { positions } from "../../utils/positions";
import { mainScene } from "../MainScene";
import { Checkpoints } from "./Checkpoints";
import gsap from "gsap";
import { Vector3 } from "three";
import { Vector2 } from "three";

export class CameraAnimation {
  constructor(path, envScale) {
    this.isAtCheckpoint = false;
    this.isLeavingCheckpoint = false;
    this.envScale = envScale;
    this.path = path;
    this.tick = 0;
    this.tickSpeed = 0.01;
    this.originalTickSpeed = 0.01;

    this.timeline = document.querySelector(".timeline");
    this.step1 = document.querySelector(".step1");
    // this.onClick();

    this.checkpoints = new Checkpoints(positions.get("checkpoints"), envScale);

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

  // onClick() {
  //   this.step1.addEventListener("click", () => {
  //     this.tick = 0.5;
  //     this.timeline.style.transform = `scaleX(${0.5})`;
  //   });
  // }

  update() {
    if (this.isAtCheckpoint) {
      this.tickSpeed *= 1.1;
      console.log(this.tickSpeed);
    } else if (!this.isAtCheckpoint && this.tickSpeed <= 0.0001) {
      // console.log(this.tickSpeed);
      raf.unsubscribe("path");
      this.showButton();
    }

    this.tick += raf.deltaTime * this.tickSpeed;
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

    mainScene.cameraContainer.position.set(camPos.x, camPos.y, camPos.z);
    mainScene.camera.lookAt(camPos2.x, camPos2.y, camPos2.z);

    if (
      this.checkpoints.isArrivingAtCheckpoint() &&
      !this.isAtCheckpoint &&
      !this.isLeavingCheckpoint
    ) {
      this.tickSpeed *= 0.99;
      console.log(this.tickSpeed);
    } else if (this.tickSpeed >= this.originalTickSpeed) {
      console.log("greater");
      this.tickSpeed = this.originalTickSpeed;
      this.isAtCheckpoint = false;
      // this.isLeavingCheckpoint = true;
    }

    this.percent =
      mainScene.camera.position.z /
      this.path.spline.points[this.path.spline.points.length - 1].z;

    this.timeline.style.transform = `scaleX(${this.percent})`;
  }

  showButton() {
    this.isAtCheckpoint = true;
    // this.isLeavingCheckpoint = false;
    if (this.checkpoints.positions[this.checkpoints.currentCheckpoint]) {
      this.currentCheckpoint++;
      const debugObject = {
        next: () => {
          raf.subscribe("path", this.update.bind(this));
          this.isLeavingCheckpoint = true;
        },
      };
      guiFolders.get("camera").add(debugObject, "next").name("Next");
    }
  }
}
