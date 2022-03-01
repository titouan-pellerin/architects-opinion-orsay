import commonFragmentShader from "@glsl/butterfly/commonFragment.glsl";
import commonVertexShader from "@glsl/butterfly/commonVertex.glsl";
import outputFragmentShader from "@glsl/butterfly/outputFragment.glsl";
import projectVertexShader from "@glsl/butterfly/projectVertex.glsl";
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
import { texturesMap } from "../../../utils/assets";
import raf from "../../../utils/Raf";

const tCol = new Color();

const butterfliesColors = ["#0000ff", "#00ff00", "#0ffff0", "#ff0000"];

export class Butterfly {
  constructor() {
    this.object = {};
    this.count = 80;
    this.init();

    raf.subscribe("butterfly", this.update.bind(this));
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
      this.positions[i * 3 + 1] = -10;
      this.positions[i * 3 + 2] = MathUtils.randFloat(2, 1);

      const randomColor = tCol.set(
        butterfliesColors[MathUtils.randInt(0, butterfliesColors.length - 1)]
      );
      this.colors[i * 3 + 0] = randomColor.r;
      this.colors[i * 3 + 1] = randomColor.g;
      this.colors[i * 3 + 2] = randomColor.b;

      this.offset[i + 0] = MathUtils.randFloatSpread(75);
      this.scale[i + 0] = MathUtils.randFloat(-10, 10);
      this.speedFactor[i + 0] = MathUtils.randFloat(10, 20);
    }
  }

  setGeometry() {
    const blueprintParticle = new PlaneBufferGeometry(1, 1, 8, 8);
    // blueprintParticle.rotateX(Math.PI * 0.75);
    blueprintParticle.scale(0.135, 0.135, 0.135);

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
    this.butterflyUniforms = {
      uTime: { value: 0 },
      uTexture: { value: texturesMap.get("butterflyPattern")[0] },
    };

    this.object.material = new MeshToonMaterial({
      side: DoubleSide,
      // wireframe: true,
      // transparent: true,
      // blending: AdditiveBlending,
    });
    this.object.material.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        ...this.butterflyUniforms,
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
    this.object.mesh.rotation.z = -Math.PI * 0.5;
    this.object.mesh.rotation.x = Math.PI * 0.5;

    this.object.mirrorMesh = new Mesh(this.object.geometry, this.object.material);
    this.object.mirrorMesh.frustumCulled = false;
    this.object.mirrorMesh.rotation.z = Math.PI * 0.5;
    this.object.mirrorMesh.rotation.x = Math.PI * 0.5;
  }

  update() {
    this.butterflyUniforms.uTime.value = raf.elapsedTime;
  }
}
