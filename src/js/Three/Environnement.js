import fragmentShader from "../../glsl/ground/fragment.glsl";
import vertexShader from "../../glsl/ground/vertex.glsl";
import { gui } from "../utils/Debug";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import { texturesMap } from "../utils/assets";
import * as THREE from "three";

export class Environnement {
  constructor() {
    const parameters = {
      groundScale: 4,
      color: new THREE.Color("#0ff5dd"),
      color2: new THREE.Color("#000000"),
      speed: 0.5,
      stroke: 5000,
      smallNoise: 500,
      bigNoise: 50,
    };

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: parameters.speed },
        uStroke: { value: parameters.stroke },
        uSmallNoise: { value: parameters.smallNoise },
        uBigNoise: { value: parameters.bigNoise },
        uColor: { value: parameters.color },
        uColor2: { value: parameters.color2 },
        // uTexture: { value: texturesMap.get("groundAo") },
      },
    });

    this.maskMat = new THREE.MeshBasicMaterial({
      color: parameters.color,
      side: THREE.DoubleSide,
    });

    this.skyGeometry = new THREE.SphereGeometry();
    this.groundGeometry = new THREE.PlaneGeometry(1, 1, 256, 256);

    this.ground = new THREE.Mesh(this.groundGeometry, this.material);
    this.ground.rotation.x = Math.PI * 0.5;
    this.ground.position.y = -3;
    this.ground.scale.set(100, 100, 100);

    this.mask = new THREE.Mesh(this.groundGeometry, this.maskMat);
    this.mask.rotation.x = Math.PI * 0.5;
    this.mask.position.y = -3.01;
    this.mask.scale.set(100, 100, 100);

    this.sky = new THREE.Mesh(this.skyGeometry, this.material);
    this.sky.scale.set(100, 100, 100);

    raf.subscribe("Ground", this.update.bind(this));

    const folder = gui.addFolder("Ground");
    folder.addColor(parameters, "color").onChange(() => {
      this.material.uniforms.uColor.set(parameters.color);
    });
    folder
      .add(this.material.uniforms.uStroke, "value")
      .min(0)
      .max(10000)
      .name("StrokeQuantity");
    folder
      .add(this.material.uniforms.uSmallNoise, "value")
      .min(250)
      .max(750)
      .name("SmallNoise");
    folder
      .add(this.material.uniforms.uBigNoise, "value")
      .min(0)
      .max(100)
      .name("BigNoise");
    folder.add(this.material.uniforms.uSpeed, "value").min(0).max(2).name("Speed");
  }

  update() {
    this.material.uniforms.uTime.value = raf.elapsedTime;
  }
}
