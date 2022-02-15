import { MathUtils, Raycaster, Vector3 } from "three";
import { mouse } from "../../utils/Mouse";
import raf from "../../utils/Raf";
import { Artwork } from "../Environment/Elements/Artwork";
import { mainScene } from "../MainScene";

export class Raycasting {
  constructor(cameraAnimation) {
    this.cameraAnimation = cameraAnimation;
    this.raycaster = new Raycaster();
    this.raycaster.far = 25;
    this.objects = [];
    this.artworks = [];
    this.currentIntersect = null;
    this.onClickHandler = this.onClick.bind(this);

    this.rayPos = new Vector3();
    // this.meshTest = new Mesh(new SphereGeometry(), new MeshBasicMaterial());
    // mainScene.add(this.meshTest);
  }

  start(objects = []) {
    this.objects = objects;
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
      [...this.objects, ...this.artworks],
      true
    );

    if (intersects.length) {
      if (intersects[0].object.parent instanceof Artwork) {
        document.body.style.cursor = "pointer";
        this.currentIntersect = intersects[0].object;
      } else {
        console.log("hi");
        document.body.style.cursor = "default";
        this.currentIntersect = null;
        this.rayPos.x = MathUtils.damp(
          this.rayPos.x,
          intersects[0].point.x,
          5,
          raf.deltaTime
        );
        this.rayPos.y = MathUtils.damp(
          this.rayPos.y,
          intersects[0].point.y,
          5,
          raf.deltaTime
        );
        this.rayPos.z = MathUtils.damp(
          this.rayPos.z,
          intersects[0].point.z,
          5,
          raf.deltaTime
        );
        // this.rayPos.x = intersects[0].point.x;
        // this.rayPos.y = intersects[0].point.y;
        // this.rayPos.z = intersects[0].point.z;
      }
      // console.log(this.rayPos);
      // console.log(intersects[0].point);
      // this.meshTest.position.set(
      //   intersects[0].point.x,
      //   intersects[0].point.y,
      //   intersects[0].point.z
      // );
    } else {
      document.body.style.cursor = "default";
      this.currentIntersect = null;
    }
  }
}
