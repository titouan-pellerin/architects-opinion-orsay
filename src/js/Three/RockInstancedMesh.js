import fragmentShader from "../../glsl/grass/fragment.glsl";
import vertexShader from "../../glsl/ground/vertex.glsl";
import { gui } from "../utils/Debug";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import * as THREE from "three";

export class RockInstancedMesh {
  constructor() {
    const parameters = {
      color: new THREE.Color("#949c90"),
      color2: new THREE.Color("#236760"),
      rockQuantity: 20,
    };

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: parameters.speed },
        uColor: { value: parameters.color },
        uColor2: { value: parameters.color2 },
      },
      transparent: true,
    });

    const instanceNumber = 5;
    const instance = new THREE.Object3D();

    this.geometry = new THREE.TetrahedronGeometry(1, 1);

    this.meshPattern = new THREE.InstancedMesh(
      this.geometry,
      this.material,
      instanceNumber,
    );

    for (let i = 0; i < instanceNumber; i++) {
      instance.position.set(Math.random() - 0.5, 0, Math.random() - 0.5);

      instance.updateMatrix();
      this.meshPattern.setMatrixAt(i, instance.matrix);
    }

    this.group = new THREE.Group();
    this.group.position.y = -3;

    for (let i = 0; i < parameters.rockQuantity; i++) {
      this.rock = this.meshPattern.clone();
      this.rock.position.set((Math.random() - 0.5) * 30, 0, (Math.random() - 0.5) * 30);
      this.rock.rotation.set(Math.random(), Math.random(), Math.random());
      this.rock.scale.set(0.5, Math.random() * 1.5, Math.random() * 1.5);
      this.group.add(this.rock);
    }

    raf.subscribe("Rock", this.update.bind(this));

    const folder = gui.addFolder("Rock");
    folder.addColor(parameters, "color").onChange(() => {
      this.material.uniforms.uColor.set(parameters.color);
    });
    folder.addColor(parameters, "color2").onChange(() => {
      this.material.uniforms.uColor2.set(parameters.color2);
    });
  }

  update() {
    this.material.uniforms.uTime.value = raf.elapsedTime;
  }
}
