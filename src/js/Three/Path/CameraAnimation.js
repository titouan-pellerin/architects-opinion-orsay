/* eslint-disable no-undef */
import gsap from "gsap";
import { Line, ShaderChunk, Vector3 } from "three";
import { guiFolders } from "../../utils/Debug";
import { mouse } from "../../utils/Mouse";
import { Voiceover } from "../../Voiceover/Voiceover";
import { Artwork } from "../Environment/Elements/Artwork";
import { mainScene } from "../MainScene";
import { Raycasting } from "../utils/Raycasting";
import { Checkpoint } from "./Checkpoint";

export class CameraAnimation {
  /**
   *
   * @param {Line} path
   * @param {Number} envScale
   * @param {Checkpoint[]} checkpoints
   * @param {Voiceover} voiceOver
   */
  constructor(path, envScale, checkpoints, voiceOver) {
    gsap.registerPlugin(CustomEase);
    gsap.ticker.lagSmoothing(1000, 16);

    this.voiceOver = voiceOver;
    this.checkpoints = checkpoints;
    this.checkpointsIndex = 0;
    this.isAtCheckpoint = false;
    this.isLeavingCheckpoint = false;
    this.envScale = envScale;
    this.path = path;

    this.lookAtTween;
    this.positionTween;

    console.log(ShaderChunk.fog_pars_fragment);

    this.tick = {
      value: 0,
    };

    this.debugObject = {
      checkpoint1: () => this.goToCheckpoint(0),
      checkpoint2: () => this.goToCheckpoint(1),
      checkpoint3: () => this.goToCheckpoint(2),
      checkpoint4: () => this.goToCheckpoint(3),
      end: () => this.goToCheckpoint(4),
      showLine: false,
    };
    guiFolders
      .get("experience")
      .add(this.debugObject, "showLine")
      .name("Show line")
      .onChange(() => {
        this.debugObject.showLine ? mainScene.add(path) : mainScene.remove(path);
      });
  }
  /**
   *
   * @param {Number} index
   * @param {Raycasting} raycasting
   */
  goToCheckpoint(index, raycasting) {
    raycasting.removeArtworks();
    mouse.range.x = 0.2;

    if (!index) index = this.checkpointsIndex;
    if (index <= 4) {
      this.voiceOver.playChapter(index);
      gsap.to(this.tick, {
        // delay: index === 0 ? 3 : 0,
        duration: this.checkpoints[index].duration,
        // duration: 1,
        value: this.checkpoints[index].tick,
        // value: 1,
        ease: CustomEase.create(
          "custom",
          `M0,0 C0.07,0 0.114,0.067 0.178,0.126 0.294,0.233 0.42,0.378
              0.507,0.512 0.595,0.65 0.718,0.779 0.822,0.876 0.887,0.937 0.931,1 1,1`
        ),
        onUpdate: () => {
          console.log(this.tick.value);
          const nextTick = this.tick.value + 0.007;

          const curvePoint = this.path.spline.getPointAt(this.tick.value);
          const curvePoint2 = this.path.spline.getPointAt(nextTick);

          const camPos = new Vector3(curvePoint.x, -1, curvePoint.y);
          const camPos2 = new Vector3(curvePoint2.x, -1, curvePoint2.y);

          mainScene.cameraContainer.position.set(camPos.x, camPos.y, camPos.z);
          mainScene.cameraContainer.lookAt(camPos2.x, camPos2.y, camPos2.z);
          mainScene.cameraContainer.userData.lookingAt = camPos2;
          mainScene.cameraContainer.rotateX(Math.PI);
          mainScene.cameraContainer.rotateZ(Math.PI);
        },
        onComplete: () => {
          raycasting.updateArtworks(this.checkpoints[index].artworks);
          this.checkpointsIndex++;
          mouse.range.x = 0.4;
        },
      });
    }
  }

  /**
   *
   * @param {Artwork} artwork
   */
  goToArtwork(artwork) {
    const newCamPos = new Vector3();
    artwork.getWorldDirection(newCamPos);
    newCamPos.multiplyScalar(8);
    newCamPos.add(artwork.position);

    this.positionTween = gsap.to(mainScene.cameraContainer.position, {
      duration: 3,
      ease: "power3.inOut",
      x: newCamPos.x,
      y: newCamPos.y,
      z: newCamPos.z,
    });
    this.lookAtTween = gsap.to(mainScene.cameraContainer.userData.lookingAt, {
      duration: 3,
      ease: "power3.inOut",
      x: artwork.position.x,
      y: artwork.position.y,
      z: artwork.position.z,
      onUpdate: () => {
        mainScene.cameraContainer.lookAt(
          mainScene.cameraContainer.userData.lookingAt.x,
          mainScene.cameraContainer.userData.lookingAt.y,
          mainScene.cameraContainer.userData.lookingAt.z
        );
        mainScene.cameraContainer.rotateX(Math.PI);
        mainScene.cameraContainer.rotateZ(Math.PI);
      },
      onComplete: () => {
        this.positionTween.reverse();
        this.lookAtTween.reverse();
        // this.raycasting.start(this.checkpoints[this.checkpointsIndex - 1].artworks);
      },
    });
  }
}
