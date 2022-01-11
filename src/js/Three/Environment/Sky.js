import { guiFolders } from "../../utils/Debug";
import skyFragmentShader from "@glsl/sky/fragment.glsl";
import skyVertexShader from "@glsl/sky/vertex.glsl";
import { BackSide, Mesh, PlaneGeometry, ShaderMaterial } from "three";

export class Sky extends Mesh {
  constructor(parameters = {}) {
    const skyMaterial = new ShaderMaterial({
      vertexShader: skyVertexShader,
      fragmentShader: skyFragmentShader,
      side: BackSide,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: parameters.speed },
        uStroke: { value: parameters.strokeSky },
        uSmallNoise: { value: parameters.smallNoiseSky },
        uBigNoise: { value: parameters.bigNoiseSky },
        uColor: { value: parameters.skyColor },
      },
    });
    const skyGeometry = new PlaneGeometry();

    super(skyGeometry, skyMaterial);
    this.scale.set(parameters.envScale, parameters.envScale / 2, parameters.envScale);
    this.rotation.x = -Math.PI * 0.6;
    this.position.y = 10;

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
