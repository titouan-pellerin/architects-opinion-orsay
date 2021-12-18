import { Environnement } from "./js/Three/Environnement";
import { GrassInstancedMesh } from "./js/Three/GrassInstancedMesh";
import { MainScene } from "./js/Three/MainScene";
import { RockInstancedMesh } from "./js/Three/RockInstancedMesh";
import "./styles/style.scss";

let mainScene, canvas;

function init() {
  canvas = document.querySelector(".webgl");
  mainScene = new MainScene(canvas);

  const grassInstancedMesh = new GrassInstancedMesh();
  mainScene.add(grassInstancedMesh.group);

  const rockInstancedMesh = new RockInstancedMesh();
  mainScene.add(rockInstancedMesh.group);

  const environnement = new Environnement();
  mainScene.add(environnement.ground, environnement.mask, environnement.sky);
}

document.addEventListener("DOMContentLoaded", init);
