import { Cubes } from "./js/Three/Environment/Elements/Cubes";
import { Environment } from "./js/Three/Environment/Environment";
import { GrassInstancedMesh } from "./js/Three/GrassInstancedMesh";
import { mainScene } from "./js/Three/MainScene";
import { Leaves } from "./js/Three/Particles/Leaves/Leaves";
import { Ribbon } from "./js/Three/Ribbon";
import { RockInstancedMesh } from "./js/Three/RockInstancedMesh";
import { WoodInstancedMesh } from "./js/Three/WoodInstancedMesh";
import { loadingManager } from "./js/utils/Loader";
import { texturesMap } from "./js/utils/assets";
import { positions } from "./js/utils/positions";
import "./styles/style.scss";
import { BoxHelper } from "three";
import { Mesh } from "three";
import { BoxGeometry } from "three";
import { MeshBasicMaterial } from "three";

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

    // const parameters = {
    //   treeQuantity: 20,
    // };

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
