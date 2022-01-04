import { Environment } from "./js/Three/Environment/Environment";
import { GrassInstancedMesh } from "./js/Three/GrassInstancedMesh";
import { LoadingPage } from "./js/Three/Loading/LoadingPage";
import { mainScene } from "./js/Three/MainScene";
import { Leaves } from "./js/Three/Particles/Leaves/Leaves";
import { RockInstancedMesh } from "./js/Three/RockInstancedMesh";
import { Text3D } from "./js/Three/Text/Text3D";
import { WoodInstancedMesh } from "./js/Three/WoodInstancedMesh";
import { loadingManager } from "./js/utils/Loader";
import { texturesMap } from "./js/utils/assets";
import "./styles/style.scss";

function init() {
  const loadingPage = new LoadingPage();
  mainScene.add(loadingPage.mesh);

  const percent = document.querySelector(".percent");
  const buttonLoader = document.querySelector(".buttonLoader");
  const words = document.querySelectorAll(".words");

  buttonLoader.addEventListener("click", () => {
    buttonLoader.classList.add("hidden");
    percent.classList.add("hidden");

    loadingPage.update();

    const text3D = new Text3D();

    for (let i = 0; i < words.length; i++) {
      words[i].classList.add("visible");
    }

    text3D.createTimeline();
  });

  loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    const percentCalcul = (itemsLoaded / itemsTotal) * 100;

    percent.innerHTML = percentCalcul + "%";

    const environment = new Environment();
    mainScene.add(environment.grounds, environment.forestPathLine, environment.sky);

    const grassInstancedMesh = new GrassInstancedMesh(environment.forestPathLine);
    mainScene.add(grassInstancedMesh.group);

    const rockInstancedMesh = new RockInstancedMesh(environment.forestPathLine);
    mainScene.add(rockInstancedMesh.group);

    const woodInstancedMesh = new WoodInstancedMesh();
    mainScene.add(woodInstancedMesh.group);

    const parameters = {
      treeQuantity: 20,
    };

    // const treeInstancedMesh = new TreeInstancedMesh();
    // mainScene.add(treeInstancedMesh)

    // const gltfLoader = new GLTFLoader()
    // gltfLoader.load(
    //     '/assets/models/tree.glb',
    //     (gltf) =>
    //     {
    //       const tree = gltf.scene
    //       tree.castShadow = true;
    //       const treeGroup = new THREE.Group()
    //       treeGroup.position.y = -3

    //       for (let i = 0; i < parameters.treeQuantity; i++) {
    //         let treeMesh = tree.clone()
    //         treeMesh.position.set((Math.random()- 0.5) * 25, (Math.random()- 0.5), (Math.random()- 0.5) * 25)
    //         treeMesh.rotation.set(0, Math.random(), 0)

    //         treeGroup.add(treeMesh)
    //       }
    //       mainScene.add(treeGroup)
    //     },
    // )

    // const ribbon = new Ribbon();
    // mainScene.add(ribbon.mesh);

    const leaves = new Leaves();
    mainScene.add(leaves.leaveMesh);
  };

  loadingManager.onLoad = () => {
    buttonLoader.classList.add("visible");
  };
}

document.addEventListener("DOMContentLoaded", init);
