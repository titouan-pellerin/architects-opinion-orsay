import beginFragmentShader from "../../glsl/grass/beginFragment.glsl";
import beginVertexShader from "../../glsl/grass/beginVertex.glsl";
import voidFragmentShader from "../../glsl/grass/voidFragment.glsl";
import voidVertexShader from "../../glsl/rock/voidVertex.glsl";
import { guiFolders } from "../utils/Debug";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import * as THREE from "three";

export class RockInstancedMesh {
  constructor() {
    this.parameters = {
      color: new THREE.Color("#949c90"),
      color2: new THREE.Color("#236760"),
      rockQuantity: 20,
    };

    this.material = new THREE.MeshToonMaterial();

    this.material.onBeforeCompile = (shader) => {
      shader.uniforms.uColor = { value: this.parameters.color };
      shader.uniforms.uColor2 = { value: this.parameters.color2 };

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

      const folder = guiFolders.get("scene").addFolder("Rock");
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
    };

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
      this.rock.position.set(
        (Math.random() - 0.5) * 30,
        0,
        (Math.random() - 0.5) * 30
      );
      this.rock.rotation.set(Math.random(), Math.random(), Math.random());
      this.rock.scale.set(0.5, Math.random() * 1.5, Math.random() * 1.5);
      this.group.add(this.rock);
    }
  }
}
