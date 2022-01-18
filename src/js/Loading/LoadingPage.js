import { mainScene } from "../MainScene";
import { gsap } from "gsap";
import * as THREE from "three";

export class LoadingPage {
  constructor() {
    this.percent = document.querySelector(".percent");
    this.buttonLoader = document.querySelector(".buttonLoader");
    this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uAlpha: { value: 1 },
      },
      vertexShader: `
          void main()
          {
              gl_Position = vec4(position, 1.0);
          }
      `,
      fragmentShader: `
      uniform float uAlpha;

      void main()
      {
          gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
      }
  `,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.frustumCulled = false;
  }

  update() {
    gsap.to(this.material.uniforms.uAlpha, {
      duration: 3,
      value: 0,
      delay: 1,
      onComplete: () => {
        mainScene.remove(this.mesh);
      },
    });
  }
}
