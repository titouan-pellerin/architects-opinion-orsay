import { guiFolders } from "../../utils/Debug";
import skyFragmentShader from "@glsl/sky/fragment.glsl";
import skyVertexShader from "@glsl/sky/vertex.glsl";
import { Mesh } from "three";
import { ShaderMaterial } from "three";
import { SphereGeometry } from "three";

export class Sky extends Mesh {
  constructor(parameters = {}) {
    const skyMaterial = new ShaderMaterial({
      vertexShader: skyVertexShader,
      fragmentShader: skyFragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: parameters.speed },
        uStroke: { value: parameters.stroke },
        uSmallNoise: { value: parameters.smallNoise },
        uBigNoise: { value: parameters.bigNoise },
        uColor: { value: parameters.skyColor },
      },
    });
    const skyGeometry = new SphereGeometry(1, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5);

    super(skyGeometry, skyMaterial);
    this.scale.set(parameters.envScale, parameters.envScale, parameters.envScale);

    /**
     * DEBUG
     */
    const atmosphereFolder = guiFolders.get("atmosphere");

    const skyFolder = atmosphereFolder.addFolder("Sky");
    skyFolder
      .addColor(parameters, "skyColor")
      .onChange(() => {
        this.material.uniforms.uColor.set(parameters.skyColor);
      })
      .name("Color");
    skyFolder
      .add(this.material.uniforms.uStroke, "value")
      .min(0)
      .max(10000)
      .name("StrokeQuantity");
    skyFolder
      .add(this.material.uniforms.uSmallNoise, "value")
      .min(250)
      .max(750)
      .name("SmallNoise");
    skyFolder
      .add(this.material.uniforms.uBigNoise, "value")
      .min(0)
      .max(100)
      .name("BigNoise");
    skyFolder.add(this.material.uniforms.uSpeed, "value").min(0).max(2).name("Speed");
  }
}