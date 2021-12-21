import { CameraPath } from "./js/Three/CameraPath";
import { Environnement } from "./js/Three/Environnement";
import { GrassInstancedMesh } from "./js/Three/GrassInstancedMesh";
import { mainScene } from "./js/Three/MainScene";
import { Ribbon } from "./js/Three/Ribbon";
import { RockInstancedMesh } from "./js/Three/RockInstancedMesh";
import "./styles/style.scss";

function init() {
  const environnement = new Environnement();
  mainScene.add(environnement.mask, environnement.sky);

  //environnement.ground

  const grassInstancedMesh = new GrassInstancedMesh();
  mainScene.add(grassInstancedMesh.group);

  const rockInstancedMesh = new RockInstancedMesh();
  mainScene.add(rockInstancedMesh.group);

  const path = new CameraPath();
  mainScene.add(path.splineObject);

  // const ribbon = new Ribbon();
  // mainScene.add(ribbon.mesh);
}

document.addEventListener("DOMContentLoaded", init);
