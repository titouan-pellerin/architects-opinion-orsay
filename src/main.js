import { getGPUTier } from "detect-gpu";
import gsap from "gsap";
import { AudioListener, PositionalAudio } from "three";
import { Environment } from "./js/Three/Environment/Environment";
import { MainScene } from "./js/Three/MainScene";
import { soundsMap } from "./js/utils/assets";
import { loadingManager } from "./js/utils/Loader";
import { Mouse } from "./js/utils/Mouse";
import "./styles/style.scss";

const discorverBtn = document.querySelector(".loader-cta");
const discoverTl = gsap.timeline({ paused: true });

let mainScene, mouse, environment, audioListener, music;

async function initScene() {
  const gpuTier = await getGPUTier();
  mainScene = new MainScene(gpuTier);
  mouse = new Mouse();
}
initScene();

export { mainScene, mouse };

function startClick() {
  discorverBtn.style.pointerEvents = "none";
  discoverTl.resume();
  audioListener = new AudioListener();
  mainScene.camera.add(audioListener);
  music = new PositionalAudio(audioListener);
  music.setLoop(true);
  music.setRefDistance(60);
  music.setRolloffFactor(0);
  music.setBuffer(soundsMap.get("music"));
  music.setVolume(0);
  music.play();
  const musicVolume = { level: 0 };
  gsap.to(musicVolume, {
    duration: 2,
    level: 0.12,
    onUpdate: () => {
      music.setVolume(musicVolume.level);
    },
  });
}

function init() {
  loadingManager.onProgress = (_url, loaded, total) => {
    const percentLoaded = (loaded / total) * 100;
    // console.log(Math.round(percentLoaded));
  };
  loadingManager.onLoad = () => {
    // Init timeline
    discoverTl
      .to(".loader-animation_wrapper", {
        duration: 1,
        opacity: 0,
        onComplete: () => {
          discorverBtn.style.pointerEvents = "all";
        },
      })
      .to(discorverBtn, {
        duration: 1,
        opacity: 1,
        onComplete: () => {
          discorverBtn.addEventListener("click", startClick);
          discoverTl.pause();
        },
      })
      .to(discorverBtn, {
        duration: 1,
        opacity: 0,
      })
      .to([".loader-credits-wrapper", ".loader-title_wrapper"], {
        opacity: 0,
        duration: 1,
        delay: -1,
      })
      .to(".loader-text", {
        duration: 3,
        opacity: 1,
        onComplete: () => {
          console.time("init");
          environment = new Environment(audioListener, music);
          environment.startExperience();
          mainScene.add(environment.grounds);
          console.timeEnd("init");
        },
      })
      .to(".loader-text", {
        delay: 6,
        duration: 2,
        opacity: 0,
      })
      .to(".content-interface_titles .title-wrapper", {
        duration: 2,
        opacity: 1,
      })
      .to(".canvas-container", {
        duration: 2,
        opacity: 0.3,
        delay: -2,
      })
      .to([".btn-chapters_container", ".btn-sound_container"], {
        opacity: 1,
        duration: 2,
        pointerEvents: "all",
      })
      .to(".content-interface_titles .title-wrapper", {
        duration: 2,
        opacity: 0,
        onComplete: () => {
          environment.goToCheckpoint();
        },
      })
      .play();

    // discoverTl
    //   .to(".loader-animation_wrapper", {
    //     duration: 0,
    //     opacity: 0,
    //     onComplete: () => {
    //       discorverBtn.style.pointerEvents = "all";
    //     },
    //   })
    //   .to(discorverBtn, {
    //     duration: 0,
    //     opacity: 1,
    //     onComplete: () => {
    //       discorverBtn.addEventListener("click", startClick);
    //       discoverTl.pause();
    //     },
    //   })
    //   .to(discorverBtn, {
    //     duration: 0,
    //     opacity: 0,
    //   })
    //   .to([".loader-credits-wrapper", ".loader-title_wrapper"], {
    //     opacity: 0,
    //     duration: 0,
    //     delay: 0,
    //   })
    //   .to(".loader-text", {
    //     duration: 1,
    //     opacity: 1,
    //     onComplete: () => {
    //       console.time("init");
    //       environment = new Environment(audioListener, music);
    //       environment.startExperience();
    //       mainScene.add(environment.grounds);
    //       console.timeEnd("init");
    //     },
    //   })
    //   .to(".loader-text", {
    //     delay: 0,
    //     duration: 0,
    //     opacity: 0,
    //   })
    //   .to(".content-interface_titles .title-wrapper", {
    //     duration: 0,
    //     opacity: 1,
    //   })
    //   .to(".canvas-container", {
    //     duration: 0,
    //     opacity: 1,
    //     delay: 0,
    //   })
    //   .to([".btn-chapters_container", ".btn-sound_container"], {
    //     opacity: 1,
    //     duration: 0,
    //     pointerEvents: "all",
    //   })
    //   .to(".content-interface_titles .title-wrapper", {
    //     duration: 0,
    //     opacity: 0,
    //     onComplete: () => {
    //       environment.goToCheckpoint();
    //     },
    //   })
    //   .play();
  };
}

document.addEventListener("DOMContentLoaded", init);
