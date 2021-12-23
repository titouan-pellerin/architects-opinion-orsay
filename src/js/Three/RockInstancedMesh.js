import commonFragmentShader from "../../glsl/grass/commonFragment.glsl";
import commonVertexShader from "../../glsl/grass/commonVertex.glsl";
import outputFragmentShader from "../../glsl/grass/outputFragment.glsl";
import projectVertexShader from "../../glsl/rock/projectVertex.glsl";
import { guiFolders } from "../utils/Debug";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import { CustomMeshToonMaterial } from "./CustomMeshToonMaterial";
import * as THREE from "three";

export class RockInstancedMesh {
  constructor() {
    this.parameters = {
      rockQuantity: 20,
    };

    this.rockUniforms = {
      uColor: { value: new THREE.Color("#949c90") },
      uColor2: { value: new THREE.Color("#236760") },
    };

    this.material = new CustomMeshToonMaterial(
      commonFragmentShader,
      outputFragmentShader,
      commonVertexShader,
      null,
      projectVertexShader,
      this.rockUniforms,
      {}
    );

    const folder = guiFolders.get("scene").addFolder("Rock");
    folder.addColor(this.rockUniforms.uColor, "value").name("Color");
    folder.addColor(this.rockUniforms.uColor2, "value").name("Color2");

    const instanceNumber = 5;
    const instance = new THREE.Object3D();

    this.geometry = new THREE.TetrahedronGeometry(1, 1);

    this.meshPattern = new THREE.InstancedMesh(
      this.geometry,
      this.material,
      instanceNumber
    );
    this.meshPattern.castShadow = true;

    for (let i = 0; i < instanceNumber; i++) {
      instance.position.set(Math.random() - 0.5, 0, Math.random() - 0.5);
      instance.scale.setScalar(Math.random());

      instance.updateMatrix();
      this.meshPattern.setMatrixAt(i, instance.matrix);
    }

    this.group = new THREE.Group();
    this.group.position.y = -3;

    for (let i = 0; i < this.parameters.rockQuantity; i++) {
      this.rock = this.meshPattern.clone();
      this.rock.position.set((Math.random() - 0.5) * 30, 0, (Math.random() - 0.5) * 30);
      this.rock.rotation.set(Math.random(), Math.random(), Math.random());
      this.rock.scale.set(0.5, Math.random() * 1.5, Math.random() * 1.5);
      this.group.add(this.rock);
    }
  }
}
