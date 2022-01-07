import { mainScene } from "../Three/MainScene";
import { mouse } from "./Mouse";
import raf from "./Raf";
import gsap from "gsap";
import { Raycaster } from "three";
import { Vector3 } from "three";

export class Ray {
  constructor(objects, cameraAnimation) {
    this.raycaster = new Raycaster();
    this.objects = objects;
    this.cameraAnimation = cameraAnimation;
    this.currentIntersect = null;
    this.clicked = false;
    this.lookAtTarget = new Vector3();
    this.previousLookAt = new Vector3();
    this.camLastPos = new Vector3();
    this.closeBtn = document.querySelector(".close");
    this.nextBtn = document.querySelector(".next");
    this.closeBtn.addEventListener("click", this.close.bind(this));
    this.nextBtn.addEventListener("click", this.next.bind(this));
    // this.cameraAnimation = cameraAnimation;
    document.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick(e) {
    e.preventDefault();
    if (this.currentIntersect) {
      this.clicked = true;

      // raf.unsubscribe("mouse");
      console.log(mainScene.camera.userData.lookingAt);

      gsap.to(this.previousLookAt, {
        duration: 5,
        x: this.lookAtTarget.x,
        y: this.lookAtTarget.y,
        z: this.lookAtTarget.z - 8,
        ease: "power2.inOut",
        onComplete: () => {
          this.clicked = false;
          // mainScene.camera.userData.lookingAt = this.lookAtTarget;
          mouse.isReduced = true;
          // raf.subscribe("mouse", mouse.update.bind(mouse));
          raf.unsubscribe("ray");

          this.currentIntersect = null;
          document.querySelector("html,body").style.cursor = "default";
          this.closeBtn.classList.add("visible");
        },
      });
      this.camLastPos.set(
        mainScene.camera.position.x,
        mainScene.camera.position.y,
        mainScene.camera.position.z
      );
      gsap.to(mainScene.camera.position, {
        duration: 5,
        // delay: 0.1,
        x: this.lookAtTarget.x,
        y: this.lookAtTarget.y,
        z: this.lookAtTarget.z + 2.5 * this.currentIntersect.scale.y,
        ease: "power2.inOut",
        onComplete: () => {
          // this.clicked = false;
          // mainScene.camera.userData.lookingAt = this.lookAtTarget;
          // raf.subscribe("mouse", mouse.update.bind(mouse));
        },
      });
    }
  }

  close(e) {
    e.preventDefault();
    raf.subscribe("ray", this.update.bind(this));
    this.clicked = true;
    this.closeBtn.classList.remove("visible");
    const newTickPoint = this.cameraAnimation.path.spline.getPointAt(
      this.cameraAnimation.tick.value + 0.04
    );
    const camPos2 = new Vector3(
      newTickPoint.x * this.cameraAnimation.envScale,
      -0.5,
      newTickPoint.y * this.cameraAnimation.envScale
    );
    gsap.to(this.previousLookAt, {
      duration: 5,
      delay: 1,
      y: camPos2.y,
      x: camPos2.x,
      z: camPos2.z,
      ease: "power2.inOut",
    });

    gsap.to(mainScene.camera.position, {
      duration: 5,
      // delay: 0.1,
      x: this.camLastPos.x,
      y: this.camLastPos.y,
      z: this.camLastPos.z,
      ease: "power2.inOut",
      onComplete: () => {
        // this.cameraAnimation.goToCheckpoint();
        mouse.isReduced = false;
        this.clicked = false;
        // raf.subscribe("mouse", mouse.update.bind(mouse));
        // mainScene.camera.userData.lookingAt = this.lookAtTarget;
        // raf.subscribe("mouse", mouse.update.bind(mouse));
      },
    });
  }

  next() {
    raf.unsubscribe("ray");
    this.cameraAnimation.goToCheckpoint();
  }

  update() {
    // if (this.clicked)
    if (!this.clicked) {
      this.previousLookAt = mainScene.camera.userData.lookingAt;
    }
    mainScene.camera.lookAt(
      this.previousLookAt.x,
      this.previousLookAt.y,
      this.previousLookAt.z
    );

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
