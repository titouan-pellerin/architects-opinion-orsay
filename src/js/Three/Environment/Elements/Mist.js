import * as THREE from "three";
import vertex from "@glsl/mist/vertex.glsl";
import fragment from "@glsl/mist/fragment.glsl";

export class Mist {
  constructor() {
    this.initMist();
  }

  initMist() {
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,

      //   blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true,
    });
    let geometry;
    const particles = 100;
    const radius = 5;

    geometry = new THREE.BufferGeometry();

    const positions = [];
    const colors = [];
    const sizes = [];

    const color = new THREE.Color();

    for (let i = 0; i < particles; i++) {
      positions.push((Math.random() * 2 - 1) * radius);
      positions.push((Math.random() * 2 - 1) * radius);
      positions.push((Math.random() * 2 - 1) * radius);

      color.setHSL(i / particles, 1.0, 0.5);

      colors.push(color.r, color.g, color.b);

      sizes.push(1);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute(
      "size",
      new THREE.Float32BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage)
    );

    this.particleSystem = new THREE.Points(geometry, material);
  }
}
