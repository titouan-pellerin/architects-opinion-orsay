import {
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  Raycaster,
  SphereGeometry,
  Vector3,
} from "three";
import { mouse } from "../../utils/Mouse";
import raf from "../../utils/Raf";
import { Artwork } from "../Environment/Elements/Artwork";
import { mainScene } from "../MainScene";

export class Raycasting {
  constructor(cameraAnimation) {
    this.cameraAnimation = cameraAnimation;
    this.raycaster = new Raycaster();
    this.raycaster.far = 35;
    this.objects = [];
    this.artworks = [];
    this.spheresToRaycast = [];
    this.currentIntersect = null;
    this.onClickHandler = this.onClick.bind(this);

    this.groundRayPos = new Vector3();
    this.boxTargetRayPos = new Vector3();

    this.sphereTest = new Mesh(new SphereGeometry(), new MeshBasicMaterial());
    this.sphereTest.scale.setScalar(0.5);
    mainScene.add(this.sphereTest);
    // this.meshTest = new Mesh(new SphereGeometry(), new MeshBasicMaterial());
    // mainScene.add(this.meshTest);
  }

  start(objects = [], spheresToRaycast = []) {
    this.objects = objects;
    this.spheresToRaycast = spheresToRaycast;
    console.log(this.spheresToRaycast);
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
      [...this.objects, ...this.spheresToRaycast, ...this.artworks],
      true
    );

    if (intersects.length) {
      if (intersects[0].object.parent instanceof Artwork) {
        document.body.style.cursor = "pointer";
        this.currentIntersect = intersects[0].object;
      } else {
        // if (intersects[0].object.geometry instanceof SphereGeometry)
        console.log(this.groundRayPos);
        this.sphereTest.position.copy(this.groundRayPos);
        document.body.style.cursor = "default";
        this.currentIntersect = null;
        this.groundRayPos.x = MathUtils.damp(
          this.groundRayPos.x,
          intersects[0].point.x,
          4,
          raf.deltaTime
        );
        this.groundRayPos.y = MathUtils.damp(
          this.groundRayPos.y,
          intersects[0].point.y,
          4,
          raf.deltaTime
        );
        this.groundRayPos.z = MathUtils.damp(
          this.groundRayPos.z,
          intersects[0].point.z,
          4,
          raf.deltaTime
        );
        // this.groundRayPos.x = intersects[0].point.x;
        // this.groundRayPos.y = intersects[0].point.y;
        // this.groundRayPos.z = intersects[0].point.z;
      }
      // console.log(this.groundRayPos);
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
