import { GrassInstancedMesh } from "./js/Three/Environment/Elements/GrassInstancedMesh";
import { Environment } from "./js/Three/Environment/Environment";
import { LoadingPage } from "./js/Three/Loading/LoadingPage";
import { mainScene } from "./js/Three/MainScene";
import { Oeuvres } from "./js/Three/Oeuvres";
import { Leaves } from "./js/Three/Particles/Leaves/Leaves";
import { Subtitles } from "./js/Three/Text/Subtitles";
import { loadingManager } from "./js/utils/Loader";
import "./styles/style.scss";

function init() {
  // const loadingPage = new LoadingPage();
  // mainScene.add(loadingPage.mesh);

  const percent = document.querySelector(".percent");
  const buttonLoader = document.querySelector(".buttonLoader");
  const loadingImage = document.querySelector(".loadingImage");
  const words = document.querySelectorAll(".words");
  const audio = document.querySelector(".audio");

  // buttonLoader.addEventListener("click", () => {
  //   buttonLoader.classList.add("hidden");
  //   // loadingImage.classList.add("hidden");
  //   percent.classList.add("hidden");

  //   loadingPage.update();
  //   audio.play();
  //   // const subtitles = new Subtitles();
  //   // for (let i = 0; i < words.length; i++) {
  //   //   words[i].classList.add("visible");
  //   // }
  //   // subtitles.createTimeline();
  // });

  // loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  //   const percentCalcul = (itemsLoaded / itemsTotal) * 100;

  //   //      gsap.fromTo('loadingImage', 5,
  //   //     { y: 300, rotation: 25 },
  //   //     { y: 80, rotation: 0, ease: Power3.easeOut }
  //   // );

  //   percent.innerHTML = "Loading..." + percentCalcul + "%";
  // };

  loadingManager.onLoad = () => {
    // buttonLoader.classList.add("visible");

    const environment = new Environment();
    // mainScene.add(environment.grounds, environment.forestPathLine, environment.sky);
    // mainScene.add(environment.grounds, environment.sky);
    mainScene.add(environment.grounds);

    const grassInstancedMesh = new GrassInstancedMesh(environment.forestPathLine);
    mainScene.add(grassInstancedMesh.group);

    // const rockInstancedMesh = new RockInstancedMesh(environment.forestPathLine);
    // mainScene.add(rockInstancedMesh.group);

    // const woodInstancedMesh = new WoodInstancedMesh();
    // mainScene.add(woodInstancedMesh.group);

    const oeuvres = new Oeuvres();
    mainScene.add(oeuvres.oeuvre, oeuvres.oeuvre2);

    // const treeInstancedMesh = new TreeInstancedMesh();
    // mainScene.add(treeInstancedMesh);

    // const ribbon = new Ribbon();
    // mainScene.add(ribbon.mesh);

    // const box1 = new Mesh(
    //   new BoxGeometry(1, 1, 1),
    //   new MeshBasicMaterial({ color: 0xffff00 })
    // );
    // box1.position.set(
    //   positions.get("checkpoints")[0].x * 100,
    //   1,
    //   positions.get("checkpoints")[0].y * 100
    // );
    // mainScene.add(box1);

    const leaves = new Leaves();
    mainScene.add(leaves.leaveMesh);
  };
}

document.addEventListener("DOMContentLoaded", init);

const parameters = {
  treeQuantity: 20,
};

// gltfLoader.load("/assets/models/tree_orsay5.glb", (gltf) => {
//   const tree = gltf.scene;
//   tree.scale.set(0.05, 0.05, 0.05);
//   const treeGroup = new Group();
//   treeGroup.position.y = -3.5;

//   tree.traverse(function (node) {
//     if (node.isMesh) node.castShadow = true;
//   });

//   setTimeout(() => {
//     tree.matrixAutoUpdate = false;
//   }, 1);

// tree.traverse( function ( child ) {

//     if ( child.isMesh ) {

//         // child.material.envMap = envMap; //reflection of the world

//     }

// } );

//   for (let i = 0; i < parameters.treeQuantity; i++) {
//     const treeMesh = tree.clone();
//     treeMesh.castShadow = true;
//     treeMesh.position.set(
//       (Math.random() - 0.5) * 25,
//       Math.random() - 0.5,
//       (Math.random() - 0.5) * 25
//     );
//     treeMesh.rotation.set(0, Math.random(), 0);

//     treeGroup.add(treeMesh);
//   }
//   // mainScene.add(treeGroup);
// });

// gltfLoader.load("/assets/models/tree_orsay6.glb", (gltf) => {
//   const tree = gltf.scene;
//   tree.scale.set(0.05, 0.05, 0.05);
//   const treeGroup = new Group();
//   treeGroup.position.y = -3.5;

//   tree.traverse(function (node) {
//     if (node.isMesh) node.castShadow = true;
//   });

//   setTimeout(() => {
//     tree.matrixAutoUpdate = false;
//   }, 1);

// tree.traverse( function ( child ) {

//   //     if ( child.isMesh ) {

//   //         // child.material.envMap = envMap; //reflection of the world

//   //     }

//   // } );

//   for (let i = 0; i < parameters.treeQuantity; i++) {
//     const treeMesh = tree.clone();
//     treeMesh.castShadow = true;
//     treeMesh.position.set(
//       (Math.random() - 0.5) * 25,
//       Math.random() - 0.5,
//       (Math.random() - 0.5) * 25
//     );
//     treeMesh.rotation.set(0, Math.random(), 0);

//     treeGroup.add(treeMesh);
//   }
//   // mainScene.add(treeGroup);
// });
