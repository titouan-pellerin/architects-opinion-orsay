import fragmentShaderPosition from "../../../../glsl/particles/leaves/fragmentShaderPosition.glsl";
import fragmentShaderVelocity from "../../../../glsl/particles/leaves/fragmentShaderVelocity.glsl";
import leaveFragmentShader from "../../../../glsl/particles/leaves/leaveFragmentShader.glsl";
import leaveVertexShader from "../../../../glsl/particles/leaves/leaveVertexShader.glsl";
import { guiFolders } from "../../../utils/Debug";
import { mouse } from "../../../utils/Mouse";
import raf from "../../../utils/Raf";
import { isSafari } from "../../../utils/misc.js";
import { mainScene } from "../../MainScene.js";
import { LeavesGeometry } from "./LeavesGeometry";
import { DoubleSide, HalfFloatType, RepeatWrapping } from "three";
import { Vector3 } from "three";
import { SphereGeometry } from "three";
import { Color } from "three";
import { ShaderMaterial } from "three";
import { Mesh } from "three";
import { MeshBasicMaterial } from "three";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer";

export class Leaves {
  constructor(WIDTH = 16, BOUNDS = 25) {
    this.BOUNDS = BOUNDS;
    this.BOUNDS_HALF = BOUNDS / 2;

    // Texture width
    this.WIDTH = WIDTH;
    this.AMOUNT = WIDTH * WIDTH;
    this.gpuCompute = new GPUComputationRenderer(
      this.WIDTH,
      this.WIDTH,
      mainScene.renderer
    );
    if (isSafari()) {
      this.gpuCompute.setDataType(HalfFloatType);
    }

    this.dtPosition = this.gpuCompute.createTexture();
    this.dtVelocity = this.gpuCompute.createTexture();
    this.fillPositionTexture(this.dtPosition);
    this.fillVelocityTexture(this.dtVelocity);

    this.velocityVariable = this.gpuCompute.addVariable(
      "textureVelocity",
      fragmentShaderVelocity,
      this.dtVelocity
    );
    this.positionVariable = this.gpuCompute.addVariable(
      "texturePosition",
      fragmentShaderPosition,
      this.dtPosition
    );

    this.gpuCompute.setVariableDependencies(this.velocityVariable, [
      this.positionVariable,
      this.velocityVariable,
    ]);

    this.gpuCompute.setVariableDependencies(this.positionVariable, [
      this.positionVariable,
      this.velocityVariable,
    ]);

    this.positionUniforms = this.positionVariable.material.uniforms;
    this.velocityUniforms = this.velocityVariable.material.uniforms;

    this.positionUniforms["time"] = { value: 0.0 };
    this.positionUniforms["delta"] = { value: 0.0 };
    this.velocityUniforms["time"] = { value: 1.0 };
    this.velocityUniforms["delta"] = { value: 0.0 };
    // this.velocityUniforms["testing"] = { value: 1.0 };
    // this.velocityUniforms["separationDistance"] = { value: 0.0 };
    // this.velocityUniforms["alignmentDistance"] = { value: 0.0 };
    // this.velocityUniforms["cohesionDistance"] = { value: 0.0 };
    // this.velocityUniforms["freedomFactor"] = { value: 0.0 };
    // this.velocityUniforms["predator"] = { value: new Vector3() };
    this.velocityVariable.material.defines.BOUNDS = this.BOUNDS.toFixed(2);

    this.velocityVariable.wrapS = RepeatWrapping;
    this.velocityVariable.wrapT = RepeatWrapping;
    this.positionVariable.wrapS = RepeatWrapping;
    this.positionVariable.wrapT = RepeatWrapping;

    const error = this.gpuCompute.init();

    if (error !== null) {
      console.error(error);
    }
    this.initLeaves();
    raf.subscribe("leaves", this.update.bind(this));
  }

  fillPositionTexture(texture) {
    const theArray = texture.image.data;

    for (let k = 0, kl = theArray.length; k < kl; k += 4) {
      const x = Math.random() * this.BOUNDS - this.BOUNDS_HALF;
      // const y = Math.random() * this.BOUNDS - this.BOUNDS_HALF;
      const y = Math.random() * 100;
      const z = Math.random() * this.BOUNDS - this.BOUNDS_HALF;

      theArray[k + 0] = x;
      theArray[k + 1] = y;
      theArray[k + 2] = z;
      theArray[k + 3] = 1;
    }
  }

  fillVelocityTexture(texture) {
    const theArray = texture.image.data;

    for (let k = 0, kl = theArray.length; k < kl; k += 4) {
      const x = Math.random() - 0.5;
      const y = -1;
      const z = Math.random() - 0.5;

      theArray[k + 0] = x * 10;
      theArray[k + 1] = y * 10;
      theArray[k + 2] = z * 10;
      theArray[k + 3] = 1;
    }
  }

  initLeaves() {
    const geometry = new LeavesGeometry(1000000, this.WIDTH);

    // For Vertex and Fragment
    this.leavesUniforms = {
      color: { value: new Color(0x00ff00) },
      texturePosition: { value: null },
      textureVelocity: { value: null },
      time: { value: 1.0 },
      delta: { value: 0.0 },
    };

    const leavesFolder = guiFolders.get("atmosphere").addFolder("Leaves");
    leavesFolder.addColor(this.leavesUniforms.color, "value").name("Leaves color");

    const material = new ShaderMaterial({
      uniforms: this.leavesUniforms,
      vertexShader: leaveVertexShader,
      fragmentShader: leaveFragmentShader,
      side: DoubleSide,
    });

    this.leaveMesh = new Mesh(geometry, material);
    this.leaveMesh.rotation.y = Math.PI / 2;
    this.leaveMesh.matrixAutoUpdate = false;
    this.leaveMesh.updateMatrix();
  }

  update() {
    this.positionUniforms["time"].value = raf.elapsedTime;
    this.positionUniforms["delta"].value = raf.deltaTime;
    this.velocityUniforms["time"].value = raf.elapsedTime;
    this.velocityUniforms["delta"].value = raf.deltaTime;

    this.leavesUniforms["time"].value = raf.elapsedTime;
    this.leavesUniforms["delta"].value = raf.deltaTime;
    // this.velocityUniforms["predator"].value.set(
    //   mouse.normalizedMouseCoords.x,
    //   mouse.normalizedMouseCoords.y,
    //   0
    // );

    this.gpuCompute.compute();

    this.leavesUniforms["texturePosition"].value = this.gpuCompute.getCurrentRenderTarget(
      this.positionVariable
    ).texture;
    this.leavesUniforms["textureVelocity"].value = this.gpuCompute.getCurrentRenderTarget(
      this.velocityVariable
    ).texture;
  }
}
