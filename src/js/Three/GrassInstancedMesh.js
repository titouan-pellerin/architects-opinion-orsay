import beginFragmentShader from "../../glsl/grass/beginFragment.glsl";
import beginVertexShader from "../../glsl/grass/beginVertex.glsl";
import voidFragmentShader from "../../glsl/grass/voidFragment.glsl";
import voidVertexShader from "../../glsl/grass/voidVertex.glsl";
import { guiFolders } from "../utils/Debug";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import * as THREE from "three";

export class GrassInstancedMesh {
  constructor() {
    this.parameters = {
      uTime: { value: 0 },
      color: new THREE.Color("#84b15a"),
      color2: new THREE.Color("#236760"),
      displaceIntensity: 0.135,
      grassQuantity: 150,
      speed: 1,
    };

    this.material = new THREE.MeshToonMaterial({
      transparent: true,
    });

    this.material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = this.parameters.uTime;
      shader.uniforms.uColor = { value: this.parameters.color };
      shader.uniforms.uColor2 = { value: this.parameters.color2 };
      shader.uniforms.uSpeed = { value: this.parameters.speed };
      shader.uniforms.uDisplaceIntensity = {
        value: this.parameters.displaceIntensity,
      };

      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        beginVertexShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <project_vertex>",
        voidVertexShader
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        beginFragmentShader
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        voidFragmentShader
      );

      const sceneFolder = guiFolders.get("scene");
      const folder = sceneFolder.addFolder("Grass");
      folder
        .addColor(this.parameters, "color")
        .onChange(() => {
          this.material.uniforms.uColor.set(this.parameters.color);
        })
        .name("Color");
      folder
        .addColor(this.parameters, "color2")
        .onChange(() => {
          this.material.uniforms.uColor2.set(this.parameters.color2);
        })
        .name("Color2");
      folder
        .add(shader.uniforms.uDisplaceIntensity, "value")
        .min(0)
        .max(1)
        .name("DisplaceIntensity");
      folder.add(shader.uniforms.uSpeed, "value").min(0).max(2).name("Speed");
    };

    const instanceNumber = 500;
    const instance = new THREE.Object3D();

    this.geometry = new THREE.PlaneGeometry(0.01, 0.4, 1, 64);

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

    for (let i = 0; i < this.parameters.grassQuantity; i++) {
      this.grass = this.grassPattern.clone();
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
    this.parameters.uTime.value = raf.elapsedTime;
  }
}
