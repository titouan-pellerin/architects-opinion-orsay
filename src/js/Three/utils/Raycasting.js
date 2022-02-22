import { MathUtils, Raycaster, Vector3 } from "three";
import { mouse } from "../../utils/Mouse";
import raf from "../../utils/Raf";
import { Artwork } from "../Environment/Elements/Artwork";
import { mainScene } from "../MainScene";

export class Raycasting {
  constructor(cameraAnimation) {
    this.cameraAnimation = cameraAnimation;
    this.raycaster = new Raycaster();
    this.raycaster.far = 35;
    this.groundsToRaycast = [];
    this.artworks = [];
    this.spheresToRaycast = [];
    this.currentIntersect = null;
    this.onClickHandler = this.onClick.bind(this);

    this.rayPos = new Vector3();
    this.groundFlipped = 1;
  }

  start() {
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
    if (this.currentIntersect) {
      this.cameraAnimation.goToArtwork(this.currentIntersect.parent);
    }
  }

  updateArtworks(newArtworks = []) {
    this.artworks = newArtworks;
  }

  removeArtworks() {
    this.artworks = [];
  }

  update() {
    this.raycaster.setFromCamera(mouse.normalizedMouseCoords, mainScene.camera);
    const intersects = this.raycaster.intersectObjects(
      [...this.groundsToRaycast, ...this.spheresToRaycast.flat(), ...this.artworks],
      true
    );

    if (intersects.length) {
      if (intersects[0].object.parent instanceof Artwork) {
        document.body.style.cursor = "pointer";
        this.currentIntersect = intersects[0].object;
        this.rayPos.y = MathUtils.damp(this.rayPos.y, -5, 1, raf.deltaTime);
      } else {
        intersects[0].object.parent.scale.z === -1
          ? (this.groundFlipped = -1)
          : (this.groundFlipped = 1);

        document.body.style.cursor = "default";
        this.currentIntersect = null;
        this.rayPos.x = MathUtils.damp(
          this.rayPos.x,
          intersects[0].point.x,
          4.5,
          raf.deltaTime
        );
        this.rayPos.y = MathUtils.damp(
          this.rayPos.y,
          intersects[0].point.y,
          4.5,
          raf.deltaTime
        );
        this.rayPos.z = MathUtils.damp(
          this.rayPos.z,
          intersects[0].point.z,
          4.5,
          raf.deltaTime
        );
      }
    } else {
      this.rayPos.y = MathUtils.damp(this.rayPos.y, -5, 1, raf.deltaTime);
      document.body.style.cursor = "default";
      this.currentIntersect = null;
    }
  }
}
