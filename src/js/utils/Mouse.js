import { Vector2 } from "three";
import { mainScene } from "../Three/MainScene";
import raf from "./Raf";

class Mouse {
  constructor() {
    this.mouseCoords = new Vector2(0, 0);
    this.normalizedMouseCoords = new Vector2(0, 0);
    this.range = new Vector2(0.15, 0.1);
    document.addEventListener("mousemove", this.mouseMove.bind(this));
    raf.subscribe("mouse", this.update.bind(this));
  }

  mouseMove(e) {
    this.mouseCoords.x = e.clientX;
    this.mouseCoords.y = e.clientY;

    this.normalizedMouseCoords.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.normalizedMouseCoords.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  update() {
    const target = new Vector2();
    target.x = -this.normalizedMouseCoords.x * this.range.x;
    target.y = this.normalizedMouseCoords.y * this.range.y;

    mainScene.camera.rotation.y += 0.015 * (target.x - mainScene.camera.rotation.y);
    mainScene.camera.rotation.x += 0.015 * (target.y - mainScene.camera.rotation.x);
  }
}

const mouse = new Mouse();
export { mouse };
