import { Vector2 } from "three";
import { mainScene } from "../Three/MainScene";
import raf from "./Raf";

class Mouse {
  constructor() {
    this.mouseCoords = new Vector2(0, 0);
    this.normalizedMouseCoords = new Vector2(0, 0);
    this.isReduced = false;
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
    let xRange = 4.5,
      yRange = 1;
    if (this.isReduced) (xRange = 0.7), (yRange = 0.5);
    target.x = -this.normalizedMouseCoords.x * xRange;
    target.y = -this.normalizedMouseCoords.y * yRange;

    mainScene.cameraContainer.position.x +=
      0.015 * (target.x - mainScene.cameraContainer.position.x);
    mainScene.cameraContainer.position.y +=
      0.015 * (target.y - mainScene.cameraContainer.position.y);
  }
}

const mouse = new Mouse();
export { mouse };
