import fragmentShader from "../../glsl/grass/fragment.glsl";
import vertexShader from "../../glsl/grass/vertex.glsl";
import { gui } from "../utils/Debug";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import * as THREE from "three";

export class GrassInstancedMesh {
  constructor() {
    const parameters = {
      color: new THREE.Color("#84b15a"),
      color2: new THREE.Color("#236760"),
      displaceIntensity: 0.125,
      grassQuantity: 100,
      speed: 1,
    };

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: parameters.speed },
        uColor: { value: parameters.color },
        uColor2: { value: parameters.color2 },
        uDisplaceIntensity: { value: parameters.displaceIntensity },
      },
      transparent: true,
    });

    const instanceNumber = 500;
    const instance = new THREE.Object3D();

    this.geometry = new THREE.PlaneGeometry(0.01, 0.5, 1, 64);

    this.grassPattern = new THREE.InstancedMesh(
      this.geometry,
      this.material,
      instanceNumber,
    );
    this.grassPattern.scale.set(3, 3, 3);

    for (let i = 0; i < instanceNumber; i++) {
      instance.position.set(Math.random() - 0.5, 0, Math.random() - 0.5);

      instance.scale.setScalar(Math.random());

      instance.updateMatrix();
      this.grassPattern.setMatrixAt(i, instance.matrix);
    }

    this.group = new THREE.Group();
    this.group.position.y = -3;

    for (let i = 0; i < parameters.grassQuantity; i++) {
      this.grass = this.grassPattern.clone();
      this.grass.position.set((Math.random() - 0.5) * 30, 0, (Math.random() - 0.5) * 30);
      this.group.add(this.grass);
    }

    raf.subscribe("Grass", this.update.bind(this));

    const folder = gui.addFolder("Grass");
    folder.addColor(parameters, "color").onChange(() => {
      this.material.uniforms.uColor.set(parameters.color);
    });
    folder.addColor(parameters, "color2").onChange(() => {
      this.material.uniforms.uColor2.set(parameters.color2);
    });
    folder
      .add(this.material.uniforms.uDisplaceIntensity, "value")
      .min(0)
      .max(1)
      .name("DisplaceIntensity");
    folder.add(this.material.uniforms.uSpeed, "value").min(0).max(2).name("Speed");
  }

  update() {
    this.material.uniforms.uTime.value = raf.elapsedTime;
  }
}
