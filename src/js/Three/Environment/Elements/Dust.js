import fragment from "@glsl/dust/fragment.glsl";
import vertex from "@glsl/dust/vertex.glsl";
import {
  AdditiveBlending,
  Color,
  DoubleSide,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  MathUtils,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  Vector3,
} from "three";
import raf from "../../../utils/Raf";

const tVec3 = new Vector3();
const tCol = new Color();

const params = {
  color: "#e5ba43",
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
    // blueprintParticle.scale(0.1, 0.1, 0.1);
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
    this.object.material = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: tCol.set(params.color) },
        uAlpha: { value: 1 },
      },
      side: DoubleSide,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });
  }

  setMesh() {
    this.object.mesh = new Mesh(this.object.geometry, this.object.material);
    this.object.mesh.frustumCulled = false;

    // this.object.mesh.position.z = 20;
    // this.object.mesh.position.y = -0.5;
  }

  update() {
    this.object.material.uniforms.uTime.value = raf.elapsedTime;
  }
}
