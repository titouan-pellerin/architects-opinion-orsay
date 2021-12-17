import fragmentShader from "../../glsl/grass/fragment.glsl";
import vertexShader from "../../glsl/grass/vertex.glsl";
import { gui } from "../utils/Debug";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import * as THREE from "three";

export class GrassInstancedMesh {
  constructor() {
    const parameters = {
      color: new THREE.Color("#36422f"),
      color2: new THREE.Color("#244922"),
      color3: new THREE.Color("#1a512d"),
      displaceIntensity: 0.05,
      displaceIntensity2: 0.1,
      displaceIntensity3: 0.2,
      grassQuantity: 50,
    };

    this.grassMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: parameters.color },
        uDisplaceIntensity: { value: parameters.displaceIntensity },
      },
      side: THREE.DoubleSide,
      transparent: true,
    });

    this.grassMat2 = this.grassMat.clone();
    this.grassMat2.uniforms.uColor.value = parameters.color2;
    this.grassMat2.uniforms.uDisplaceIntensity.value = parameters.displaceIntensity2;

    this.grassMat3 = this.grassMat.clone();
    this.grassMat3.uniforms.uColor.value = parameters.color3;
    this.grassMat3.uniforms.uDisplaceIntensity.value = parameters.displaceIntensity3;

    const instanceNumber = 50;
    const instance = new THREE.Object3D();

    this.geometry = new THREE.PlaneGeometry(0.01, 0.5, 1, 128);

    this.grassPattern = new THREE.InstancedMesh(
      this.geometry,
      this.grassMat,
      instanceNumber,
    );
    this.grassPattern.scale.set(3, 3, 3);

    // Position and scale the grass blade instances randomly.
    for (let i = 0; i < instanceNumber; i++) {
      instance.position.set(Math.random() - 0.5, 0, Math.random() - 0.5);

      instance.scale.setScalar(Math.random());

      instance.updateMatrix();
      this.grassPattern.setMatrixAt(i, instance.matrix);
    }

    this.grassGroup = new THREE.Group();
    this.grass2Group = new THREE.Group();
    this.grass3Group = new THREE.Group();

    for (let i = 0; i < parameters.grassQuantity; i++) {
      this.grass = this.grassPattern.clone();
      this.grass.position.set((Math.random() - 0.5) * 40, 0, (Math.random() - 0.5) * 40);
      this.grassGroup.add(this.grass);

      this.grass2 = this.grassPattern.clone();
      this.grass2.material = this.grassMat2;
      this.grass2.scale.set(3, 1.5, 3);
      this.grass2.position.set((Math.random() - 0.5) * 40, 0, (Math.random() - 0.5) * 40);
      this.grass2Group.add(this.grass2);

      this.grass3 = this.grassPattern.clone();
      this.grass3.material = this.grassMat3;
      this.grass2.scale.set(3, 0.75, 3);
      this.grass3.position.set((Math.random() - 0.5) * 40, 0, (Math.random() - 0.5) * 40);
      this.grass3Group.add(this.grass3);
    }

    raf.subscribe("Grass", this.update.bind(this));

    const grassFolder = gui.addFolder("Grass");
    grassFolder.addColor(parameters, "color").onChange(() => {
      this.grassMat.uniforms.uColor.set(parameters.color);
    });
    grassFolder
      .add(this.grassMat.uniforms.uDisplaceIntensity, "value")
      .min(0)
      .max(1)
      .name("DisplaceIntensity");
    grassFolder.addColor(parameters, "color2").onChange(() => {
      this.grassMat2.uniforms.uColor.set(parameters.color);
    });
    grassFolder
      .add(this.grassMat2.uniforms.uDisplaceIntensity, "value")
      .min(0)
      .max(1)
      .name("DisplaceIntensity2");
    grassFolder.addColor(parameters, "color3").onChange(() => {
      this.grassMat3.uniforms.uColor.set(parameters.color);
    });
    grassFolder
      .add(this.grassMat3.uniforms.uDisplaceIntensity, "value")
      .min(0)
      .max(1)
      .name("DisplaceIntensity3");
  }

  update() {
    this.grassMat.uniforms.uTime.value = raf.elapsedTime;
    this.grassMat2.uniforms.uTime.value = raf.elapsedTime;
    this.grassMat3.uniforms.uTime.value = raf.elapsedTime;
  }
}
