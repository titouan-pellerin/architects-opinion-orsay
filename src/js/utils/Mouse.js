import { mainScene } from "../Three/MainScene";
import raf from "./Raf";
import { Vector2 } from "three";

class Mouse {
  constructor() {
    this.mouseCoords = new Vector2(0, 0);
    this.normalizedMouseCoords = new Vector2(0, 0);
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
    target.x = this.normalizedMouseCoords.x * 1.5;
    target.y = this.normalizedMouseCoords.y * 1.5 + 0.5;

    mainScene.camera.position.x += 0.015 * (target.x - mainScene.camera.position.x);
    mainScene.camera.position.y += 0.015 * (target.y - mainScene.camera.position.y);
  }
}

const mouse = new Mouse();
export { mouse };
