/* eslint-disable no-undef */
import gsap from "gsap";
import { Line, Vector3 } from "three";
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
    this.envScale = envScale;
    this.path = path;

    this.goToCheckpointTl;
    this.goToArtworkTl;

    this.tick = {
      value: 0,
    };

    this.debugObject = {
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

  tpToCheckpoint(index, raycasting) {
    this.goToCheckpointTl = null;
    if (index === 0) this.tick.value = 0;
    else this.tick.value = this.checkpoints[index - 1].tick;

    // this.voiceOver.playChapter(index);

    const nextTick = this.tick.value + 0.007;

    const curvePoint = this.path.spline.getPointAt(this.tick.value);
    const curvePoint2 = this.path.spline.getPointAt(nextTick);

    const camPos = new Vector3(curvePoint.x, -1, curvePoint.y);
    const camPos2 = new Vector3(curvePoint2.x, -1, curvePoint2.y);
    const tpToCheckpointTl = gsap.timeline({ paused: true });
    tpToCheckpointTl.to(
      mainScene.background,
      {
        duration: 1,
        r: mainScene.parameters.environments[index].skyBgColor.r,
        g: mainScene.parameters.environments[index].skyBgColor.g,
        b: mainScene.parameters.environments[index].skyBgColor.b,
      },
      0
    );
    tpToCheckpointTl.to(
      mainScene.fog.color,
      {
        duration: 1,
        r: mainScene.parameters.environments[index].skyBgColor.r,
        g: mainScene.parameters.environments[index].skyBgColor.g,
        b: mainScene.parameters.environments[index].skyBgColor.b,
      },
      0
    );
    tpToCheckpointTl.to(
      mainScene.fog.color,
      {
        duration: 1,
        r: mainScene.parameters.environments[index].skyBgColor.r,
        g: mainScene.parameters.environments[index].skyBgColor.g,
        b: mainScene.parameters.environments[index].skyBgColor.b,
      },
      0
    );
    tpToCheckpointTl.to(
      mainScene.directionalLight.color,
      {
        duration: 1,
        r: mainScene.parameters.environments[index].lightColor.r,
        g: mainScene.parameters.environments[index].lightColor.g,
        b: mainScene.parameters.environments[index].lightColor.b,
      },
      0
    );
    tpToCheckpointTl.to(
      mainScene.directionalLight2.color,
      {
        duration: 1,
        r: mainScene.parameters.environments[index].light2Color.r,
        g: mainScene.parameters.environments[index].light2Color.g,
        b: mainScene.parameters.environments[index].light2Color.b,
      },
      0
    );
    tpToCheckpointTl.to(
      mainScene.customPass.material.uniforms.uSunProgress,
      {
        duration: 1,
        value: mainScene.parameters.environments[index].sunProgress,
      },
      0
    );
    tpToCheckpointTl.play();

    mainScene.cameraContainer.position.set(camPos.x, camPos.y, camPos.z);
    mainScene.cameraContainer.lookAt(camPos2.x, camPos2.y, camPos2.z);
    mainScene.cameraContainer.userData.lookingAt = camPos2;
    mainScene.cameraContainer.rotateX(Math.PI);
    mainScene.cameraContainer.rotateZ(Math.PI);

    this.checkpointsIndex = index;
    this.goToCheckpoint(raycasting);
  }

  /**
   *
   * @param {Number} index
   * @param {Raycasting} raycasting
   */
  goToCheckpoint(raycasting) {
    raycasting.removeArtworks();
    mouse.range.x = 0.2;

    if (this.checkpointsIndex <= 4) {
      this.voiceOver.playChapter(this.checkpointsIndex);

      if (this.checkpoints[this.checkpointsIndex].chapterDomEl) {
        gsap
          .timeline()
          .to(
            ".canvas-container",
            {
              opacity: 0.5,
              duration: 2,
            },
            0
          )
          .to(
            this.checkpoints[this.checkpointsIndex].chapterDomEl,
            {
              opacity: 1,
              duration: 2,
            },
            0
          )
          .to(this.checkpoints[this.checkpointsIndex].chapterDomEl, {
            delay: 2,
            duration: 1,
            opacity: 0,
          })
          .to(".canvas-container", {
            opacity: 1,
            duration: 1,
            delay: -2,
          });
      } else document.querySelector(".btn-next_container .text").textContent = "Continue";
      this.goToCheckpointTl = gsap.timeline({ paused: true });
      this.goToCheckpointTl.to(
        ".btn-next_container",
        {
          duration: 1,
          opacity: 0,
        },
        0
      );
      this.goToCheckpointTl.to(
        mainScene.background,
        {
          duration: this.checkpoints[this.checkpointsIndex].duration,
          r: mainScene.parameters.environments[this.checkpointsIndex + 1].skyBgColor.r,
          g: mainScene.parameters.environments[this.checkpointsIndex + 1].skyBgColor.g,
          b: mainScene.parameters.environments[this.checkpointsIndex + 1].skyBgColor.b,
        },
        0
      );
      this.goToCheckpointTl.to(
        mainScene.fog.color,
        {
          duration: this.checkpoints[this.checkpointsIndex].duration,
          r: mainScene.parameters.environments[this.checkpointsIndex + 1].skyBgColor.r,
          g: mainScene.parameters.environments[this.checkpointsIndex + 1].skyBgColor.g,
          b: mainScene.parameters.environments[this.checkpointsIndex + 1].skyBgColor.b,
        },
        0
      );
      this.goToCheckpointTl.to(
        mainScene.directionalLight.color,
        {
          duration: this.checkpoints[this.checkpointsIndex].duration,
          r: mainScene.parameters.environments[this.checkpointsIndex + 1].lightColor.r,
          g: mainScene.parameters.environments[this.checkpointsIndex + 1].lightColor.g,
          b: mainScene.parameters.environments[this.checkpointsIndex + 1].lightColor.b,
        },
        0
      );
      this.goToCheckpointTl.to(
        mainScene.directionalLight2.color,
        {
          duration: this.checkpoints[this.checkpointsIndex].duration,
          r: mainScene.parameters.environments[this.checkpointsIndex + 1].light2Color.r,
          g: mainScene.parameters.environments[this.checkpointsIndex + 1].light2Color.g,
          b: mainScene.parameters.environments[this.checkpointsIndex + 1].light2Color.b,
        },
        0
      );
      this.goToCheckpointTl.to(
        mainScene.customPass.material.uniforms.uSunProgress,
        {
          duration: this.checkpoints[this.checkpointsIndex].duration,
          value: mainScene.parameters.environments[this.checkpointsIndex + 1].sunProgress,
        },
        0
      );
      this.goToCheckpointTl.to(
        this.tick,
        {
          // delay: this.checkpointsIndex === 0 ? 3 : 0,
          // duration: this.checkpoints[this.checkpointsIndex].duration,
          duration: 1,
          value: this.checkpoints[this.checkpointsIndex].tick,
          // value: 1,
          ease: CustomEase.create(
            "custom",
            `M0,0 C0.07,0 0.114,0.067 0.178,0.126 0.294,0.233 0.42,0.378
              0.507,0.512 0.595,0.65 0.718,0.779 0.822,0.876 0.887,0.937 0.931,1 1,1`
          ),
          onUpdate: () => {
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
            raycasting.updateArtworks(this.checkpoints[this.checkpointsIndex].artworks);
            this.checkpointsIndex++;
            mouse.range.x = 0.3;
          },
        },
        0
      );
      this.goToCheckpointTl.play();
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

    this.goToArtworkTl = gsap
      .timeline({ paused: true })
      .to(
        [".content-subtitles", ".btn-next_container .text-wrapper"],
        {
          duration: 1,
          opacity: 0,
        },
        0
      )
      .to(
        mouse.range,
        {
          duration: 3.5,
          ease: "power3.inOut",
          x: 0.15,
          y: 0.07,
        },
        0
      )
      .to(
        mainScene.cameraContainer.position,
        {
          // delay: 1,
          duration: 3.5,
          ease: "power3.inOut",
          x: newCamPos.x,
          y: newCamPos.y,
          z: newCamPos.z,
        },
        0
      )
      .to(
        mainScene.cameraContainer.userData.lookingAt,
        {
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
          // onComplete: () => {
          //   this.positionTween.reverse();
          //   this.lookAtTween.reverse();
          //   // this.raycasting.start(this.checkpoints[this.checkpointsIndex - 1].artworks);
          // },
        },
        0
      );
    this.goToArtworkTl.play();
  }

  goBackFromArtwork() {
    if (this.goToArtworkTl) {
      this.goToArtworkTl.reverse();
    }
    return this.goToArtworkTl;
  }

  pause() {
    if (this.goToCheckpointTl) this.goToCheckpointTl.pause();
  }
  resume() {
    if (this.goToCheckpointTl) this.goToCheckpointTl.resume();
  }
}
