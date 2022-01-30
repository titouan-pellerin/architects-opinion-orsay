import { Environment } from "./js/Three/Environment/Environment";
import { mainScene } from "./js/Three/MainScene";
import { loadingManager } from "./js/utils/Loader";
import "./styles/style.scss";
function init() {
  // const loadingPage = new LoadingPage();

  // mainScene.add(loadingPage.mesh);

  // const percent = document.querySelector(".percent");
  // const buttonLoader = document.querySelector(".buttonLoader");
  // const loadingImage = document.querySelector(".loadingImage");
  // const audio = document.querySelector(".audio");

  // buttonLoader.addEventListener("click", () => {
  //   // percent.classList.add("hidden");
  //   // loadingPage.update();
  //   gsap.to(buttonLoader, { duration: 0.75, opacity: 0, pointerEvents: "none" });
  //   gsap.to(".webgl", { duration: 5, opacity: 1 });
  //   audio.play();
  //   audio.loop = true;
  //   const subtitles = new Subtitles();
  //   // subtitles.createTimeline();
  //   environment.cameraAnimation.goToCheckpoint();

  //   setTimeout(() => {
  //     subtitles.createTimeline();
  //   }, 2500);
  // });

  // loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  //   const percentCalcul = (itemsLoaded / itemsTotal) * 100;
  //   const percentCalculRounded = Math.floor(percentCalcul);

  //   percent.textContent = percentCalculRounded + "%";
  // };

  loadingManager.onLoad = () => {
    const environment = new Environment();
    mainScene.add(environment.grounds);

    // const oeuvres = new Oeuvres();
    // mainScene.add(
    //   oeuvres.oeuvre,
    //   oeuvres.oeuvre2,
    //   oeuvres.oeuvre3,
    //   oeuvres.oeuvre4,
    //   oeuvres.oeuvre5,
    //   oeuvres.oeuvre6
    // );
    // mainScene.add(box1);
  };
}

document.addEventListener("DOMContentLoaded", init);
