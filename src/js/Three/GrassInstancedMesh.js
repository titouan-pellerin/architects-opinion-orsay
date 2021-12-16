import fragmentShader from "../../glsl/GrassInstancedMesh/fragment.glsl";
import vertexShader from "../../glsl/GrassInstancedMesh/vertex.glsl";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import * as THREE from "three";

export class GrassInstancedMesh {
  constructor() {
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
      side: THREE.DoubleSide,
    });

    const instanceNumber = 50000;
    const dummy = new THREE.Object3D();

    this.geometry = new THREE.PlaneGeometry(0.01, 1, 1, 128);

    this.instancedMesh = new THREE.InstancedMesh(
      this.geometry,
      this.material,
      instanceNumber,
    );
    this.instancedMesh.rotation.y = Math.PI * 0.5;

    // Position and scale the grass blade instances randomly.
    for (let i = 0; i < instanceNumber; i++) {
      dummy.position.set((Math.random() - 0.5) * 20, 0, (Math.random() - 0.5) * 20);

      dummy.scale.setScalar(0.5 + Math.random() * 0.5);

      dummy.rotation.y = Math.random() * Math.PI;

      dummy.updateMatrix();
      this.instancedMesh.setMatrixAt(i, dummy.matrix);
    }

    // const this.instancedMesh2 = this.instancedMesh.clone();
    // this.instancedMesh2.position.y = 1;

    raf.subscribe("totoCube", this.update.bind(this));
  }

  update() {
    this.material.uniforms.uTime.value = raf.elapsedTime;
  }
}
