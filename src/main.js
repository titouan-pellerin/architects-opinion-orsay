import { GrassInstancedMesh } from "./js/Three/GrassInstancedMesh";
import { Ground } from "./js/Three/Ground";
import { MainScene } from "./js/Three/MainScene";
import "./styles/style.scss";

let mainScene, canvas;

function init() {
  canvas = document.querySelector(".webgl");
  mainScene = new MainScene(canvas);

  const grassInstancedMesh = new GrassInstancedMesh();
  mainScene.add(
    grassInstancedMesh.grassGroup,
  );

  const ground = new Ground();
  mainScene.add(ground.plane, ground.mask);
}

document.addEventListener("DOMContentLoaded", init);
