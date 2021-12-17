import fragmentShader from "../../glsl/ground/fragment.glsl";
import vertexShader from "../../glsl/ground/vertex.glsl";
import { gui } from "../utils/Debug";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import { texturesMap } from "../utils/assets";
import * as THREE from "three";

export class Ground {
  constructor() {
    const parameters = {
      groundScale: 40,
      color: new THREE.Color("#36422f"),
    };

    // this.grassMat = new THREE.ShaderMaterial({
    //   vertexShader,
    //   fragmentShader,
    //   uniforms: {
    //     uTime: { value: 0 },
    //     uColor: { value: parameters.color },
    //   },
    //   side: THREE.DoubleSide,
    //   transparent: true,
    // });
    this.grassMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
      },
    });

    this.geometry = new THREE.BoxGeometry();
    this.geometry2 = new THREE.PlaneGeometry();

    // this.plane = new THREE.Mesh(this.geometry2, this.grassMat);
    // this.plane.rotation.x = Math.PI * 0.5;
    // this.plane.position.x = 5;
    // this.plane.scale.set(
    //   parameters.groundScale,
    //   parameters.groundScale,
    //   parameters.groundScale,
    // );

    this.ground = new THREE.Mesh(this.geometry2, this.grassMat);
    this.ground.rotation.x = Math.PI * 0.5;
    this.ground.position.y = -0.2;
    this.ground.scale.set(
      parameters.groundScale,
      parameters.groundScale,
      parameters.groundScale,
    );

    raf.subscribe("Ground", this.update.bind(this));

    const grassFolder = gui.addFolder("Ground");
    // grassFolder.addColor(parameters, "color").onChange(() => {
    //   this.grassMat.uniforms.uColor.set(parameters.color);
    // });
    // grassFolder.add(this.grassMat.uniforms.uDisplaceIntensity, "value").min(0).max(1).name("DisplaceIntensity")
    // grassFolder.addColor(parameters, "color2").onChange(() => {
    //   this.grassMat2.uniforms.uColor.set(parameters.color);
    // });
    // grassFolder.add(this.grassMat2.uniforms.uDisplaceIntensity, "value").min(0).max(1).name("DisplaceIntensity2")
    // grassFolder.addColor(parameters, "color3").onChange(() => {
    //   this.grassMat3.uniforms.uColor.set(parameters.color);
    // });
    // grassFolder.add(this.grassMat3.uniforms.uDisplaceIntensity, "value").min(0).max(1).name("DisplaceIntensity3")
  }

  update() {
    this.grassMat.uniforms.uTime.value = raf.elapsedTime;
  }
}
