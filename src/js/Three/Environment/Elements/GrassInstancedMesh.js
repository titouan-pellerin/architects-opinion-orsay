import { guiFolders } from "../../../utils/Debug";
import raf from "../../../utils/Raf";
import { texturesMap } from "../../../utils/assets";
import { CustomMeshToonMaterial } from "../../CustomMeshToonMaterial";
import commonFragmentShader from "@glsl/grass/commonFragment.glsl";
import commonVertexShader from "@glsl/grass/commonVertex.glsl";
import outputFragmentShader from "@glsl/grass/outputFragment.glsl";
import projectVertexShader from "@glsl/grass/projectVertex.glsl";
import * as THREE from "three";
import { DoubleSide, Vector2, Vector3 } from "three";

export class GrassInstancedMesh {
  constructor(pathLine) {
    this.pathLine = pathLine;

    this.grassUniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#84b15a") },
      uColor2: { value: new THREE.Color("#236760") },
      uDisplaceIntensity: { value: 0.25 },
      uSpeed: { value: 1.2 },
    };

    this.material = new CustomMeshToonMaterial(
      commonFragmentShader,
      outputFragmentShader,
      commonVertexShader,
      null,
      projectVertexShader,
      this.grassUniforms,
      {
        side: DoubleSide,
      }
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

    const instanceNumber = 300000;
    // const instanceNumber = 30;
    const instance = new THREE.Object3D();

    this.geometry = new THREE.PlaneGeometry(0.01, 0.4, 1, 4);

    this.grassPattern = new THREE.InstancedMesh(
      this.geometry,
      this.material.meshToonMaterial,
      instanceNumber
    );
    // this.grassPattern.scale.set(3, 3, 3);

    for (let i = 0; i < instanceNumber; i++) {
      const randomScale = Math.random() * 3;
      const instanceScale = new Vector3(randomScale, randomScale, randomScale);
      const instancePos = new Vector3();

      // do {
      instancePos.x = (Math.random() - 0.5) * 95;
      instancePos.y = 0;
      // instancePos.z = (Math.random() - 0.5) * 100;
      instancePos.z =
        Math.random() * (-100 * texturesMap.get("curveTextures").length + 50);

      if (pathLine.isPositionInRange(new Vector2(instancePos.x, instancePos.z))) {
        instanceScale.y = Math.random() * 0.8;
        instancePos.y = Math.random() * -0.5;
        // instanceScale.y = 0;
      }

      instance.position.set(instancePos.x, instancePos.y, instancePos.z);

      instance.scale.set(instanceScale.x, instanceScale.y, instanceScale.z);

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
