import fragmentShader from "../../glsl/TotoCube/fragment.glsl";
import vertexShader from "../../glsl/TotoCube/vertex.glsl";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import * as THREE from "three";

export class TotoCube extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1, 16, 16);
    const texture = textureLoader.load("/assets/thoma.jpg");
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uTexture1: { value: texture },
      },
    });
    super(geometry, material);
    raf.subscribe("totoCube", this.update.bind(this));
  }

  update() {
    this.material.uniforms.uTime.value = raf.elapsedTime;
  }
}
