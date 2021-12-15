import { MainScene } from "./js/Three/MainScene";
import { TotoCube } from "./js/Three/TotoCube";
import "./styles/style.scss";

let mainScene, canvas;

function init() {
  canvas = document.querySelector(".webgl");
  mainScene = new MainScene(canvas);

  const totoCube = new TotoCube();
  mainScene.add(totoCube);
  console.log(mainScene);
  console.log("Hello");
}

document.addEventListener("DOMContentLoaded", init);
