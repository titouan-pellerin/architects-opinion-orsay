import { Environment } from "./js/Three/Environment/Environment";
import { GrassInstancedMesh } from "./js/Three/GrassInstancedMesh";
import { LoadingPage } from "./js/Three/Loading/LoadingPage";
import { mainScene } from "./js/Three/MainScene";
import { Leaves } from "./js/Three/Particles/Leaves/Leaves";
import { RockInstancedMesh } from "./js/Three/RockInstancedMesh";
import { Subtitles } from "./js/Three/Text/Subtitles";
import { WoodInstancedMesh } from "./js/Three/WoodInstancedMesh";
import { loadingManager } from "./js/utils/Loader";
import { texturesMap } from "./js/utils/assets";
import "./styles/style.scss";
import gsap from "gsap";

function init() {
  const loadingPage = new LoadingPage();
  mainScene.add(loadingPage.mesh);

  const percent = document.querySelector(".percent");
  const buttonLoader = document.querySelector(".buttonLoader");
  const loadingImage = document.querySelector(".loadingImage");
  const words = document.querySelectorAll(".words");
  const audio = document.querySelector(".audio");

  buttonLoader.addEventListener("click", () => {
    buttonLoader.classList.add("hidden");
    // loadingImage.classList.add("hidden");
    percent.classList.add("hidden");

    loadingPage.update();
    audio.play();
    const subtitles = new Subtitles();
    for (let i = 0; i < words.length; i++) {
      words[i].classList.add("visible");
    }
    subtitles.createTimeline();
  });

  loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    const percentCalcul = (itemsLoaded / itemsTotal) * 100;

    //      gsap.fromTo('loadingImage', 5,
    //     { y: 300, rotation: 25 },
    //     { y: 80, rotation: 0, ease: Power3.easeOut }
    // );

    percent.innerHTML = "Loading..." + percentCalcul + "%";

    // const environment = new Environment();
    // mainScene.add(environment.grounds, environment.forestPathLine, environment.sky);

    // const grassInstancedMesh = new GrassInstancedMesh(environment.forestPathLine);
    // mainScene.add(grassInstancedMesh.group);

    // const rockInstancedMesh = new RockInstancedMesh(environment.forestPathLine);
    // mainScene.add(rockInstancedMesh.group);

    // const woodInstancedMesh = new WoodInstancedMesh();
    // mainScene.add(woodInstancedMesh.group);

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
