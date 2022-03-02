import commonFragmentShader from "@glsl/dust/commonFragment.glsl";
import commonVertexShader from "@glsl/dust/commonVertex.glsl";
import outputFragmentShader from "@glsl/dust/outputFragment.glsl";
import projectVertexShader from "@glsl/dust/projectVertex.glsl";
import { customFogUniforms } from "@js/utils/misc";
import {
  Color,
  DoubleSide,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PlaneBufferGeometry,
  Vector3,
} from "three";
import { mainScene } from "../../../../main";
import raf from "../../../utils/Raf";

const tVec3 = new Vector3();
const tCol = new Color();

const params = {
  //  MORNING
  // color: "#e5aa43",
  //  DAY
  color: "#ffffb3",
  //  NIGHT
  // color: "#284e84",
};

export class Dust {
  constructor() {
    this.object = {};
    this.count = 20000;
    this.init();

    raf.subscribe("dust", this.update.bind(this));
  }

  init() {
    this.setAttributes();
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setAttributes() {
    const particlesCount = this.count;

    this.positions = new Float32Array(particlesCount * 3);
    this.offset = new Float32Array(particlesCount * 1);
    this.scale = new Float32Array(particlesCount * 1);

    // -225 : 25

    for (let i = 0; i < particlesCount; i++) {
      this.positions[i * 3 + 0] = MathUtils.randFloatSpread(1);
      this.positions[i * 3 + 1] = MathUtils.randFloatSpread(1);
      this.positions[i * 3 + 2] = MathUtils.randFloatSpread(40);

      this.offset[i + 0] = MathUtils.randFloatSpread(75);
      this.scale[i + 0] = MathUtils.randFloat(0.5, 3);
    }
  }

  setGeometry() {
    const blueprintParticle = new PlaneBufferGeometry();
    blueprintParticle.scale(0.01, 0.01, 0.01);

    this.object.geometry = new InstancedBufferGeometry();

    this.object.geometry.index = blueprintParticle.index;
    this.object.geometry.attributes.position = blueprintParticle.attributes.position;
    this.object.geometry.attributes.normal = blueprintParticle.attributes.normal;
    this.object.geometry.attributes.uv = blueprintParticle.attributes.uv;

    this.object.geometry.setAttribute(
      "aPositions",
      new InstancedBufferAttribute(this.positions, 3, false)
    );
    this.object.geometry.setAttribute(
      "aOffset",
      new InstancedBufferAttribute(this.offset, 1, false)
    );
    this.object.geometry.setAttribute(
      "aScale",
      new InstancedBufferAttribute(this.scale, 1, false)
    );
  }

  setMaterial() {
    this.object.material = new MeshBasicMaterial({
      side: DoubleSide,
      transparent: true,
      depthTest: true,
      depthWrite: false,
    });
    this.object.material.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        ...mainScene.dustUniforms,
        ...customFogUniforms,
      };
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        commonFragmentShader
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        outputFragmentShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        commonVertexShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <project_vertex>",
        projectVertexShader
      );
    };
  }

  setMesh() {
    this.object.mesh = new Mesh(this.object.geometry, this.object.material);
    this.object.mesh.frustumCulled = false;

    // this.object.mesh.position.z = 20;
    // this.object.mesh.position.y = -0.5;
  }

  update() {
    mainScene.dustUniforms.uTime.value = raf.elapsedTime;
  }
}
