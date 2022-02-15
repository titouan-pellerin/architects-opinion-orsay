import { Vector2 } from "three";
import { mainScene } from "../Three/MainScene";
import raf from "./Raf";

class Mouse {
  constructor() {
    this.mouseCoords = new Vector2(0, 0);
    this.normalizedMouseCoords = new Vector2(0, 0);
    this.range = new Vector2(0.2, 0.1);
    this.mouseMoveHandler = this.mouseMove.bind(this);
    this.isOnMouseMove = true;
    document.addEventListener("mousemove", this.mouseMoveHandler);
    raf.subscribe("mouse", this.update.bind(this));
  }

  mouseMove(e) {
    this.isOnMouseMove = true;
    this.mouseCoords.x = e.clientX;
    this.mouseCoords.y = e.clientY;

    this.normalizedMouseCoords.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.normalizedMouseCoords.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  removeMouseMove() {
    this.isOnMouseMove = false;
    document.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  update() {
    const target = new Vector2();
    target.x = -this.normalizedMouseCoords.x * this.range.x;
    target.y = this.normalizedMouseCoords.y * this.range.y;

    const xRotateOffset = 0.015 * (target.x - mainScene.camera.rotation.y);
    const yRotateOffset = 0.015 * (target.y - mainScene.camera.rotation.x);

    mainScene.camera.rotation.y += xRotateOffset;
    mainScene.camera.rotation.x += yRotateOffset;
  }
}

const mouse = new Mouse();
export { mouse };
