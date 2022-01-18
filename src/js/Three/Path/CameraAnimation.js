/* eslint-disable no-undef */
import gsap from "gsap";
import { Vector3 } from "three";
import { guiFolders } from "../../utils/Debug";
import { positions } from "../../utils/positions";
import raf from "../../utils/Raf";
import { mainScene } from "../MainScene";
import { Checkpoints } from "./Checkpoints";

export class CameraAnimation {
  constructor(path, envScale, artworks) {
    gsap.registerPlugin(CustomEase);
    gsap.ticker.lagSmoothing(1000, 16);

    this.checkpointsIndex = 0;
    this.isAtCheckpoint = false;
    this.isLeavingCheckpoint = false;
    this.envScale = envScale;
    this.path = path;
    this.tick = {
      value: 0,
    };
    this.tickSpeed = 0.01;
    this.originalTickSpeed = 0.01;

    this.checkpoints = new Checkpoints(positions.get("checkpoints"), envScale);
    // this.ray = new Ray(artworks, this);

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
  }

  update() {
    // const nextTick = this.tick.value + 0.01;
    const nextTick = this.tick.value + 0.1;

    const curvePoint = this.path.spline.getPointAt(this.tick.value);
    const curvePoint2 = this.path.spline.getPointAt(nextTick);

    const camPos = new Vector3(curvePoint.x, -0.5, curvePoint.y);
    const camPos2 = new Vector3(curvePoint2.x, -0.5, curvePoint2.y);

    mainScene.camera.position.set(camPos.x, camPos.y, camPos.z);
    mainScene.camera.lookAt(camPos2.x, camPos2.y, camPos2.z);
    mainScene.camera.userData.lookingAt = camPos2;
  }

  goToCheckpoint(index) {
    if (!index) index = this.checkpointsIndex;
    let tickValue = 0;
    switch (index) {
      case 0:
        tickValue = 0.08;
        break;
      case 1:
        tickValue = 0.4929;
        break;
      case 2:
        tickValue = 0.7629;
        break;
      case 3:
        tickValue = 0.99;
        break;
    }
    if (index <= 3) {
      raf.subscribe("path", this.update.bind(this));
      gsap.to(this.tick, {
        // delay: index === 0 ? 3 : 0,
        duration: 100,
        value: tickValue,
        // ease: CustomEase.create(
        //   "custom",
        //   `M0,0 C0.07,0 0.114,0.067 0.178,0.126 0.294,0.233 0.42,0.378
        //       0.507,0.512 0.595,0.65 0.718,0.779 0.822,0.876 0.887,0.937 0.931,1 1,1`
        // ),
        ease: "linear",
        onComplete: () => {
          this.checkpointsIndex++;
          raf.unsubscribe("path");
          // raf.subscribe("ray", this.ray.update.bind(this.ray));
          // raf.unsubscribe("mouse");
          // console.log(mainScene.camera.userData.lookingAt);
        },
        // ease: "sine.inOut",
      });
    }
  }
}
