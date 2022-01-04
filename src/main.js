import { Environment } from "./js/Three/Environment/Environment";
import { GrassInstancedMesh } from "./js/Three/GrassInstancedMesh";
import { mainScene } from "./js/Three/MainScene";
import { Leaves } from "./js/Three/Particles/Leaves/Leaves";
import { RockInstancedMesh } from "./js/Three/RockInstancedMesh";
import { WoodInstancedMesh } from "./js/Three/WoodInstancedMesh";
import { Oeuvres } from "./js/Three/Oeuvres";
import { gltfLoader, loadingManager } from "./js/utils/Loader";
import { texturesMap } from "./js/utils/assets";
import "./styles/style.scss";
import { Group } from "three";

function init() {
  loadingManager.onLoad = () => {
    const environment = new Environment();
    mainScene.add(environment.grounds, environment.forestPathLine);

    const grassInstancedMesh = new GrassInstancedMesh(environment.forestPathLine);
    mainScene.add(grassInstancedMesh.group);

    const rockInstancedMesh = new RockInstancedMesh(environment.forestPathLine);
    mainScene.add(rockInstancedMesh.group);

    const woodInstancedMesh = new WoodInstancedMesh();
    mainScene.add(woodInstancedMesh.group);

    const oeuvres = new Oeuvres();
    mainScene.add(oeuvres.group);

    // const treeInstancedMesh = new TreeInstancedMesh();
    // mainScene.add(treeInstancedMesh);

    // const ribbon = new Ribbon();
    // mainScene.add(ribbon.mesh);

    const leaves = new Leaves();
    mainScene.add(leaves.leaveMesh);
  };
}

document.addEventListener("DOMContentLoaded", init);

const parameters = {
  treeQuantity: 20,
};

// gltfLoader.load("/assets/models/tree_orsay1.glb", (gltf) => {
//   const tree = gltf.scene;
//   tree.scale.set(0.05,0.05,0.05)
//   const treeGroup = new Group();
//   treeGroup.position.y = -3.5;

//   tree.traverse( function ( node ) {

//       if ( node.isMesh ) node.castShadow = true;

//   } );

//   tree.traverse( function ( child ) {

//       if ( child.isMesh ) {

//           // child.material.envMap = envMap; //reflection of the world

//       }

//   } );

//   setTimeout(() => {
//     tree.matrixAutoUpdate = false;
//   }, 1);

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

gltfLoader.load("/assets/models/tree_orsay4.glb", (gltf) => {
  const tree = gltf.scene;
  tree.scale.set(0.05,0.05,0.05)
  const treeGroup = new Group();
  treeGroup.position.y = -3.5;

  tree.traverse( function ( node ) {

      if ( node.isMesh ) node.castShadow = true;

      setTimeout(() => {
        tree.matrixAutoUpdate = false;
      }, 1);

  } );

  // tree.traverse( function ( child ) {

  //     if ( child.isMesh ) {

  //         // child.material.envMap = envMap; //reflection of the world

  //     }

  // } );



  for (let i = 0; i < parameters.treeQuantity; i++) {
    const treeMesh = tree.clone();
    treeMesh.castShadow = true;
    treeMesh.position.set(
      (Math.random() - 0.5) * 25,
      Math.random() - 0.5,
      (Math.random() - 0.5) * 25,
    );
    treeMesh.rotation.set(0, Math.random(), 0);

    treeGroup.add(treeMesh);
  }
  mainScene.add(treeGroup);
});
