import { Vector2 } from "three";
import raf from "./Raf";

class Mouse {
  constructor() {
    this.mouseCoords = new Vector2(0, 0);
    this.normalizedMouseCoords = new Vector2(0, 0);
    this.range = new Vector2(0.15, 0.1);
    this.delta = new Vector2();
    this.isDown = false;
    document.addEventListener("mousedown", this.mouseDown.bind(this));
    document.addEventListener("mousemove", this.mouseMove.bind(this));
    document.addEventListener("mouseout", this.mouseUp.bind(this));
    document.addEventListener("mouseup", this.mouseUp.bind(this));
    raf.subscribe("mouse", this.update.bind(this));
  }

  mouseDown(e) {
    e.preventDefault();
    this.isDown = true;
    this.mouseCoords.x = e.clientX;
    this.mouseCoords.y = e.clientY;
  }

  mouseMove(e) {
    if (!this.isDown) return;
    e.preventDefault();

    this.delta.set(
      ((e.clientX - this.mouseCoords.x) / window.innerWidth) * 2 - 1,
      (-(e.clientY - this.mouseCoords.y) / window.innerHeight) * 2 + 1
    );
    this.mouseCoords.set(e.clientX, e.clientY);

    this.normalizedMouseCoords.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.normalizedMouseCoords.y = -(e.clientY / window.innerHeight) * 2 + 1;
    console.log(this.normalizedMouseCoords);
  }

  mouseUp(e) {
    e.preventDefault();
    this.isDown = false;
  }

  update() {
    // const target = new Vector2();
    // target.x = -this.normalizedMouseCoords.x * this.range.x;
    // target.y = this.normalizedMouseCoords.y * this.range.y;
    // mainScene.camera.rotation.y += 0.015 * (target.x - mainScene.camera.rotation.y);
    // mainScene.camera.rotation.x += 0.015 * (target.y - mainScene.camera.rotation.x);
  }
}

const mouse = new Mouse();
export { mouse };
