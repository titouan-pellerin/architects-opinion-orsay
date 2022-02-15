import commonFragmentShader from "@glsl/leaf/commonFragment.glsl";
import commonVertexShader from "@glsl/leaf/commonVertex.glsl";
import outputFragmentShader from "@glsl/leaf/outputFragment.glsl";
import projectVertexShader from "@glsl/leaf/projectVertex.glsl";
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

const params = {
  color: "#d1e997",
  color2: "#4a9e36",
};

export class Leaf {
  constructor() {
    this.object = {};
    this.count = 10000;
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
    this.offset = new Float32Array(particlesCount * 1);
    this.scale = new Float32Array(particlesCount * 1);
    this.speedFactor = new Float32Array(particlesCount * 1);

    for (let i = 0; i < particlesCount; i++) {
      this.positions[i * 3 + 0] = MathUtils.randFloatSpread(35);
      this.positions[i * 3 + 1] = MathUtils.randFloatSpread(1);
      this.positions[i * 3 + 2] = MathUtils.randFloatSpread(50);

      this.offset[i + 0] = MathUtils.randFloatSpread(75);
      this.scale[i + 0] = MathUtils.randFloat(0.5, 5);
      this.speedFactor[i + 0] = MathUtils.randFloat(0.5, 1);
    }
  }

  setGeometry() {
    const blueprintParticle = new PlaneBufferGeometry();
    // blueprintParticle.scale(0.1, 0.1, 0.1);
    blueprintParticle.scale(0.125, 0.125, 0.125);

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
    this.object.geometry.setAttribute(
      "aSpeedFactor",
      new InstancedBufferAttribute(this.speedFactor, 1, false)
    );
  }

  setMaterial() {
    // this.object.material = new ShaderMaterial({
    //   vertexShader: vertex,
    //   fragmentShader: fragment,
    //   uniforms: {
    //     uTime: { value: 0 },
    //     uColor: { value: tCol.set(params.color) },
    //     uColor2: { value: tCol.set(params.color2) },
    //     uAlpha: { value: 1 },
    //   },
    //   side: DoubleSide,
    //   transparent: true,
    //   // depthTest: true,
    //   // depthWrite: true,
    //   // blending: AdditiveBlending,
    // });

    this.uniforms = {
      uTime: { value: 0 },
      uColor: { value: tCol.set(params.color) },
      uColor2: { value: tCol.set(params.color2) },
    };

    this.object.material = new MeshToonMaterial({
      side: DoubleSide,
      // transparent: true,
      // blending: AdditiveBlending,
    });
    this.object.material.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...this.uniforms };
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
    this.uniforms.uTime.value = raf.elapsedTime;
  }
}
