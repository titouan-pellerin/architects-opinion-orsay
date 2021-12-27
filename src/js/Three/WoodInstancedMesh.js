import commonFragmentShader from "../../glsl/grass/commonFragment.glsl";
import commonVertexShader from "../../glsl/grass/commonVertex.glsl";
import beginVertexShader from "../../glsl/wood/beginVertex.glsl";
import outputFragmentShader from "../../glsl/wood/outputFragment.glsl";
import { guiFolders } from "../utils/Debug";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import { CustomMeshToonMaterial } from "./CustomMeshToonMaterial";
import * as THREE from "three";
import { DoubleSide } from "three";
import { MeshStandardMaterial } from "three";

export class WoodInstancedMesh {
  constructor() {
    this.parameters = {
      woodQuantity: 20,
    };

    this.woodUniforms = {
      uColor: { value: new THREE.Color("#604d49") },
      uColor2: { value: new THREE.Color("#979797") },
    };

    this.material = new CustomMeshToonMaterial(
      commonFragmentShader,
      outputFragmentShader,
      commonVertexShader,
      beginVertexShader,
      null,
      this.woodUniforms,
    );
    this.material.side = THREE.DoubleSide;

    const folder = guiFolders.get("scene").addFolder("wood");
    folder.addColor(this.woodUniforms.uColor, "value").name("Color");
    folder.addColor(this.woodUniforms.uColor2, "value").name("Color2");

    this.geometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32, 32, true);

    this.group = new THREE.Group();
    this.group.position.y = -3;

    for (let i = 0; i < this.parameters.woodQuantity; i++) {
      this.wood = new THREE.Mesh(this.geometry, this.material);
      this.wood.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 30,
      );
      this.wood.rotation.set(Math.PI * 0.5, 0, Math.random() * 3);

      this.group.add(this.wood);
    }
  }
}
