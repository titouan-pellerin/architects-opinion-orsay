import { Raycaster } from "three";
import { mouse } from "../utils/Mouse";
import raf from "../utils/Raf";
import { mainScene } from "./MainScene";

export class Raycasting {
  constructor() {
    this.raycaster = new Raycaster();
    this.objects = [];
    this.currentIntersect = null;
    this.onClickHandler = this.onClick.bind(this);
  }

  start(objects = []) {
    this.objects = objects;
    raf.subscribe("raycasting", this.update.bind(this));
    document.addEventListener("mousedown", this.onClickHandler);
  }

  stop() {
    raf.unsubscribe("raycasting");
    document.removeEventListener("mousedown", this.onClickHandler);
    document.body.style.cursor = "default";
    this.currentIntersect = null;
  }

  onClick(e) {
    e.preventDefault();
    this.stop();
  }

  update() {
    this.raycaster.setFromCamera(mouse.normalizedMouseCoords, mainScene.camera);
    const intersects = this.raycaster.intersectObjects(this.objects, true);
    if (intersects.length) {
      document.body.style.cursor = "pointer";
      this.currentIntersect = intersects[0].object;
    } else {
      document.body.style.cursor = "default";
      this.currentIntersect = null;
    }
  }
}
