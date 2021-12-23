import beginFragmentShader from "../../glsl/grass/beginFragment.glsl";
import beginVertexShader from "../../glsl/grass/beginVertex.glsl";
import voidFragmentShader from "../../glsl/grass/voidFragment.glsl";
import voidVertexShader from "../../glsl/grass/voidVertex.glsl";
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
      uDisplaceIntensity: { value: 0.125 },
      uSpeed: { value: 1 },
    };

    this.material = new CustomMeshToonMaterial(
      beginFragmentShader,
      voidFragmentShader,
      beginVertexShader,
      voidVertexShader,
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

    this.geometry = new THREE.PlaneGeometry(0.01, 0.5, 1, 4);

    this.grassPattern = new THREE.InstancedMesh(
      this.geometry,
      this.material,
      instanceNumber
    );
    this.grassPattern.scale.set(3, 3, 3);
    this.grassPattern.castShadow = true;

    for (let i = 0; i < instanceNumber; i++) {
      instance.position.set(Math.random() - 0.5, 0, Math.random() - 0.5);

      instance.scale.setScalar(Math.random());

      instance.updateMatrix();
      this.grassPattern.setMatrixAt(i, instance.matrix);
    }

    this.group = new THREE.Group();
    // this.group.position.y = -3;

    for (let i = 0; i < this.parameters.grassQuantity; i++) {
      this.grass = this.grassPattern.clone();
      this.grass.position.set(
        (Math.random() - 0.5) * 30,
        Math.random() - 3.75,
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
