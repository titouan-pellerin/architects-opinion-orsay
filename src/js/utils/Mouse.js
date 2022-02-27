import gsap from "gsap";
import { MathUtils, Vector2 } from "three";
import { mainScene } from "../../main";
import raf from "./Raf";

export class Mouse {
  constructor() {
    this.mouseCoords = new Vector2();
    this.normalizedMouseCoords = new Vector2();
    this.range = new Vector2(0.2, 0.1);
    this.mouseMoveHandler = this.mouseMove.bind(this);
    document.addEventListener("mousemove", this.mouseMoveHandler);
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

    const xRotateOffset = target.x - mainScene.camera.rotation.y;
    const yRotateOffset = target.y - mainScene.camera.rotation.x;

    mainScene.camera.rotation.y = MathUtils.damp(
      mainScene.camera.rotation.y,
      mainScene.camera.rotation.y + xRotateOffset,
      2,
      raf.deltaTime
    );
    mainScene.camera.rotation.x = MathUtils.damp(
      mainScene.camera.rotation.x,
      mainScene.camera.rotation.x + yRotateOffset,
      2,
      raf.deltaTime
    );
  }

  pause() {
    // this.removeMouseMove();
    gsap.to(this.range, {
      duration: 1,
      x: 0.1,
      y: 0.05,
    });
  }

  resume() {
    // document.addEventListener("mousemove", this.mouseMoveHandler);
    gsap.to(this.range, { duration: 1, x: 0.2, y: 0.1 });
  }
}
