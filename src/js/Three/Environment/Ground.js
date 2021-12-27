import { guiFolders } from "../../utils/Debug";
import beginVertexShader from "@glsl/ground/beginVertex.glsl";
import commonFragmentShader from "@glsl/ground/commonFragment.glsl";
import commonVertexShader from "@glsl/ground/commonVertex.glsl";
import groundFragmentShader from "@glsl/ground/fragment.glsl";
import outputFragmentShader from "@glsl/ground/outputFragment.glsl";
import groundVertexShader from "@glsl/ground/vertex.glsl";
import { CustomMeshToonMaterial } from "@js/Three/CustomMeshToonMaterial";
import { PlaneGeometry } from "three";
import { Mesh } from "three";
import { Color } from "three";
import { ShaderMaterial } from "three";
import { Group } from "three";

export class Ground extends Group {
  constructor(texture, parameters = {}) {
    super();
    this.texture = texture;

    this.groundMaskUniforms = {
      uTime: { value: 0 },
      uColor: { value: new Color("#83ce72") },
    };

    const groundMaskMaterial = new CustomMeshToonMaterial(
      commonFragmentShader,
      outputFragmentShader,
      commonVertexShader,
      beginVertexShader,
      null,
      this.groundMaskUniforms
    );

    const groundMaterial = new ShaderMaterial({
      vertexShader: groundVertexShader,
      fragmentShader: groundFragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: parameters.speed },
        uStroke: { value: parameters.stroke },
        uSmallNoise: { value: parameters.smallNoise },
        uBigNoise: { value: parameters.bigNoise },
        uColor: { value: parameters.groundColor },
        uTexture: { value: texture },
      },
    });

    const groundGeometry = new PlaneGeometry(1, 1, 512, 512);
    this.ground = new Mesh(groundGeometry, groundMaterial);
    this.ground.rotation.x = -Math.PI * 0.5;
    this.ground.position.y = -3;

    this.ground.scale.set(parameters.envScale, parameters.envScale, parameters.envScale);

    this.mask = new Mesh(groundGeometry, groundMaskMaterial);
    this.mask.rotation.x = -Math.PI * 0.5;
    this.mask.position.y = -3.01;
    this.mask.scale.set(parameters.envScale, parameters.envScale, parameters.envScale);
    this.mask.receiveShadow = true;

    this.add(this.ground, this.mask);
  }
}
