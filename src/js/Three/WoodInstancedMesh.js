import commonFragmentShader from "../../glsl/grass/commonFragment.glsl";
import commonVertexShader from "../../glsl/grass/commonVertex.glsl";
import beginVertexShader from "../../glsl/wood/beginVertex.glsl";
import outputFragmentShaderInner from "../../glsl/wood/inner/outputFragment.glsl";
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

    this.woodInnerUniforms = {
      uColor: { value: new THREE.Color("#f8c270") },
      uColor2: { value: new THREE.Color("#979797") },
    };

    this.material = new THREE.MeshToonMaterial();
    this.material.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...this.woodUniforms };
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        commonFragmentShader,
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        outputFragmentShader,
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        commonVertexShader,
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        beginVertexShader,
      );
    };

    // this.innerMaterial = new CustomMeshToonMaterial(
    //   commonFragmentShader,
    //   outputFragmentShaderInner,
    //   commonVertexShader,
    //   beginVertexShader,
    //   null,
    //   this.woodInnerUniforms,
    // );
    this.innerMaterial = new THREE.MeshToonMaterial();
    this.innerMaterial.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...this.woodInnerUniforms };
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        commonFragmentShader,
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        outputFragmentShaderInner,
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        commonVertexShader,
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        beginVertexShader,
      );
    };
    // console.log(outputFragmentShaderInner);

    const folder = guiFolders.get("scene").addFolder("wood");
    folder.addColor(this.woodUniforms.uColor, "value").name("Color");
    folder.addColor(this.woodUniforms.uColor2, "value").name("Color2");
    folder.addColor(this.woodInnerUniforms.uColor, "value").name("InnerColor");
    folder.addColor(this.woodInnerUniforms.uColor2, "value").name("InnerColor2");

    this.geometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32, 32, true);
    this.innerGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32, 32, false);

    this.group = new THREE.Group();
    this.group.position.y = -3;

    for (let i = 0; i < this.parameters.woodQuantity; i++) {
      this.wood = new THREE.Mesh(this.geometry, this.material);
      this.wood.scale.set(0.5, 0.5, 0.5);

      this.innerWood = new THREE.Mesh(this.innerGeometry, this.innerMaterial);
      this.innerWood.scale.set(0.49, 0.5, 0.49);

      this.woodGroup = new THREE.Group();
      this.woodGroup.add(this.wood, this.innerWood);
      this.woodGroup.position.set(
        (Math.random() - 0.5) * 30,
        Math.random() - 0.5,
        (Math.random() - 0.5) * 30,
      );
      this.woodGroup.rotation.set(Math.PI * 0.5, Math.PI, Math.random() * 3);

      this.group.add(this.woodGroup);
    }
  }
}
