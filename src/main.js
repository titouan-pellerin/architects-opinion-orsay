/* eslint-disable no-undef */
import { getGPUTier } from "detect-gpu";
import gsap from "gsap";
import { Audio, AudioListener } from "three";
import { Environment } from "./js/Three/Environment/Environment";
import { MainScene } from "./js/Three/MainScene";
import { soundsMap } from "./js/utils/assets";
import { loadingManager } from "./js/utils/Loader";
import { Mouse } from "./js/utils/Mouse";
import "./styles/style.scss";

const discorverBtn = document.querySelector(".loader-cta");
const discoverTl = gsap.timeline({ paused: true });
gsap.registerPlugin(CustomEase);
gsap.ticker.lagSmoothing(1000, 16);
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
  music = new Audio(audioListener);
  music.setLoop(true);
  music.setBuffer(soundsMap.get("music"));
  music.setVolume(0);
  music.play();
  const musicVolume = { level: 0 };
  gsap.to(musicVolume, {
    duration: 2,
    level: 0.08,
    onUpdate: () => {
      music.setVolume(musicVolume.level);
    },
  });
}

function init() {
  gsap.to(".loader-animation_wrapper", {
    opacity: 1,
    duration: 0.5,
  });
  loadingManager.onProgress = (_url, loaded, total) => {
    const percentLoaded = (loaded / total) * 100;
    gsap.to(".loader-animation_wrapper .logo", {
      clipPath: `inset(${100 - percentLoaded}% ${0}% ${0}% ${0}%)`,
      duration: 0,
    });
  };
  loadingManager.onLoad = () => {
    // Init timeline
    discoverTl
      .to(
        ".loader-animation_wrapper",
        {
          duration: 1,
          opacity: 0,
        },
        0
      )
      .to(
        ".loader-title_wrapper",
        {
          duration: 1,
          opacity: 1,
        },
        0
      )
      .to(
        ".loader-credits-wrapper",
        {
          duration: 1,
          opacity: 1,
        },
        0
      )
      .to(discorverBtn, {
        duration: 1,
        opacity: 1,
        onComplete: () => {
          discorverBtn.style.pointerEvents = "all";
          discorverBtn.addEventListener("click", startClick);
          discoverTl.pause();
        },
      })
      .to(discorverBtn, {
        duration: 1,
        opacity: 0,
      })
      .to([".loader-credits-wrapper", ".loader-title_wrapper"], {
        duration: 1,
        opacity: 0,
      })
      .to(".loader-decoration", {
        duration: 1,
        opacity: 1,
      })
      .to(".loader-text", {
        duration: 3,
        opacity: 1,
        delay: -0.5,
        onComplete: () => {
          environment = new Environment(audioListener, music);
          environment.startExperience();
          mainScene.add(environment.grounds);
        },
      })
      .to(".loader-text", {
        delay: 6,
        duration: 1.5,
        opacity: 0,
      })
      .to(".loader-decoration", {
        duration: 1,
        opacity: 0,
        delay: -1,
      })
      .to(".canvas-container", {
        duration: 1,
        opacity: 0.3,
      })
      .to(".content-interface_titles .title-wrapper", {
        duration: 1,
        opacity: 1,
        delay: -1,
      })

      .to(".content-interface_titles .title-wrapper", {
        duration: 1,
        opacity: 0,
        delay: 1.25,
        onComplete: () => {
          gsap.to([".btn-chapters_container", ".btn-sound_container"], {
            opacity: 1,
            duration: 0.5,
            pointerEvents: "all",
            delay: 3.5,
          });
        },
      })
      .add(gsap.delayedCall(-1, () => environment.goToCheckpoint(), []))
      .play();
  };
}

document.addEventListener("DOMContentLoaded", init);
