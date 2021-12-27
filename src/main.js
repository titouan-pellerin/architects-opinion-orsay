import { Environnement } from "./js/Three/Environment/Environnement";
import { GrassInstancedMesh } from "./js/Three/GrassInstancedMesh";
import { mainScene } from "./js/Three/MainScene";
import { Leaves } from "./js/Three/Particles/Leaves/Leaves";
import { RockInstancedMesh } from "./js/Three/RockInstancedMesh";
import "./styles/style.scss";

function init() {
  const environnement = new Environnement();
  mainScene.add(environnement.ground, environnement.forestPathLine, environnement.sky);

  const grassInstancedMesh = new GrassInstancedMesh(environnement.forestPathLine);
  mainScene.add(grassInstancedMesh.group);

  const rockInstancedMesh = new RockInstancedMesh(environnement.forestPathLine);
  mainScene.add(rockInstancedMesh.group);

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
}

document.addEventListener("DOMContentLoaded", init);
