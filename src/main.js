import gsap from "gsap";
import { Environment } from "./js/Three/Environment/Environment";
import { mainScene } from "./js/Three/MainScene";
import { loadingManager } from "./js/utils/Loader";
import "./styles/style.scss";

function init() {
  loadingManager.onLoad = () => {
    console.time("init");
    const environment = new Environment();
    mainScene.add(environment.grounds);
    console.timeEnd("init");
    console.log("Loaded");
    gsap.to(".loader-animation_wrapper", {
      duration: 1,
      delay: 2,
      opacity: 0,
    });
  };
}

document.addEventListener("DOMContentLoaded", init);
