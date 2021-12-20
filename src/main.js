import { CameraPath } from "./js/Three/CameraPath";
import { Environnement } from "./js/Three/Environnement";
import { GrassInstancedMesh } from "./js/Three/GrassInstancedMesh";
import { mainScene } from "./js/Three/MainScene";
import { RockInstancedMesh } from "./js/Three/RockInstancedMesh";
import "./styles/style.scss";

function init() {
  const environnement = new Environnement();
  mainScene.add(environnement.ground, environnement.mask, environnement.sky);

  const grassInstancedMesh = new GrassInstancedMesh();
  mainScene.add(grassInstancedMesh.group);

  const rockInstancedMesh = new RockInstancedMesh();
  mainScene.add(rockInstancedMesh.group);

  const path = new CameraPath();
  mainScene.add(path.splineObject);
}

document.addEventListener("DOMContentLoaded", init);
