import gsap from "gsap";
import { Environment } from "./js/Three/Environment/Environment";
import { mainScene } from "./js/Three/MainScene";
import { loadingManager } from "./js/utils/Loader";
import "./styles/style.scss";

let discorverBtn;

function init() {
  discorverBtn = document.querySelector(".loader-cta");
  loadingManager.onLoad = () => {
    console.time("init");
    const environment = new Environment();
    mainScene.add(environment.grounds);
    console.timeEnd("init");
    gsap.to(".loader-animation_wrapper", {
      duration: 1,
      delay: 2,
      opacity: 0,
      onComplete: () => {
        gsap.to(discorverBtn, {
          duration: 1,
          opacity: 1,
          onComplete: () => {
            discorverBtn.addEventListener("click", () => environment.startExperience());
            discorverBtn.style.pointerEvents = "all";
          },
        });
      },
    });
  };
}

document.addEventListener("DOMContentLoaded", init);
