import commonFragmentShader from "@glsl/leaf/commonFragment.glsl";
import commonVertexShader from "@glsl/leaf/commonVertex.glsl";
import outputFragmentShader from "@glsl/leaf/outputFragment.glsl";
import projectVertexShader from "@glsl/leaf/projectVertex.glsl";
import { customFogUniforms } from "@js/utils/misc";
import {
  Color,
  DoubleSide,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  MathUtils,
  Mesh,
  MeshToonMaterial,
  PlaneBufferGeometry,
} from "three";
import raf from "../../../utils/Raf";

const tCol = new Color();
const tCol2 = new Color();

const params = {
  uColor: { value: new Color("#d1e997") },
  uColor2: { value: new Color("#4a9e36") },
};

const leavesColors = ["#fff", "#ccc", "#999"];

export class Leaf {
  constructor() {
    this.object = {};
    this.count = 250 * 5;
    this.init();

    raf.subscribe("leaf", this.update.bind(this));
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
    this.colors = new Float32Array(particlesCount * 3);
    this.offset = new Float32Array(particlesCount * 1);
    this.scale = new Float32Array(particlesCount * 1);
    this.speedFactor = new Float32Array(particlesCount * 1);

    for (let i = 0; i < particlesCount; i++) {
      this.positions[i * 3 + 0] = MathUtils.randFloatSpread(50);
      this.positions[i * 3 + 1] = -5;
      // this.positions[i * 3 + 2] = MathUtils.randFloatSpread(50);
      this.positions[i * 3 + 2] = MathUtils.randFloat(-225, 25);

      const randomColor = tCol.set(
        leavesColors[MathUtils.randInt(0, leavesColors.length - 1)]
      );
      this.colors[i * 3 + 0] = randomColor.r;
      this.colors[i * 3 + 1] = randomColor.g;
      this.colors[i * 3 + 2] = randomColor.b;

      this.offset[i + 0] = MathUtils.randFloatSpread(75);
      this.scale[i + 0] = MathUtils.randFloat(1, 50);
      this.speedFactor[i + 0] = MathUtils.randFloat(1, 50);
    }
  }

  setGeometry() {
    const blueprintParticle = new PlaneBufferGeometry(1, 1, 2, 2);
    blueprintParticle.scale(0.15, 0.15, 0.15);

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
      "aColor",
      new InstancedBufferAttribute(this.colors, 3, false)
    );
    this.object.geometry.setAttribute(
      "aOffset",
      new InstancedBufferAttribute(this.offset, 1, false)
    );
    this.object.geometry.setAttribute(
      "aScale",
      new InstancedBufferAttribute(this.scale, 1, false)
    );
    this.object.geometry.setAttribute(
      "aSpeedFactor",
      new InstancedBufferAttribute(this.speedFactor, 1, false)
    );
  }

  setMaterial() {
    this.leavesUniforms = {
      uTime: { value: 0 },
      uColor: { value: tCol.set(params.color) },
      uColor2: { value: tCol2.set(params.color2) },
    };

    this.object.material = new MeshToonMaterial({
      side: DoubleSide,
    });
    this.object.material.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        ...this.leavesUniforms,
        ...customFogUniforms,
      };
      shader.defines = {
        ...shader.defines,
        PARTICLES: true,
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
  }

  update() {
    this.leavesUniforms.uTime.value = raf.elapsedTime;
  }
}
