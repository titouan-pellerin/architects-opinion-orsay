import { Vector2, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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

  enableOrbitControls() {
    this.controls = new OrbitControls(mainScene.camera, mainScene.canvas);
    mainScene.camera.position.copy(mainScene.cameraContainer.position);
    mainScene.camera.quaternion.slerp(mainScene.cameraContainer.quaternion, 0.5);
    mainScene.add(mainScene.camera);
    mainScene.remove(mainScene.cameraContainer);
    this.controls.target = new Vector3(
      mainScene.camera.position.x,
      mainScene.camera.position.y,
      mainScene.camera.position.z - 0.1
    );
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.03;
    this.controls.enableRotate = true;
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    this.controls.rotateSpeed = -0.2;
    this.controls.enabled = true;
    this.controls.update();
  }

  update() {
    const target = new Vector2();
    target.x = -this.normalizedMouseCoords.x * this.range.x;
    target.y = this.normalizedMouseCoords.y * this.range.y;

    const xRotateOffset = 0.015 * (target.x - mainScene.camera.rotation.y);
    const yRotateOffset = 0.015 * (target.y - mainScene.camera.rotation.x);
    if (
      !this.isOnMouseMove &&
      Math.abs(xRotateOffset) < 0.0001 &&
      Math.abs(yRotateOffset) < 0.0001
    )
      this.enableOrbitControls();
    else if (!this.controls) {
      mainScene.camera.rotation.y += xRotateOffset;
      mainScene.camera.rotation.x += yRotateOffset;
    } else this.controls.update();
  }
}

const mouse = new Mouse();
export { mouse };
