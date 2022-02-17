import beginVertexShader from "@glsl/wood/beginVertex.glsl";
import commonFragmentShader from "@glsl/wood/commonFragment.glsl";
import commonVertexShader from "@glsl/wood/commonVertex.glsl";
import outputFragmentShaderInner from "@glsl/wood/inner/outputFragment.glsl";
import outputFragmentShader from "@glsl/wood/outputFragment.glsl";
import { Color, CylinderGeometry, Group, MathUtils, Mesh, MeshToonMaterial } from "three";

export class WoodLogs extends Group {
  constructor(positions = []) {
    super();

    this.woodUniforms = {
      uColor: { value: new Color("#180c04") },
      uColor2: { value: new Color("#f8c270") },
    };

    this.woodInnerUniforms = {
      uColor: { value: new Color("#f8c270") },
      uColor2: { value: new Color("#180c04") },
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

    this.innerMaterial = new MeshToonMaterial();
    this.innerMaterial.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...this.woodInnerUniforms };
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        commonFragmentShader
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        outputFragmentShaderInner
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

    this.geometry = new CylinderGeometry(0.5, 0.5, 3, 32, 32, true);
    this.innerGeometry = new CylinderGeometry(0.5, 0.5, 3, 32, 32, false);

    this.position.y = -2.85;

    const wood = new Mesh(this.geometry, this.material);
    wood.scale.set(0.5, 0.5, 0.5);

    const innerWood = new Mesh(this.innerGeometry, this.innerMaterial);
    innerWood.scale.set(0.49, 0.5, 0.49);

    const wood1 = new Group();
    wood1.add(wood, innerWood);
    const wood2 = wood1.clone();
    wood2.position.x = 0.4;
    const wood3 = wood1.clone();
    wood3.position.x = -0.4;
    wood1.position.z = 0.25;

    wood1.matrixAutoUpdate = false;
    wood2.matrixAutoUpdate = false;
    wood3.matrixAutoUpdate = false;
    wood1.updateMatrix();
    wood2.updateMatrix();
    wood3.updateMatrix();

    const woodGroup = new Group();
    const randomScale = MathUtils.randFloat(0.85, 1);
    woodGroup.scale.set(randomScale, randomScale, randomScale);

    woodGroup.add(wood1, wood2, wood3);
    woodGroup.position.set(positions[0].x, 0, positions[0].y);
    woodGroup.rotation.set(Math.PI * 0.5, Math.PI, Math.random() * 3);

    this.add(woodGroup);

    for (let i = 1; i < positions.length; i++) {
      const newWoodGroup = woodGroup.clone();
      newWoodGroup.position.set(positions[i].x, 0, positions[i].y);
      newWoodGroup.rotation.set(Math.PI * 0.5, Math.PI, Math.random() * 3);

      // const randomScale = Math.random() * (1.25 - 0.85) + 0.85;
      // newWoodGroup.scale.set(randomScale, randomScale, randomScale);
      // newWoodGroup.scale.set(0.5, 0.5, 0.5);

      newWoodGroup.updateMatrix();
      this.add(newWoodGroup);
    }
  }
}
