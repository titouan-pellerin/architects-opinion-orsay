import { modelsMap } from "../../../utils/assets";
import { Group } from "three";

export class Trees extends Group {
  constructor(positions = []) {
    super();

    this.woodUniforms = {
      uColor: { value: new Color("#180c04") },
      uColor2: { value: new Color("#f8c270") },
    };

    this.material = new MeshToonMaterial();
    this.material.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...this.woodUniforms };
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
    
    const tree1 = modelsMap.get("trees")[0];
    const tree2 = modelsMap.get("trees")[1];
    tree1.scale.set(0.1, 0.1, 0.1);
    tree2.scale.set(0.1, 0.1, 0.1);

    tree1.matrixAutoUpdate = false;
    tree2.matrixAutoUpdate = false;

    tree1.position.set(positions[0].x, -3.5, positions[0].y);
    tree2.position.set(positions[1].x, -3.5, positions[1].y);
    tree1.updateMatrix();
    tree2.updateMatrix();
    this.add(tree1, tree2);

    for (let i = 2; i < positions.length; i++) {
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
