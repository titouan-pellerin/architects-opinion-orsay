import gsap from "gsap";
import { Color } from "three";
import { mainScene, mouse } from "../../../main";
import { texturesMap } from "../../utils/assets";
import { customFogUniforms } from "../../utils/misc";
import { positions } from "../../utils/positions";
import { Voiceover } from "../../Voiceover/Voiceover";
import { CameraAnimation } from "../Path/CameraAnimation";
import { Checkpoint } from "../Path/Checkpoint";
import { ForestPathLine } from "../Path/ForestPathLine";
import { Raycasting } from "../utils/Raycasting";
import { Artwork } from "./Elements/Artwork";
import { Grounds } from "./Grounds";

export class Environment {
  constructor(audioListener, music) {
    this.parameters = {
      envScale: 100,
      groundSize: 0.5,
      groundColor: new Color("#fbab32"),
      speed: 0.125,
      stroke: 5000,
      smallNoise: 500,
      bigNoise: 50,
      strokeSky: 1360,
      smallNoiseSky: 318,
      bigNoiseSky: 9.7,
    };

    this.audioListener = audioListener;
    this.music = music;

    this.musicVolume = { level: 0.12 };
    this.chapterClicked;
    this.masterVolume = { level: 1 };
    this.muteTween = gsap
      .to(this.masterVolume, {
        duration: 0.5,
        level: 0,
        onUpdate: () => {
          this.audioListener.setMasterVolume(this.masterVolume.level);
        },
      })
      .pause();

    this.forestPathLine = new ForestPathLine(1024, 1, this.parameters);

    this.artworks = [];
    for (let i = 0; i < positions.get("artworksPositions").length; i++) {
      const artwork = new Artwork(
        texturesMap.get("artworksTextures")[i],
        positions.get("artworksPositions")[i]
      );
      this.artworks.push(artwork);
    }

    const chaptersDomElements = document.querySelectorAll(".chap");

    const checkpoints = [];
    const checkpoint1 = new Checkpoint(
      0.16,
      35.3,
      this.forestPathLine.spline,
      [this.artworks[0], this.artworks[1], this.artworks[2], this.artworks[3]],
      chaptersDomElements[1]
    );
    const checkpoint2 = new Checkpoint(
      0.42,
      51.6,
      this.forestPathLine.spline,
      [this.artworks[4], this.artworks[5], this.artworks[6], this.artworks[7]],
      chaptersDomElements[2]
    );
    const checkpoint3 = new Checkpoint(
      0.62,
      32.6,
      this.forestPathLine.spline,
      [this.artworks[8], this.artworks[9], this.artworks[10], this.artworks[11]],
      chaptersDomElements[3]
    );
    const checkpoint4 = new Checkpoint(
      0.8,
      45.3,
      this.forestPathLine.spline,
      [this.artworks[12], this.artworks[13], this.artworks[14], this.artworks[15]],
      chaptersDomElements[4]
    );
    const checkpoint5 = new Checkpoint(0.9, 21.3, this.forestPathLine.spline, []);
    checkpoints.push(checkpoint1, checkpoint2, checkpoint3, checkpoint4, checkpoint5);

    this.voiceOver = new Voiceover();

    this.cameraAnimation = new CameraAnimation(
      this.forestPathLine,
      this.parameters.envScale,
      checkpoints,
      this.voiceOver
    );

    this.raycasting = new Raycasting(this.cameraAnimation);

    this.grounds = new Grounds(
      this.parameters,
      this.forestPathLine,
      this.artworks,
      this.raycasting
    );

    this.raycasting.start();

    /**
     * Menu animations
     */
    this.chaptersBtn = document.querySelector(".btn-chapters_container");
    this.closeBtn = document.querySelector(".btn-close_container");
    this.contentMenu = document.querySelector(".content-menu");
    this.menuChapters = document.querySelectorAll(".title-section");
    // this.li = document.querySelector(".menu-btn_section");
    this.artworkIn = document.querySelector(".artwork-in");
    this.artworkOut = document.querySelector(".artwork-out");
    this.soundBtn = document.querySelector(".btn-sound_container");
    this.nextBtn = document.querySelector(".btn-next_container");

    this.chaptersBtn.addEventListener("click", this.openMenu.bind(this));
    this.closeBtn.addEventListener("click", this.closeMenu.bind(this));
    this.soundBtn.addEventListener("click", this.muteExperience.bind(this));
    this.nextBtn.addEventListener("click", () => {
      this.cameraAnimation.goToCheckpoint(this.raycasting);
    });

    this.menuChapters.forEach((menuChapter) => {
      menuChapter.addEventListener("click", this.clickChapter.bind(this), false);
    });

    this.menuAnimation = gsap.timeline({ paused: true });
    this.menuAnimation.to(mainScene.customPass.uniforms.uMenuSwitch, {
      duration: 0,
      value: 2,
    });
    this.menuAnimation.to(customFogUniforms.progress, { duration: 3, value: 1.15 });
    this.menuAnimation.to(mainScene.customPass.uniforms.uBorderFadeProgress, {
      duration: 1.25,
      value: 0.2,
      delay: -3,
    });
    this.menuAnimation.to(customFogUniforms.transitionIsIn, {
      duration: 0,
      value: 1,
      delay: -1,
      onComplete: () => {
        switch (this.chapterClicked) {
          case 0:
            this.grounds.groundIndex = 0;
            break;
          case 1:
            this.grounds.groundIndex = 0;
            break;
          case 2:
            this.grounds.groundIndex = 1;
            break;
          case 3:
            this.grounds.groundIndex = 2;
            break;
          default:
            this.grounds.groundIndex = 3;
            break;
        }
        this.cameraAnimation.tpToCheckpoint(this.chapterClicked, this.raycasting);
        // this.grounds.switchGrounds();
      },
    });
    this.menuAnimation.to(customFogUniforms.progress, {
      duration: 0,
      value: -0.1,
      delay: -1,
    });
    this.menuAnimation.to(customFogUniforms.progress, {
      duration: 3,
      value: 1.15,
      delay: -1,
    });
    this.menuAnimation.to(mainScene.customPass.uniforms.uFadeProgress, {
      value: 1,
      duration: 1.5,
      delay: -2.5,
    });
    this.menuAnimation.to(customFogUniforms.transitionIsIn, { duration: 0, value: 0 });
    this.menuAnimation.to(customFogUniforms.progress, {
      duration: 0,
      value: -0.1,
      onComplete: () => {
        mainScene.customPass.uniforms.uBorderFadeProgress.value = 1;
        mainScene.customPass.uniforms.uMenuSwitch.value = 0.0;
        mainScene.customPass.uniforms.uProgress.value = 0;
        mainScene.customPass.uniforms.uMenuSwitch.value = 0;
        mainScene.customPass.uniforms.uFadeProgress.value = 0;
        mainScene.customPass.uniforms.uMenuSwitch.value = 0.0;
        mainScene.customPass.uniforms.uProgress.value = 0;
        this.chaptersBtn.style.pointerEvents = "all";
        this.chaptersBtn.style.opacity = "1";
      },
    });

    this.musicVolumeTween = gsap
      .to(this.musicVolume, {
        duration: 1,
        level: 0.05,
        onUpdate: () => {
          this.music.setVolume(this.musicVolume.level);
        },
      })
      .pause();

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.audioListener.context.suspend();
        return;
      }
      this.audioListener.context.resume();
    });

    document.querySelector(".btn-restart_container").addEventListener("click", () => {
      gsap.to(".btn-restart_container", {
        opacity: 0,
        duration: 1,
        pointerEvents: "none",
      });
      this.pauseExperience();
      this.clickChapter(null, 0);
      // this.resumeExperience();
    });
  }

  startExperience() {
    this.voiceOver.init(this.audioListener);
  }

  goToCheckpoint() {
    this.cameraAnimation.goToCheckpoint(this.raycasting);
  }

  openMenu() {
    this.pauseExperience();
    this.chaptersBtn.style.pointerEvents = "none";
    gsap.to(this.chaptersBtn, { duration: 1, opacity: 0 });
    gsap.to(".content-subtitles p", { duration: 1, opacity: 0 });
    gsap.to(".canvas-container", { duration: 1, opacity: 1 });
    gsap.to(".content-interface_titles .chap", { duration: 1, opacity: 0 });
    gsap.to(".btn-next_container", { duration: 1, opacity: 0 });
    gsap.to(".content-menu .title-wrapper .title-section", {
      duration: 1.25,
      opacity: "1",
      stagger: 0.15,
      delay: 0.5,
    });
    gsap.to(".content-menu svg", {
      duration: 1,
      opacity: "1",
      delay: 1,
    });
    gsap.to(".content-menu .credits-title", {
      duration: 1,
      opacity: "1",
      stagger: 0.1,
      delay: 1,
    });
    gsap.to(".content-menu a", {
      duration: 1,
      opacity: "1",
      stagger: 0.1,
      delay: 1,
    });
    gsap.to(".content-menu .credits-wrapper span", {
      duration: 1,
      opacity: "1",
      delay: 1,
    });
    gsap.to(".content-menu .btn-close_container", {
      duration: 1,
      opacity: "1",
      delay: 1,
    });
    gsap.to(mainScene.customPass.uniforms.uProgress, {
      value: 1.3,
      duration: 1.5,
      onComplete: () => {
        mainScene.customPass.uniforms.uMenuSwitch.value = 1.0;
        mainScene.customPass.uniforms.uProgress.value = 0;

        this.contentMenu.style.pointerEvents = "all";
      },
    });
  }

  closeMenu(resume = true) {
    if (resume) {
      this.resumeExperience();
      gsap.to(mainScene.customPass.uniforms.uProgress, {
        value: 1.3,
        duration: 1.5,
        onComplete: () => {
          mainScene.customPass.uniforms.uMenuSwitch.value = 0.0;
          mainScene.customPass.uniforms.uProgress.value = 0;
          this.chaptersBtn.style.pointerEvents = "all";
        },
      });
      gsap.to(this.chaptersBtn, { duration: 1, opacity: 1, delay: 1 });
      gsap.to(".content-subtitles p", { duration: 1, opacity: 1, delay: 1 });
      gsap.to(".btn-next_container", { duration: 1, opacity: 1, delay: 1 });
    } else {
      gsap.to(this.chaptersBtn, { duration: 1, opacity: 1, delay: 3.5 });
      gsap.to(".content-subtitles", {
        duration: 1,
        opacity: 1,
        delay: 3.5,
        onComplete: () => {
          if (this.music) this.musicVolumeTween.reverse();
        },
      });
    }
    this.contentMenu.style.pointerEvents = "none";
    gsap.to(".content-menu .btn-close_container", {
      duration: 1,
      opacity: "0",
    });
    gsap.to(".content-menu .title-wrapper .title-section", {
      duration: 1,
      opacity: "0",
      stagger: 0.1,
    });
    gsap.to(".content-menu svg", {
      duration: 1,
      opacity: "0",
    });
    gsap.to(".content-menu .credits-title", {
      duration: 1,
      opacity: "0",
      stagger: 0.1,
    });
    gsap.to(".content-menu a", {
      duration: 1,
      opacity: "0",
      stagger: 0.1,
    });
    gsap.to(".content-menu .credits-wrapper span", {
      duration: 1,
      opacity: "0",
    });
  }

  clickChapter(e, customIndex) {
    this.chapterClicked =
      customIndex === 0 ? customIndex : parseInt(e.currentTarget.dataset.chapter);
    this.menuAnimation.pause(0);
    this.menuAnimation.play();
    this.closeMenu(false);
  }

  pauseExperience() {
    console.log("Pause experience");
    this.cameraAnimation.pause();
    mouse.pause();
    this.raycasting.isPaused = true;
    if (this.music) this.musicVolumeTween.play();
    if (this.voiceOver.currentRecord) this.voiceOver.pause();
  }

  resumeExperience() {
    console.log("Resume experience");
    this.cameraAnimation.resume();
    mouse.resume();
    this.raycasting.isPaused = false;
    if (this.music) this.musicVolumeTween.reverse();
    if (this.voiceOver.currentRecord) this.voiceOver.resume();
  }

  muteExperience() {
    if (this.masterVolume.level === 1) {
      gsap.to(".btn-sound_container .wrapper-on", {
        duration: 0.35,
        opacity: 0,
        ease: "circ.out",
        onComplete: () => {},
      });
      gsap.to(".btn-sound_container .wrapper-off", {
        duration: 0.35,
        opacity: 1,
        delay: 0.25,
        ease: "circ.out",
        onComplete: () => {},
      });
      gsap.to(".btn-sound_container .wrapper", {
        duration: 0.35,
        transform: "translateY(-100%)",
        delay: 0.25,
        ease: "circ.out",
        onComplete: () => {},
      });
      this.muteTween.play();
    } else if (this.masterVolume.level === 0) {
      gsap.to(".btn-sound_container .wrapper-on", {
        duration: 0.35,
        opacity: 1,
        delay: 0.25,
        ease: "circ.out",
        onComplete: () => {},
      });
      gsap.to(".btn-sound_container .wrapper-off", {
        duration: 0.35,
        opacity: 0,
        ease: "circ.out",
        onComplete: () => {},
      });
      gsap.to(".btn-sound_container .wrapper", {
        duration: 0.35,
        delay: 0.25,
        ease: "circ.out",
        transform: "translateY(0)",
        onComplete: () => {},
      });

      this.muteTween.reverse();
    }
  }
}
