import beginVertexShader from "@glsl/wood/beginVertex.glsl";
import commonFragmentShader from "@glsl/wood/commonFragment.glsl";
import commonVertexShader from "@glsl/wood/commonVertex.glsl";
import outputFragmentShaderInner from "@glsl/wood/inner/outputFragment.glsl";
import outputFragmentShader from "@glsl/wood/outputFragment.glsl";
import { Color, CylinderGeometry, Group, MathUtils, Mesh, MeshToonMaterial } from "three";

export class WoodLogs extends Group {
  static logsGroup;
  constructor() {
    super();

    this.currentLogsGroups = [];

    if (!WoodLogs.logsGroup) {
      const barkUniforms = {
        uColor: { value: new Color("#180c04") },
        uColor2: { value: new Color("#f8c270") },
      };

      const logUniforms = {
        uColor: { value: new Color("#f8c270") },
        uColor2: { value: new Color("#180c04") },
      };

      const barkMaterial = new MeshToonMaterial();
      barkMaterial.onBeforeCompile = (shader) => {
        shader.uniforms = { ...shader.uniforms, ...barkUniforms };
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

      const logMaterial = new MeshToonMaterial();
      logMaterial.onBeforeCompile = (shader) => {
        shader.uniforms = { ...shader.uniforms, ...logUniforms };
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

      const barkGeometry = new CylinderGeometry(0.5, 0.5, 3, 32, 32, true);
      const logGeometry = new CylinderGeometry(0.5, 0.5, 3, 32, 32, false);

      const wood = new Mesh(barkGeometry, barkMaterial);
      wood.scale.set(0.5, 0.5, 0.5);

      const innerWood = new Mesh(logGeometry, logMaterial);
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

      const logsGroup = new Group();
      logsGroup.add(wood1, wood2, wood3);
      logsGroup.visible = false;

      WoodLogs.logsGroup = logsGroup;
    }

    this.fillCurrentLogsGroupArray(10);

    // for (let i = 0; i < positions.length; i++) {
    //   const newWoodGroup = woodGroup.clone();
    //   newWoodGroup.position.set(positions[i].x, -2.85, positions[i].y);
    //   newWoodGroup.rotation.set(Math.PI * 0.5, Math.PI, Math.random() * 3);
    //   const randomScale = MathUtils.randFloat(0.85, 1);
    //   newWoodGroup.scale.set(randomScale, randomScale, randomScale);

    //   // const randomScale = Math.random() * (1.25 - 0.85) + 0.85;
    //   // newWoodGroup.scale.set(randomScale, randomScale, randomScale);
    //   // newWoodGroup.scale.set(0.5, 0.5, 0.5);

    //   newWoodGroup.updateMatrix();
    //   this.add(newWoodGroup);
    // }
  }

  fillCurrentLogsGroupArray(maxLogsGroupNumber) {
    for (let i = 0; i < maxLogsGroupNumber; i++) {
      const newLogsGroup = WoodLogs.logsGroup.clone();
      this.currentLogsGroups.push(newLogsGroup);
      this.add(newLogsGroup);
    }
  }

  updateWoodLogsPositions(positions = []) {
    for (let i = 0; i < positions.length; i++) {
      const newLogsGroup = this.currentLogsGroups[i];
      if (!newLogsGroup.visible) newLogsGroup.visible = true;

      newLogsGroup.position.set(positions[i].x, -2.85, positions[i].y);
      newLogsGroup.rotation.set(Math.PI * 0.5, Math.PI, Math.random() * 3);
      const randomScale = MathUtils.randFloat(0.85, 1);
      newLogsGroup.scale.set(randomScale, randomScale, randomScale);
      newLogsGroup.updateMatrix();
    }
    if (positions.length < this.currentLogsGroups.length) {
      for (let i = positions.length; i < this.currentLogsGroups.length; i++)
        this.currentLogsGroups[i].visible = false;
    }
  }
}
