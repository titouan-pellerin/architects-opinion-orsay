import gsap from "gsap";
import { MathUtils, Raycaster, Vector3 } from "three";
import { mainScene, mouse } from "../../../main";
import raf from "../../utils/Raf";
import { Artwork } from "../Environment/Elements/Artwork";
import { Ground } from "../Environment/Ground";

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
    this.backBtn = document.querySelector(".btn-back_container");
    this.backBtn.addEventListener("click", this.onBackBtnClick.bind(this));

    this.leavesRayPos = new Vector3();
    this.groundRayPos = new Vector3();
    this.groundFlipped = 1;

    this.isPaused = false;
    this.isZoomed = false;
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
      this.isZoomed = true;
      Artwork.contentArtworkTitlesTween.reverse();
      this.cameraAnimation.goToArtwork(this.currentIntersect);
      gsap.to(this.backBtn, {
        duration: 0.5,
        opacity: 1,
        pointerEvents: "all",
        delay: 2.25,
      });
      gsap.to(".content-artwork_footer", {
        duration: 0.5,
        opacity: 1,
        delay: 2,
      });
      gsap.to([".btn-chapters_container", ".btn-next_container"], {
        duration: 0.5,
        opacity: 0,
        pointerEvents: "none",
      });
      gsap.to(".btn-next_container", {
        duration: 0,
        delay: 0.5,
        display: "none",
      });
    }
  }

  onBackBtnClick() {
    this.cameraAnimation.goBackFromArtwork().eventCallback("onReverseComplete", () => {
      this.isZoomed = false;
      this.backBtn.style.pointerEvents = "none";
    });
    gsap.to(".content-artwork_footer", {
      duration: 0.5,
      opacity: 0,
    });
    gsap.to(this.backBtn, {
      duration: 0.5,
      opacity: 0,
      pointerEvents: "none",
    });
    gsap.to([".btn-chapters_container", ".btn-next_container"], {
      duration: 0.5,
      opacity: 1,
      pointerEvents: "all",
      delay: 2.5,
    });
    gsap.to(".btn-next_container", {
      duration: 0,
      display: "block",
      delay: 2.5,
    });
  }

  updateArtworks(newArtworks = []) {
    this.artworks = newArtworks;
    this.isPaused = false;
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
      if (
        intersects[0].object.parent instanceof Artwork &&
        !this.isPaused &&
        !this.isZoomed
      ) {
        if (!this.currentIntersect) {
          intersects[0].object.parent.updateDom();
          intersects[0].object.parent.hoverTimeline.play();
          Artwork.contentArtworkTitlesTween.play();
          if (!this.canvasContainerTween)
            this.canvasContainerTween = gsap
              .to(".canvas-container", {
                duration: 0.5,
                opacity: 0.5,
              })
              .pause();
          this.canvasContainerTween.play();
        }
        document.body.style.cursor = "pointer";
        this.currentIntersect = intersects[0].object.parent;
        this.groundRayPos.y = MathUtils.damp(this.groundRayPos.y, 0, 0, raf.deltaTime);
        this.leavesRayPos.y = MathUtils.damp(this.leavesRayPos.y, 0, 0, raf.deltaTime);
      } else if (intersects[0].object.parent instanceof Ground) {
        document.body.style.cursor = "default";
        if (this.currentIntersect) this.currentIntersect.hoverTimeline.reverse();
        this.currentIntersect = null;
        Artwork.contentArtworkTitlesTween.reverse();

        if (this.canvasContainerTween) this.canvasContainerTween.reverse();

        this.groundFlipped = MathUtils.damp(
          this.groundFlipped,
          intersects[0].object.parent.scale.z,
          5,
          raf.deltaTime
        );

        this.groundRayPos.x = MathUtils.damp(
          this.groundRayPos.x,
          intersects[0].point.x,
          5,
          raf.deltaTime
        );
        this.groundRayPos.y = MathUtils.damp(
          this.groundRayPos.y,
          intersects[0].point.y,
          5,
          raf.deltaTime
        );
        this.groundRayPos.z = MathUtils.damp(
          this.groundRayPos.z,
          intersects[0].point.z,
          5,
          raf.deltaTime
        );
      } else {
        document.body.style.cursor = "default";
        if (this.currentIntersect) this.currentIntersect.hoverTimeline.reverse();

        this.currentIntersect = null;
        Artwork.contentArtworkTitlesTween.reverse();

        if (this.canvasContainerTween) this.canvasContainerTween.reverse();

        this.leavesRayPos.x = MathUtils.damp(
          this.leavesRayPos.x,
          intersects[0].point.x,
          5,
          raf.deltaTime
        );
        this.leavesRayPos.y = MathUtils.damp(
          this.leavesRayPos.y,
          intersects[0].point.y,
          5,
          raf.deltaTime
        );
        this.leavesRayPos.z = MathUtils.damp(
          this.leavesRayPos.z,
          intersects[0].point.z,
          5,
          raf.deltaTime
        );
      }
    } else {
      this.groundRayPos.y = MathUtils.damp(this.groundRayPos.y, 0, 2, raf.deltaTime);
      this.leavesRayPos.y = MathUtils.damp(this.leavesRayPos.y, 0, 2, raf.deltaTime);
      document.body.style.cursor = "default";
      if (this.currentIntersect) this.currentIntersect.hoverTimeline.reverse();
      this.currentIntersect = null;
      Artwork.contentArtworkTitlesTween.reverse();

      if (this.canvasContainerTween) this.canvasContainerTween.reverse();
    }
  }
}
