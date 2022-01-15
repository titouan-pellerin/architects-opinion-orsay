import beginVertexShader from "@glsl/tree/beginVertex.glsl";
import commonFragmentShader from "@glsl/tree/commonFragment.glsl";
import commonVertexShader from "@glsl/tree/commonVertex.glsl";
import beginVertexShaderLeaf from "@glsl/tree/leaf/beginVertex.glsl";
import commonFragmentShaderLeaf from "@glsl/tree/leaf/commonFragment.glsl";
import commonVertexShaderLeaf from "@glsl/tree/leaf/commonVertex.glsl";
import outputFragmentShaderLeaf from "@glsl/tree/leaf/outputFragment.glsl";
import outputFragmentShader from "@glsl/tree/outputFragment.glsl";
import { guiFolders } from "@js/utils/Debug";
import { Color, Group, MeshToonMaterial } from "three";
import { modelsMap } from "../../../utils/assets";

export class Trees extends Group {
  constructor(positions = []) {
    super();

    this.treeUniforms = {
      uColor: { value: new Color("#180c04") },
      uColor2: { value: new Color("#f8c270") },
    };

    this.leafUniforms = {
      uColor: { value: new Color("#d1e997") },
      uColor2: { value: new Color("#4a9e36") },
    };

    const sceneFolder = guiFolders.get("scene");
    const treeFolder = sceneFolder.addFolder("Trees");

    treeFolder.addColor(this.leafUniforms.uColor, "value").name("Color1");
    treeFolder.addColor(this.leafUniforms.uColor2, "value").name("Color2");

    this.material = new MeshToonMaterial();
    this.material.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...this.treeUniforms };
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        commonFragmentShader
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        outputFragmentShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        commonVertexShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        beginVertexShader
      );
    };

    this.materialLeaf = new MeshToonMaterial();
    this.materialLeaf.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...this.leafUniforms };
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        commonFragmentShaderLeaf
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        outputFragmentShaderLeaf
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        commonVertexShaderLeaf
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        beginVertexShaderLeaf
      );
    };

    const tree1 = modelsMap.get("trees")[0];
    const tree2 = modelsMap.get("trees")[1];
    tree1.scale.set(0.1, 0.1, 0.1);
    tree2.scale.set(0.1, 0.1, 0.1);

    tree1.children[0].material = this.material;
    tree1.children[1].material = this.materialLeaf;
    tree2.children[0].material = this.material;
    tree2.children[1].material = this.materialLeaf;

    tree1.matrixAutoUpdate = false;
    tree2.matrixAutoUpdate = false;

    for (let i = 0; i < positions.length; i++) {
      const newTree = i % 2 === 0 ? tree1.clone() : tree2.clone();

      newTree.position.set(positions[i].x, -4, positions[i].y);
      newTree.rotation.set(
        (Math.random() - 0.5) * 0.2 * Math.PI,
        Math.random() * Math.PI,
        (Math.random() - 0.5) * 0.2 * Math.PI
      );
      const randomScale = Math.random() * (0.1 - 0.03) + 0.03;
      newTree.scale.set(randomScale, randomScale, randomScale);
      newTree.updateMatrix();
      this.add(newTree);
    }
  }
}
