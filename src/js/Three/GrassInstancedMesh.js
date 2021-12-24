import commonFragmentShader from "../../glsl/grass/commonFragment.glsl";
import commonVertexShader from "../../glsl/grass/commonVertex.glsl";
import outputFragmentShader from "../../glsl/grass/outputFragment.glsl";
import projectVertexShader from "../../glsl/grass/projectVertex.glsl";
import { guiFolders } from "../utils/Debug";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import { CustomMeshToonMaterial } from "./CustomMeshToonMaterial";
import * as THREE from "three";

export class GrassInstancedMesh {
  constructor() {
    this.parameters = {
      grassQuantity: 150,
    };

    this.grassUniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#84b15a") },
      uColor2: { value: new THREE.Color("#236760") },
      uDisplaceIntensity: { value: 0.135 },
      uSpeed: { value: 1 },
    };

    this.material = new CustomMeshToonMaterial(
      commonFragmentShader,
      outputFragmentShader,
      commonVertexShader,
      null,
      projectVertexShader,
      this.grassUniforms,
      {}
    );

    const sceneFolder = guiFolders.get("scene");
    const folder = sceneFolder.addFolder("Grass");
    folder.addColor(this.grassUniforms.uColor, "value").name("Color");
    folder.addColor(this.grassUniforms.uColor2, "value").name("Color2");
    folder
      .add(this.grassUniforms.uDisplaceIntensity, "value")
      .min(0)
      .max(1)
      .name("DisplaceIntensity");
    folder.add(this.grassUniforms.uSpeed, "value").min(0).max(2).name("Speed");

    const instanceNumber = 500;
    const instance = new THREE.Object3D();

    this.geometry = new THREE.PlaneGeometry(0.01, 0.4, 1, 4);
    // this.geometry = new THREE.PlaneGeometry(0.01, 0.4, 1, 64);

    this.grassPattern = new THREE.InstancedMesh(
      this.geometry,
      this.material,
      instanceNumber
    );
    this.grassPattern.scale.set(3, 3, 3);
    this.grassPattern.castShadow = true;
    this.grassPattern.frustumCulled = false;

    for (let i = 0; i < instanceNumber; i++) {
      instance.position.set(Math.random() - 0.5, 0, Math.random() - 0.5);

      instance.scale.setScalar(Math.random());

      instance.updateMatrix();
      this.grassPattern.setMatrixAt(i, instance.matrix);
    }

    this.group = new THREE.Group();

    for (let i = 0; i < this.parameters.grassQuantity; i++) {
      this.grass = this.grassPattern.clone();

      setTimeout(() => {
        this.grass.matrixAutoUpdate = false
      }, 1);

      this.grass.position.set(
        (Math.random() - 0.5) * 30,
        Math.random() / 2 - 3.2,
        (Math.random() - 0.5) * 30
      );
      this.group.add(this.grass);
    }

    raf.subscribe("Grass", this.update.bind(this));
  }

  update() {
    this.grassUniforms.uTime.value = raf.elapsedTime;
  }
}
