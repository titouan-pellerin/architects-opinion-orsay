import { mainScene } from "../Three/MainScene";
import { mouse } from "./Mouse";
import raf from "./Raf";
import gsap from "gsap";
import { Raycaster } from "three";
import { Vector3 } from "three";

export class Ray {
  constructor(objects) {
    this.raycaster = new Raycaster();
    this.objects = objects;
    this.currentIntersect = null;
    this.clicked = false;
    this.lookAtTarget = new Vector3();
    this.previousLookAt = new Vector3();
    // this.cameraAnimation = cameraAnimation;

    document.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick() {
    if (this.currentIntersect) {
      this.clicked = true;
      raf.unsubscribe("mouse");
      console.log(this.previousLookAt);

      gsap.to(this.previousLookAt, {
        duration: 5,
        x: this.lookAtTarget.x,
        y: this.lookAtTarget.y,
        z: this.lookAtTarget.z,
        ease: "ease.inOut",
        onComplete: () => {
          this.clicked = false;
          mainScene.camera.userData.lookingAt = this.lookAtTarget;
          raf.subscribe("mouse", mouse.update.bind(mouse));
          raf.unsubscribe("ray");
        },
      });
      gsap.to(mainScene.cameraContainer.position, {
        duration: 5,
        x: this.lookAtTarget.x,
        y: this.lookAtTarget.y,
        z: this.lookAtTarget.z + 7,
        ease: "ease.inOut",
        onComplete: () => {
          // this.clicked = false;
          // mainScene.camera.userData.lookingAt = this.lookAtTarget;
          // raf.subscribe("mouse", mouse.update.bind(mouse));
        },
      });
    }
  }

  update() {
    if (this.clicked)
      mainScene.camera.lookAt(
        this.previousLookAt.x,
        this.previousLookAt.y,
        this.previousLookAt.z
      );
    else {
      this.previousLookAt = mainScene.camera.userData.lookingAt;
    }

    this.raycaster.setFromCamera(mouse.normalizedMouseCoords, mainScene.camera);
    const intersects = this.raycaster.intersectObjects(this.objects, true);

    if (intersects.length) {
      document.querySelector("html,body").style.cursor = "pointer";
      this.currentIntersect = intersects[0].object;
      this.lookAtTarget = this.currentIntersect.position.clone();
      this.currentIntersect.localToWorld(this.lookAtTarget);
    } else {
      document.querySelector("html,body").style.cursor = "default";
      this.currentIntersect = null;
    }
  }
}
