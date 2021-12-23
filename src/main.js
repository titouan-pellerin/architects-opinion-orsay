import { CameraPath } from "./js/Three/CameraPath";
import { Environnement } from "./js/Three/Environnement";
import { GrassInstancedMesh } from "./js/Three/GrassInstancedMesh";
import { mainScene } from "./js/Three/MainScene";
import { Leaves } from "./js/Three/Particles/Leaves/Leaves";
import { Ribbon } from "./js/Three/Ribbon";
import { RockInstancedMesh } from "./js/Three/RockInstancedMesh";
import "./styles/style.scss";

function init() {
  const environnement = new Environnement();
  mainScene.add(environnement.ground, environnement.mask, environnement.sky);
  // mainScene.add(environnement.ground, environnement.sky);
  // mainScene.add(environnement.mask, environnement.sky);
  // mainScene.add(environnement.sky);

  const grassInstancedMesh = new GrassInstancedMesh();
  mainScene.add(grassInstancedMesh.group);

  const rockInstancedMesh = new RockInstancedMesh();
  mainScene.add(rockInstancedMesh.group);

  const path = new CameraPath();
  mainScene.add(path.splineObject);

  // const ribbon = new Ribbon();
  // mainScene.add(ribbon.mesh);

  const leaves = new Leaves();
  mainScene.add(leaves.leaveMesh);
}

document.addEventListener("DOMContentLoaded", init);
