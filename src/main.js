import { GrassInstancedMesh } from "./js/Three/GrassInstancedMesh";
import { MainScene } from "./js/Three/MainScene";
import "./styles/style.scss";

let mainScene, canvas;

function init() {
  canvas = document.querySelector(".webgl");
  mainScene = new MainScene(canvas);

  const grassInstancedMesh = new GrassInstancedMesh();
  mainScene.add(grassInstancedMesh.instancedMesh);
}

document.addEventListener("DOMContentLoaded", init);
