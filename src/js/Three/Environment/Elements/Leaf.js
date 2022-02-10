import vertex from "@glsl/leaf/vertex.glsl";
import fragment from "@glsl/leaf/fragment.glsl";
import { Color } from "three";
import { Vector3 } from "three";
import { DoubleSide } from "three";
import { AdditiveBlending } from "three";
import { InstancedBufferAttribute } from "three";
import { InstancedBufferGeometry } from "three";
import { PlaneBufferGeometry } from "three";
import { MathUtils } from "three";
import { ShaderMaterial } from "three";
import { Mesh } from "three";
import raf from "../../../utils/Raf";

const tVec3 = new Vector3();
const tCol = new Color();

const params = {
  color: "#d1e997",
  color2: "#4a9e36",
};

export class Leaf {
  constructor() {
    this.object = {};
    this.count = 4096;
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
    blueprintParticle.scale(0.075, 0.075, 0.075);

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
        uColor2: { value: tCol.set(params.color2) },
        uAlpha: { value: 1 },
      },
      side: DoubleSide,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      // blending: AdditiveBlending,
    });
  }

  setMesh() {
    this.object.mesh = new Mesh(this.object.geometry, this.object.material);
  }

  update() {
    this.object.material.uniforms.uTime.value = raf.elapsedTime;
  }
}
