import { GrassInstancedMesh } from "./js/Three/Environment/Elements/GrassInstancedMesh";
import { Environment } from "./js/Three/Environment/Environment";
import { LoadingPage } from "./js/Three/Loading/LoadingPage";
import { mainScene } from "./js/Three/MainScene";
import { Leaves } from "./js/Three/Particles/Leaves/Leaves";
import { Subtitles } from "./js/Three/Text/Subtitles";
import { loadingManager } from "./js/utils/Loader";
import "./styles/style.scss";

let environment;

function init() {
  const loadingPage = new LoadingPage();

  mainScene.add(loadingPage.mesh);

  const leaves = new Leaves();
  mainScene.add(leaves.leaveMesh);

  const percent = document.querySelector(".percent");
  const buttonLoader = document.querySelector(".buttonLoader");
  const loadingImage = document.querySelector(".loadingImage");
  const audio = document.querySelector(".audio");

  buttonLoader.addEventListener("click", () => {
    buttonLoader.classList.remove("visible");
    buttonLoader.classList.add("hidden");
    percent.classList.add("hidden");
    loadingPage.update();
    audio.play();
    audio.loop = true;
    const subtitles = new Subtitles();
    // subtitles.createTimeline();
    environment.cameraAnimation.goToCheckpoint();

    setTimeout(() => {
      subtitles.createTimeline();
    }, 2500);
  });

  loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    const percentCalcul = (itemsLoaded / itemsTotal) * 100;
    const percentCalculRounded = Math.floor(percentCalcul);

    percent.textContent = percentCalculRounded + "%";
  };

  loadingManager.onLoad = () => {
    buttonLoader.classList.add("visible");

    environment = new Environment();
    // mainScene.add(environment.grounds, environment.forestPathLine, environment.sky);
    // mainScene.add(environment.grounds, environment.sky);
    mainScene.add(environment.grounds);

    const grassInstancedMesh = new GrassInstancedMesh(environment.forestPathLine);
    mainScene.add(grassInstancedMesh.group);

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
