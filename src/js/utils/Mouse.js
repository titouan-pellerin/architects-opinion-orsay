import { Vector2 } from "three";

class Mouse {
  constructor() {
    this.mouseCoords = new Vector2(0, 0);
    this.normalizedMouseCoords = new Vector2(0, 0);
    document.addEventListener("mousemove", this.mouseMove.bind(this));
  }

  mouseMove(e) {
    this.mouseCoords.x = e.clientX;
    this.mouseCoords.y = e.clientY;

    this.normalizedMouseCoords.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.normalizedMouseCoords.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }
}

const mouse = new Mouse();
export { mouse };
