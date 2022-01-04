import commonFragmentShader from "../../glsl/grass/commonFragment.glsl";
import commonVertexShader from "../../glsl/grass/commonVertex.glsl";
import outputFragmentShader from "../../glsl/grass/outputFragment.glsl";
import projectVertexShader from "../../glsl/grass/projectVertex.glsl";
import { guiFolders } from "../utils/Debug";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import { CustomMeshToonMaterial } from "./CustomMeshToonMaterial";
import * as THREE from "three";
import { Vector3 } from "three";

export class GrassInstancedMesh {
  constructor(pathLine) {
    this.pathLine = pathLine;

    this.grassUniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#84b15a") },
      uColor2: { value: new THREE.Color("#236760") },
      uDisplaceIntensity: { value: 0.2 },
      uSpeed: { value: 1.25 },
    };

    this.material = new CustomMeshToonMaterial(
      commonFragmentShader,
      outputFragmentShader,
      commonVertexShader,
      null,
      projectVertexShader,
      this.grassUniforms,
      {},
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

    const instanceNumber = 50000;
    const instance = new THREE.Object3D();

    this.geometry = new THREE.PlaneGeometry(0.01, 0.4, 1, 4);

    this.grassPattern = new THREE.InstancedMesh(
      this.geometry,
      this.material.meshToonMaterial,
      instanceNumber,
    );
    this.grassPattern.scale.set(3, 3, 3);

    for (let i = 0; i < instanceNumber; i++) {
      instance.position.set((Math.random() - 0.5) * 15, 0, (Math.random() - 0.5) * 9);

      instance.scale.setScalar(Math.random());

      instance.updateMatrix();
      this.grassPattern.setMatrixAt(i, instance.matrix);
    }

    this.group = new THREE.Group();
    this.group.position.y = -2.75;
    this.group.add(this.grassPattern);

    // for (let i = 0; i < this.parameters.grassQuantity; i++) {
    //   this.grass = this.grassPattern.clone();
    //   this.grass.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    //   setTimeout(() => {
    //     this.grass.matrixAutoUpdate = false;
    //   }, 1);

    //   this.grass.position.set(
    //     (Math.random() - 0.5) * 30,
    //     Math.random() / 2 - 3.2,
    //     (Math.random() - 0.5) * 30,
    //   );
    //   this.group.add(this.grass);
    // }

    raf.subscribe("Grass", this.update.bind(this));
  }

  update() {
    this.grassUniforms.uTime.value = raf.elapsedTime;
  }
}
