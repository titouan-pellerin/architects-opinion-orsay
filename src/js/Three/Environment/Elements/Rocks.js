import commonFragmentShader from "@glsl/rock/commonFragment.glsl";
import commonVertexShader from "@glsl/rock/commonVertex.glsl";
import outputFragmentShader from "@glsl/rock/outputFragment.glsl";
import projectVertexShader from "@glsl/rock/projectVertex.glsl";
import {
  Color,
  DoubleSide,
  Group,
  InstancedMesh,
  MeshToonMaterial,
  Object3D,
  TetrahedronGeometry,
} from "three";

export class Rocks extends Group {
  constructor(positions = []) {
    super();

    this.parameters = {
      rockQuantity: 20,
    };

    this.rockUniforms = {
      uColor: { value: new Color("#949c90") },
      uColor2: { value: new Color("#236760") },
    };

    this.material = new MeshToonMaterial({ side: DoubleSide });
    this.material.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...this.rockUniforms };
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
        "#include <project_vertex>",
        projectVertexShader
      );
    };

    const instanceNumber = 5;
    const instance = new Object3D();

    this.geometry = new TetrahedronGeometry(1, 1);

    this.rockPattern = new InstancedMesh(this.geometry, this.material, instanceNumber);
    this.rockPattern.matrixAutoUpdate = false;
    this.rockPattern.updateMatrix();

    this.position.y = -3;

    for (let i = 0; i < instanceNumber; i++) {
      instance.position.set(Math.random() - 0.5, 0, Math.random() - 0.5);
      instance.scale.setScalar(Math.random() * 2);

      instance.updateMatrix();
      this.rockPattern.setMatrixAt(i, instance.matrix);
    }
    this.rockPattern.position.set(positions[0].x, 0, positions[0].y);
    this.rockPattern.scale.set(0.5, 0.5, 0.5);

    this.rockPattern.updateMatrix();
    this.add(this.rockPattern);

    for (let i = 1; i < positions.length; i++) {
      const newRock = this.rockPattern.clone();
      newRock.position.set(positions[i].x, 0, positions[i].y);
      newRock.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);

      const randomScale = Math.random() * (0.5 - 0.1) + 0.1;
      newRock.scale.set(randomScale, randomScale, randomScale);

      newRock.updateMatrix();
      this.add(newRock);
    }
  }
}
