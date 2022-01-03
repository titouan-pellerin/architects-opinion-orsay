import { Environment } from "./js/Three/Environment/Environment";
import { GrassInstancedMesh } from "./js/Three/GrassInstancedMesh";
import { mainScene } from "./js/Three/MainScene";
import { Leaves } from "./js/Three/Particles/Leaves/Leaves";
import { RockInstancedMesh } from "./js/Three/RockInstancedMesh";
import { WoodInstancedMesh } from "./js/Three/WoodInstancedMesh";
import { gltfLoader, loadingManager } from "./js/utils/Loader";
import { texturesMap } from "./js/utils/assets";
import "./styles/style.scss";
import { Group } from "three";

function init() {
  loadingManager.onLoad = () => {
    const environment = new Environment();
    mainScene.add(environment.grounds, environment.forestPathLine, environment.sky);

    const grassInstancedMesh = new GrassInstancedMesh(environment.forestPathLine);
    mainScene.add(grassInstancedMesh.group);

    const rockInstancedMesh = new RockInstancedMesh(environment.forestPathLine);
    mainScene.add(rockInstancedMesh.group);

    const woodInstancedMesh = new WoodInstancedMesh();
    mainScene.add(woodInstancedMesh.group);

    // const treeInstancedMesh = new TreeInstancedMesh();
    // mainScene.add(treeInstancedMesh);

    // const ribbon = new Ribbon();
    // mainScene.add(ribbon.mesh);

    const leaves = new Leaves();
    mainScene.add(leaves.leaveMesh);
  };
}

document.addEventListener("DOMContentLoaded", init);

// const parameters = {
// treeQuantity: 20,
// };
// gltfLoader.load("/assets/models/tree.glb", (gltf) => {
//   const tree = gltf.scene;
//   tree.castShadow = true;
//   const treeGroup = new Group();
//   treeGroup.position.y = -3;

//   for (let i = 0; i < parameters.treeQuantity; i++) {
//     const treeMesh = tree.clone();
//     treeMesh.position.set(
//       (Math.random() - 0.5) * 25,
//       Math.random() - 0.5,
//       (Math.random() - 0.5) * 25,
//     );
//     treeMesh.rotation.set(0, Math.random(), 0);

//     treeGroup.add(treeMesh);
//   }
//   mainScene.add(treeGroup);
// });
