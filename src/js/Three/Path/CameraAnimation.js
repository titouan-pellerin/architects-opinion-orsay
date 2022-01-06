/* eslint-disable no-undef */
import { guiFolders } from "../../utils/Debug";
import { mouse } from "../../utils/Mouse";
import raf from "../../utils/Raf";
import { positions } from "../../utils/positions";
import { mainScene } from "../MainScene";
import { Checkpoints } from "./Checkpoints";
import gsap from "gsap";
import { Vector3 } from "three";

export class CameraAnimation {
  constructor(path, envScale) {
    gsap.registerPlugin(CustomEase);
    this.isAtCheckpoint = false;
    this.isLeavingCheckpoint = false;
    this.envScale = envScale;
    this.path = path;
    this.tick = {
      value: 0,
    };
    this.tickSpeed = 0.01;
    this.originalTickSpeed = 0.01;

    this.timeline = document.querySelector(".timeline");
    this.step1 = document.querySelector(".step1");
    // this.onClick();

    this.checkpoints = new Checkpoints(positions.get("checkpoints"), envScale);

    this.debugObject = {
      checkpoint1: () => this.goToCheckpoint(0),
      checkpoint2: () => this.goToCheckpoint(1),
      checkpoint3: () => this.goToCheckpoint(2),
      end: () => this.goToCheckpoint(3),
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
    guiFolders.get("camera").add(this.debugObject, "checkpoint1").name("Checkpoint 1");
    guiFolders.get("camera").add(this.debugObject, "checkpoint2").name("Checkpoint 2");
    guiFolders.get("camera").add(this.debugObject, "checkpoint3").name("Checkpoint 3");
    guiFolders.get("camera").add(this.debugObject, "end").name("End");
    guiFolders.get("camera").add(this.debugObject, "unsubscribe").name("Camera path off");
    guiFolders.get("camera").add(this.debugObject, "addLine").name("Show line");
    guiFolders.get("camera").add(this.debugObject, "removeLine").name("Remove line");
    this.goToCheckpoint(0);
  }

  // onClick() {
  //   this.step1.addEventListener("click", () => {
  //     this.tick = 0.5;
  //     this.timeline.style.transform = `scaleX(${0.5})`;
  //   });
  // }

  // First checkpoint = 0.23290919491913448;

  update() {
    // if (this.isAtCheckpoint) {
    //   this.tickSpeed *= 1.1;
    //   console.log(this.tickSpeed);
    // } else if (!this.isAtCheckpoint && this.tickSpeed <= 0.0001) {
    //   // console.log(this.tickSpeed);
    //   raf.unsubscribe("path");
    //   this.showButton();
    // }

    // this.tick += raf.deltaTime * this.tickSpeed;
    // this.tick += raf.deltaTime * 0.05;
    // console.log(this.tick);

    let nextTick = this.tick.value + 0.04;
    if (nextTick > 1) nextTick = 1;
    if (this.tick.value > 1) this.tick.value = 1;

    const curvePoint = this.path.spline.getPointAt(this.tick.value);
    const curvePoint2 = this.path.spline.getPointAt(nextTick);

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

    // if (
    //   this.checkpoints.isArrivingAtCheckpoint() &&
    //   !this.isAtCheckpoint &&
    //   !this.isLeavingCheckpoint
    // ) {
    //   this.tickSpeed *= 0.99;
    //   console.log(this.tickSpeed);
    // } else if (this.tickSpeed >= this.originalTickSpeed) {
    //   console.log("greater");
    //   this.tickSpeed = this.originalTickSpeed;
    //   this.isAtCheckpoint = false;
    //   // this.isLeavingCheckpoint = true;
    // }

    this.percent =
      mainScene.camera.position.z /
      this.path.spline.points[this.path.spline.points.length - 1].z;

    this.timeline.style.transform = `scaleX(${this.percent})`;
  }

  goToCheckpoint(index) {
    let tickValue = 0;
    switch (index) {
      case 0:
        tickValue = 0.2129;
        break;
      case 1:
        tickValue = 0.5029;
        break;
      case 2:
        tickValue = 0.7829;
        break;
      case 3:
        tickValue = 1;
        break;
    }
    raf.subscribe("path", this.update.bind(this));
    gsap.to(this.tick, {
      delay: index === 0 ? 3 : 0,
      duration: 25,
      value: tickValue,
      ease: CustomEase.create(
        "custom",
        `M0,0 C0.07,0 0.114,0.067 0.178,0.126 0.294,0.233 0.42,0.378 
            0.507,0.512 0.595,0.65 0.718,0.779 0.822,0.876 0.887,0.937 0.931,1 1,1`
      ),
      onComplete: () => {
        raf.unsubscribe("path");
      },
      // ease: "sine.inOut",
    });
  }
}
