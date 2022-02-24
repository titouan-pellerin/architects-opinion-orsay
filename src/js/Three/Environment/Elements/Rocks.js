import commonFragmentShader from "@glsl/rock/commonFragment.glsl";
import commonVertexShader from "@glsl/rock/commonVertex.glsl";
import outputFragmentShader from "@glsl/rock/outputFragment.glsl";
import projectVertexShader from "@glsl/rock/projectVertex.glsl";
import { customFogUniforms } from "@js/utils/misc";
import {
  Color,
  DoubleSide,
  Group,
  InstancedMesh,
  MathUtils,
  MeshToonMaterial,
  Object3D,
  TetrahedronGeometry,
} from "three";
import { guiFolders } from "../../../utils/Debug";

export class Rocks extends Group {
  static rock;
  constructor() {
    super();

    if (!Rocks.rock) {
      this.parameters = {
        rockQuantity: 20,
      };

      const rockUniforms = {
        uColor: { value: new Color("#949c90") },
        uColor2: { value: new Color("#236760") },
      };

      const rockMaterial = new MeshToonMaterial({ side: DoubleSide });
      rockMaterial.onBeforeCompile = (shader) => {
        shader.uniforms = { ...shader.uniforms, ...rockUniforms, ...customFogUniforms };
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

      const rockGeometry = new TetrahedronGeometry(1, 1);

      const rockInstancedMesh = new InstancedMesh(
        rockGeometry,
        rockMaterial,
        instanceNumber
      );
      rockInstancedMesh.matrixAutoUpdate = false;
      rockInstancedMesh.updateMatrix();

      for (let i = 0; i < instanceNumber; i++) {
        instance.position.set(Math.random() - 0.5, 0, Math.random() - 0.5);
        instance.scale.setScalar(Math.random() * 2);

        instance.updateMatrix();
        rockInstancedMesh.setMatrixAt(i, instance.matrix);
      }
      rockInstancedMesh.visible = true;
      Rocks.rock = rockInstancedMesh;

      /**
       * DEBUG
       */
      const rocksFolder = guiFolders.get("scene").addFolder("Rock");
      rocksFolder.addColor(rockUniforms.uColor, "value").name("Color");
      rocksFolder.addColor(rockUniforms.uColor2, "value").name("Color2");
    }
  }

  setRocks(positions = []) {
    for (let i = 0; i < positions.length; i++) {
      const newRock = Rocks.rock.clone();
      newRock.position.set(positions[i].x, -3, positions[i].y);
      newRock.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);

      const randomScale = MathUtils.randFloat(0.2, 0.3);
      newRock.scale.set(randomScale, randomScale, randomScale);

      newRock.updateMatrix();

      this.add(newRock);
    }
  }
}
