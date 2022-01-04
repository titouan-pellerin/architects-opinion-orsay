import { positions } from "../../utils/positions";
import { Cubes } from "./Elements/Cubes";
import groundBeginVertexShader from "@glsl/ground/ground/beginVertex.glsl";
import groundCommonFragmentShader from "@glsl/ground/ground/commonFragment.glsl";
import groundCommonVertexShader from "@glsl/ground/ground/commonVertex.glsl";
import groundOutputFragmentShader from "@glsl/ground/ground/outputFragment.glsl";
import maskBeginVertexShader from "@glsl/ground/mask/beginVertex.glsl";
import maskCommonFragmentShader from "@glsl/ground/mask/commonFragment.glsl";
import maskCommonVertexShader from "@glsl/ground/mask/commonVertex.glsl";
import maskOutputFragmentShader from "@glsl/ground/mask/outputFragment.glsl";
import { CustomMeshToonMaterial } from "@js/Three/CustomMeshToonMaterial";
import { PlaneGeometry } from "three";
import { MeshToonMaterial } from "three";
import { Mesh } from "three";
import { Color } from "three";
import { Group } from "three";
import { Vector3 } from "three";

export class Ground extends Group {
  constructor(texture, parameters = {}) {
    super();
    this.texture = texture;

    this.cubes = null;

    this.groundUniforms = {
      uTime: { value: 0 },
      uColor: { value: new Color("#83ce72") },
      uTexture: { value: texture },
    };

    this.groundMaskUniforms = {
      uTime: { value: 0 },
      uSpeed: { value: parameters.speed },
      uStroke: { value: parameters.stroke },
      uSmallNoise: { value: parameters.smallNoise },
      uBigNoise: { value: parameters.bigNoise },
      uColor: { value: parameters.groundColor },
    };

    const groundMaterial = new CustomMeshToonMaterial(
      groundCommonFragmentShader,
      groundOutputFragmentShader,
      groundCommonVertexShader,
      groundBeginVertexShader,
      null,
      this.groundUniforms
    );

    const groundMaskMaterial = new MeshToonMaterial({
      transparent: true,
    });
    groundMaskMaterial.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...this.groundMaskUniforms };
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        maskCommonFragmentShader
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        maskOutputFragmentShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        maskCommonVertexShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        maskBeginVertexShader
      );
    };

    const groundGeometry = new PlaneGeometry(1, 1, 512, 512);

    this.ground = new Mesh(groundGeometry, groundMaterial.meshToonMaterial);
    this.ground.rotation.x = -Math.PI * 0.5;
    this.ground.position.y = -3.01;
    this.ground.scale.set(parameters.envScale, parameters.envScale, parameters.envScale);
    this.ground.receiveShadow = true;

    this.mask = new Mesh(groundGeometry, groundMaskMaterial);
    this.mask.rotation.x = -Math.PI * 0.5;
    this.mask.position.y = -3;
    this.mask.scale.set(parameters.envScale, parameters.envScale, parameters.envScale);

    this.add(this.ground, this.mask);
  }

  getCenter() {
    this.ground.geometry.computeBoundingBox();
    const center = new Vector3();
    this.ground.geometry.boundingBox.getCenter(center);
    this.ground.localToWorld(center);
    return center;
  }
}
