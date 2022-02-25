import gsap from "gsap";
import { AudioListener, Color, PositionalAudio } from "three";
import { soundsMap, texturesMap } from "../../utils/assets";
import { guiFolders } from "../../utils/Debug";
import { customFogUniforms } from "../../utils/misc";
import { mouse } from "../../utils/Mouse";
import { positions } from "../../utils/positions";
import { Voiceover } from "../../Voiceover/Voiceover";
import { mainScene } from "../MainScene";
import { CameraAnimation } from "../Path/CameraAnimation";
import { Checkpoint } from "../Path/Checkpoint";
import { ForestPathLine } from "../Path/ForestPathLine";
import { Raycasting } from "../utils/Raycasting";
import { Artwork } from "./Elements/Artwork";
import { Grounds } from "./Grounds";

export class Environment {
  constructor() {
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

    this.musicVolume = { level: 0 };

    this.forestPathLine = new ForestPathLine(1024, 1, this.parameters);

    this.artworks = [];
    for (let i = 0; i < positions.get("artworksPositions").length; i++) {
      const artwork = new Artwork(
        texturesMap.get("artworksTextures")[i],
        positions.get("artworksPositions")[i]
      );
      this.artworks.push(artwork);
    }

    const checkpoints = [];
    const checkpoint1 = new Checkpoint(0.16, 35.3, this.forestPathLine.spline, [
      this.artworks[0],
      this.artworks[1],
      this.artworks[2],
      this.artworks[3],
    ]);
    const checkpoint2 = new Checkpoint(0.42, 51.6, this.forestPathLine.spline, [
      this.artworks[4],
      this.artworks[5],
      this.artworks[6],
      this.artworks[7],
    ]);
    const checkpoint3 = new Checkpoint(0.62, 32.6, this.forestPathLine.spline, [
      this.artworks[8],
      this.artworks[9],
      this.artworks[10],
      this.artworks[11],
    ]);
    const checkpoint4 = new Checkpoint(0.8, 45.3, this.forestPathLine.spline, [
      this.artworks[12],
      this.artworks[13],
      this.artworks[14],
      this.artworks[15],
    ]);
    const checkpoint5 = new Checkpoint(0.9, 21.3, this.forestPathLine.spline, []);
    checkpoints.push(checkpoint1, checkpoint2, checkpoint3, checkpoint4, checkpoint5);

    this.voiceOver = new Voiceover();

    this.cameraAnimation = new CameraAnimation(
      this.forestPathLine,
      this.parameters.envScale,
      checkpoints,
      this.voiceOver
    );

    const raycasting = new Raycasting(this.cameraAnimation);

    this.grounds = new Grounds(
      this.parameters,
      this.forestPathLine,
      this.artworks,
      raycasting
    );

    raycasting.start();

    this.debugObject = {
      start: () => {
        this.startExperience();
        // const audioListener = new AudioListener();
        // mainScene.camera.add(audioListener);
        // const music = new PositionalAudio(audioListener);
        // music.setRefDistance(30);
        // music.setRolloffFactor(0);
        // music.setBuffer(soundsMap.get("music"));
        // music.setVolume(0.09);
        // music.play();
        // this.voiceOver.init(audioListener);
      },
      playCheckpoint: () => {
        this.cameraAnimation.goToCheckpoint(raycasting);
      },
      tpToCheckpoints0: () => {
        this.grounds.groundIndex = 0;
        this.cameraAnimation.tpToCheckpoint(0, raycasting);
      },
      tpToCheckpoints1: () => {
        this.grounds.groundIndex = 0;
        this.cameraAnimation.tpToCheckpoint(1, raycasting);
      },
      tpToCheckpoints2: () => {
        this.grounds.groundIndex = 1;
        this.cameraAnimation.tpToCheckpoint(2, raycasting);
      },
      tpToCheckpoints3: () => {
        this.grounds.groundIndex = 2;
        this.cameraAnimation.tpToCheckpoint(3, raycasting);
      },
      tpToCheckpoints4: () => {
        this.grounds.groundIndex = 3;
        this.cameraAnimation.tpToCheckpoint(4, raycasting);
      },
      tpToCheckpoints5: () => {
        this.grounds.groundIndex = 3;
        this.cameraAnimation.tpToCheckpoint(5, raycasting);
      },
    };

    guiFolders.get("experience").add(this.debugObject, "start");
    guiFolders.get("experience").add(this.debugObject, "playCheckpoint");
    guiFolders.get("experience").add(this.debugObject, "tpToCheckpoints0");
    guiFolders.get("experience").add(this.debugObject, "tpToCheckpoints1");
    guiFolders.get("experience").add(this.debugObject, "tpToCheckpoints2");
    guiFolders.get("experience").add(this.debugObject, "tpToCheckpoints3");
    guiFolders.get("experience").add(this.debugObject, "tpToCheckpoints4");
    guiFolders.get("experience").add(this.debugObject, "tpToCheckpoints5");

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

    this.chaptersBtn.addEventListener("click", this.openMenu.bind(this));
    this.closeBtn.addEventListener("click", this.closeMenu.bind(this));
    this.menuChapters.forEach((menuChapter) => {
      menuChapter.addEventListener("click", this.clickChapter.bind(this));
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
      // onComplete: () => {
      //   this.debugObject.tpToCheckpoints0();
      //   // this.resumeExperience();
      // },
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
      },
    });

    const chockwaveAnimation = gsap.timeline({ paused: true });
    chockwaveAnimation.to(customFogUniforms.transitionIsIn, {
      duration: 0,
      value: 2,
    });
    chockwaveAnimation.to(this.artworkIn, { duration: 0, pointerEvents: "none" });
    chockwaveAnimation.to(this.artworkOut, { duration: 0, pointerEvents: "none" });
    chockwaveAnimation.to(this.chaptersBtn, { duration: 0, pointerEvents: "none" });
    chockwaveAnimation.to(customFogUniforms.progress, { duration: 2.25, value: 1.15 });
    chockwaveAnimation.to(customFogUniforms.transitionIsIn, {
      duration: 0,
      value: 3,
      delay: -1.25,
    });
    chockwaveAnimation.to(customFogUniforms.progress, {
      duration: 0,
      value: -0.1,
      delay: -1.25,
    });
    chockwaveAnimation.to(customFogUniforms.progress, {
      duration: 2.25,
      value: 1.15,
      delay: -1.25,
    });
    chockwaveAnimation.to(customFogUniforms.transitionIsIn, { duration: 0, value: 0 });
    chockwaveAnimation.to(customFogUniforms.progress, { duration: 0, value: -0.1 });
    chockwaveAnimation.to(this.artworkIn, { duration: 0, pointerEvents: "all" });
    chockwaveAnimation.to(this.artworkOut, { duration: 0, pointerEvents: "all" });
    chockwaveAnimation.to(this.chaptersBtn, { duration: 0, pointerEvents: "all" });

    this.artworkIn.addEventListener("click", () => {
      chockwaveAnimation.pause(0);
      chockwaveAnimation.play();
    });
    this.artworkOut.addEventListener("click", () => {
      chockwaveAnimation.pause(0);
      chockwaveAnimation.play();
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
  }

  startExperience() {
    this.audioListener = new AudioListener();
    mainScene.camera.add(this.audioListener);
    this.music = new PositionalAudio(this.audioListener);
    this.music.setRefDistance(60);
    this.music.setRolloffFactor(0);
    this.music.setBuffer(soundsMap.get("music"));
    this.music.setVolume(0);
    this.music.play();
    gsap.to(this.musicVolume, {
      duration: 2,
      level: 0.15,
      onUpdate: () => {
        this.music.setVolume(this.musicVolume.level);
      },
    });
    this.voiceOver.init(this.audioListener);
  }

  openMenu() {
    this.pauseExperience();
    this.chaptersBtn.style.pointerEvents = "none";
    this.chaptersBtn.style.opacity = "0";
    gsap.to(mainScene.customPass.uniforms.uProgress, {
      value: 1.3,
      duration: 1.5,
      onComplete: () => {
        mainScene.customPass.uniforms.uMenuSwitch.value = 1.0;
        mainScene.customPass.uniforms.uProgress.value = 0;
        this.contentMenu.style.pointerEvents = "all";
        this.contentMenu.style.opacity = "1";
      },
    });
  }

  closeMenu(resume = true) {
    if (resume) this.resumeExperience();
    this.contentMenu.style.pointerEvents = "none";
    this.contentMenu.style.opacity = "0";
    gsap.to(mainScene.customPass.uniforms.uProgress, {
      value: 1.3,
      duration: 1.5,
      onComplete: () => {
        mainScene.customPass.uniforms.uMenuSwitch.value = 0.0;
        mainScene.customPass.uniforms.uProgress.value = 0;
        this.chaptersBtn.style.pointerEvents = "all";
        this.chaptersBtn.style.opacity = "1";
      },
    });
  }

  clickChapter() {
    this.menuAnimation.pause(0);
    this.menuAnimation.play();
    this.closeMenu(false);
    if (this.music) this.musicVolumeTween.reverse();
  }

  pauseExperience() {
    console.log("Pause experience");
    this.cameraAnimation.pause();
    mouse.pause();
    if (this.music) this.musicVolumeTween.play();
    if (this.voiceOver.currentRecord) this.voiceOver.pause();
  }

  resumeExperience() {
    console.log("Resume experience");
    this.cameraAnimation.resume();
    mouse.resume();
    if (this.music) this.musicVolumeTween.reverse();
    if (this.voiceOver.currentRecord) this.voiceOver.resume();
  }
}
