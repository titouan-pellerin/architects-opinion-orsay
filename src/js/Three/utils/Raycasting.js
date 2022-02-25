import { MathUtils, Raycaster, Vector3 } from "three";
import { mouse } from "../../utils/Mouse";
import raf from "../../utils/Raf";
import { Artwork } from "../Environment/Elements/Artwork";
import { Ground } from "../Environment/Ground";
import { mainScene } from "../MainScene";

export class Raycasting {
  constructor(cameraAnimation) {
    this.cameraAnimation = cameraAnimation;
    this.raycaster = new Raycaster();
    this.raycaster.far = 30;
    this.groundsToRaycast = [];
    this.artworks = [];
    this.spheresToRaycast = [];
    this.currentIntersect = null;
    this.onClickHandler = this.onClick.bind(this);

    this.leavesRayPos = new Vector3();
    this.groundRayPos = new Vector3();
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
        this.groundRayPos.y = MathUtils.damp(this.groundRayPos.y, 0, 2, raf.deltaTime);
        this.leavesRayPos.y = MathUtils.damp(this.leavesRayPos.y, 0, 2, raf.deltaTime);
      } else if (intersects[0].object.parent instanceof Ground) {
        this.groundFlipped = MathUtils.damp(
          this.groundFlipped,
          intersects[0].object.parent.scale.z,
          4.5,
          raf.deltaTime
        );

        document.body.style.cursor = "default";
        this.currentIntersect = null;
        this.groundRayPos.x = MathUtils.damp(
          this.groundRayPos.x,
          intersects[0].point.x,
          4.5,
          raf.deltaTime
        );
        this.groundRayPos.y = MathUtils.damp(
          this.groundRayPos.y,
          intersects[0].point.y,
          4.5,
          raf.deltaTime
        );
        this.groundRayPos.z = MathUtils.damp(
          this.groundRayPos.z,
          intersects[0].point.z,
          4.5,
          raf.deltaTime
        );
      } else {
        document.body.style.cursor = "default";
        this.currentIntersect = null;
        this.leavesRayPos.x = MathUtils.damp(
          this.leavesRayPos.x,
          intersects[0].point.x,
          4.5,
          raf.deltaTime
        );
        this.leavesRayPos.y = MathUtils.damp(
          this.leavesRayPos.y,
          intersects[0].point.y,
          4.5,
          raf.deltaTime
        );
        this.leavesRayPos.z = MathUtils.damp(
          this.leavesRayPos.z,
          intersects[0].point.z,
          4.5,
          raf.deltaTime
        );
      }
    } else {
      this.groundRayPos.y = MathUtils.damp(this.groundRayPos.y, 3, 2, raf.deltaTime);
      this.leavesRayPos.y = MathUtils.damp(this.leavesRayPos.y, 3, 2, raf.deltaTime);
      document.body.style.cursor = "default";
      this.currentIntersect = null;
    }
  }
}
