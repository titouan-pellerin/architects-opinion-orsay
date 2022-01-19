/* eslint-disable no-undef */
import gsap from "gsap";
import { Vector3 } from "three";
import { guiFolders } from "../../utils/Debug";
import { mainScene } from "../MainScene";

export class CameraAnimation {
  constructor(path, envScale, artworks) {
    gsap.registerPlugin(CustomEase);
    gsap.ticker.lagSmoothing(1000, 16);

    this.checkpoints = [
      { tick: 0.155, duration: 30 },
      { tick: 0.345, duration: 42 },
      { tick: 0.545, duration: 18 },
      { tick: 0.745, duration: 36 },
      { tick: 0.99, duration: 20 },
    ];
    this.checkpointsIndex = 0;
    this.isAtCheckpoint = false;
    this.isLeavingCheckpoint = false;
    this.envScale = envScale;
    this.path = path;

    this.tick = {
      value: 0,
    };

    // this.ray = new Ray(artworks, this);

    this.debugObject = {
      checkpoint1: () => this.goToCheckpoint(0),
      checkpoint2: () => this.goToCheckpoint(1),
      checkpoint3: () => this.goToCheckpoint(2),
      checkpoint4: () => this.goToCheckpoint(3),
      end: () => this.goToCheckpoint(4),
      showLine: false,
    };
    guiFolders.get("camera").add(this.debugObject, "checkpoint1").name("Checkpoint 1");
    guiFolders.get("camera").add(this.debugObject, "checkpoint2").name("Checkpoint 2");
    guiFolders.get("camera").add(this.debugObject, "checkpoint3").name("Checkpoint 3");
    guiFolders.get("camera").add(this.debugObject, "checkpoint4").name("Checkpoint 4");
    guiFolders.get("camera").add(this.debugObject, "end").name("End");
    guiFolders
      .get("camera")
      .add(this.debugObject, "showLine")
      .name("Show line")
      .onChange(() => {
        this.debugObject.showLine ? mainScene.add(path) : mainScene.remove(path);
      });
  }

  goToCheckpoint(index) {
    if (!index) index = this.checkpointsIndex;
    if (index <= 4) {
      gsap.to(this.tick, {
        // delay: index === 0 ? 3 : 0,
        duration: this.checkpoints[index].duration,
        value: this.checkpoints[index].tick,
        ease: CustomEase.create(
          "custom",
          `M0,0 C0.07,0 0.114,0.067 0.178,0.126 0.294,0.233 0.42,0.378
              0.507,0.512 0.595,0.65 0.718,0.779 0.822,0.876 0.887,0.937 0.931,1 1,1`
        ),
        onUpdate: () => {
          const nextTick = this.tick.value + 0.01;

          const curvePoint = this.path.spline.getPointAt(this.tick.value);
          const curvePoint2 = this.path.spline.getPointAt(nextTick);

          const camPos = new Vector3(curvePoint.x, -0.5, curvePoint.y);
          const camPos2 = new Vector3(curvePoint2.x, -0.5, curvePoint2.y);

          mainScene.camera.position.set(camPos.x, camPos.y, camPos.z);
          mainScene.camera.lookAt(camPos2.x, camPos2.y, camPos2.z);
          mainScene.camera.userData.lookingAt = camPos2;
        },
        onComplete: () => {
          this.checkpointsIndex++;
          // raf.subscribe("ray", this.ray.update.bind(this.ray));
          // raf.unsubscribe("mouse");
          // console.log(mainScene.camera.userData.lookingAt);
        },
        // ease: "sine.inOut",
      });
    }
  }
}
