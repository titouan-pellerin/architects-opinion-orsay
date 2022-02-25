import { Environment } from "./js/Three/Environment/Environment";
import { mainScene } from "./js/Three/MainScene";
import { loadingManager } from "./js/utils/Loader";
import "./styles/style.scss";

function init() {
  loadingManager.onLoad = () => {
    const environment = new Environment();
    mainScene.add(environment.grounds);
    console.log("Loaded");
  };
}

document.addEventListener("DOMContentLoaded", init);
