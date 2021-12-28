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
import { MeshBasicMaterial } from "three";
import { Vector2 } from "three";
import { BoxGeometry } from "three";
import { Mesh } from "three";
import { Color } from "three";
import { Group } from "three";
import { Vector3 } from "three";

export class Ground extends Group {
  constructor(texture, parameters = {}) {
    super();
    this.texture = texture;

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

    const points = [
      new Vector2(-7.71843645484869, -41.0645551904793),
      new Vector2(4.96969063545119, -42.6270551904793),
      new Vector2(5.60723244146855, -35.216346153851),
      new Vector2(8.09469063544888, -7.80321204144019),
      new Vector2(5.60723244146853, -26.7349498327803),
      new Vector2(9.65719063544547, 1.5625),
      new Vector2(6.53219063544835, -19.5443143812753),
      new Vector2(-6.934573578593, -24.1220735786015),
      new Vector2(-4.59343645484871, 10.2877715758269),
      new Vector2(5.60723244146858, -47.1153846153896),
      new Vector2(-7.71843645484866, -47.1153846153896),
      new Vector2(5.60723244146857, 7.75501672239898),
      new Vector2(-6.93457357859302, -17.9818143812753),
      new Vector2(-10.8434364548486, 1.5625),
      new Vector2(-7.71843645484864, -7.80321204144062),
      new Vector2(-7.71843645484861, -32.091346153851),
    ];
    for (const point of points) {
      console.log(point);
      const cube = new Mesh(
        new BoxGeometry(1, 1, 1),
        new MeshBasicMaterial({ color: 0xff0000 })
      );
      cube.position.set(point.x, 1, point.y);
      // cube.scale.set(parameters.envScale, parameters.envScale, parameters.envScale);
      this.add(cube);
    }

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
