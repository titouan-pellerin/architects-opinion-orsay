import { mainScene } from "../Three/MainScene";
import { mouse } from "../utils/Mouse";
import raf from "../utils/Raf";
import gsap from "gsap";
import * as THREE from "three";

export class Ray {
  constructor(objects) {
    this.raycaster = new THREE.Raycaster();
    this.objects = objects;
    this.currentIntersect = null;
    this.lookAtTarget = new THREE.Vector3(0, 0, -1);
    this.handleClick();
    raf.subscribe("ray", this.update.bind(this));
  }

  handleClick() {
    window.addEventListener("click", () => {
      if (this.currentIntersect) {
        console.log(this.lookAtTarget);
        this.clicked = true;
        console.log("click");
        this.lookAtTarget.applyQuaternion(this.currentIntersect.object.quaternion);

        gsap.to(mainScene.camera.position, {
          duration: 4,
          x: this.currentIntersect.object.position.x,
          y: 0,
          z: this.currentIntersect.object.position.z + 14,
          ease: "Power3.easeOut",
        });

        gsap.to(this.lookAtTarget, {
          duration: 4,
          ease: "Power3.easeOut",
          x: this.currentIntersect.object.position.x,
          y: this.currentIntersect.object.position.y,
          z: this.currentIntersect.object.position.z,
          onUpdate: () => {
            console.log(this.lookAtTarget);
            mainScene.camera.lookAt(this.lookAtTarget);
          },
        });
      }
    });
  }

  update() {
    this.raycaster.setFromCamera(mouse.normalizedMouseCoords, mainScene.camera);
    const intersects = this.raycaster.intersectObject(this.objects, true);

    if (intersects.length) {
      document.querySelector("html,body").style.cursor = "pointer";

      // if (!this.currentIntersect) {
      //   console.log("mouse enter");
      // }

      this.currentIntersect = intersects[0];
    } else {
      document.querySelector("html,body").style.cursor = "default";

      // if (this.currentIntersect) {
      //   console.log("mouse leave");
      // }
      this.currentIntersect = null;
    }
  }
}
