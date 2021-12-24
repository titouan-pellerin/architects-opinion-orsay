import { CameraPath } from "./js/Three/CameraPath";
import { Environnement } from "./js/Three/Environnement";
import { GrassInstancedMesh } from "./js/Three/GrassInstancedMesh";
import { mainScene } from "./js/Three/MainScene";
import { Leaves } from "./js/Three/Particles/Leaves/Leaves";
import { ForestPathGeometry } from "./js/Three/Path/ForestPathGeometry";
import { Ribbon } from "./js/Three/Ribbon";
import { RockInstancedMesh } from "./js/Three/RockInstancedMesh";
import { TreeInstancedMesh } from "./js/Three/TreeInstancedMesh";
import "./styles/style.scss";
import { MeshBasicMaterial } from "three";
import { Mesh } from "three";
import { ShaderMaterial } from "three";

function init() {
  const environnement = new Environnement();
  mainScene.add(environnement.ground, environnement.mask, environnement.sky);
  // mainScene.add(environnement.ground, environnement.mask);
  // mainScene.add(environnement.mask, environnement.sky);
  // mainScene.add(environnement.sky);

  const grassInstancedMesh = new GrassInstancedMesh();
  mainScene.add(grassInstancedMesh.group);

  const rockInstancedMesh = new RockInstancedMesh();
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

  const path = new CameraPath();
  mainScene.add(path.splineObject);

  // const ribbon = new Ribbon();
  // mainScene.add(ribbon.mesh);

  const leaves = new Leaves();
  mainScene.add(leaves.leaveMesh);

  const forestPathGeometry = new ForestPathGeometry();

  const forestPathMesh = new Mesh(
    forestPathGeometry,
    new MeshBasicMaterial({ color: 0xff0000 })
  );
  mainScene.add(forestPathMesh);
}

document.addEventListener("DOMContentLoaded", init);
