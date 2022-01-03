import commonLeaveFragmentShader from "../../../../glsl/particles/leaves/commonLeaveFragmentShader.glsl";
import commonLeaveVertexShader from "../../../../glsl/particles/leaves/commonLeaveVertexShader.glsl";
import fragmentShaderPosition from "../../../../glsl/particles/leaves/fragmentShaderPosition.glsl";
import fragmentShaderVelocity from "../../../../glsl/particles/leaves/fragmentShaderVelocity.glsl";
import outputLeaveFragmentShader from "../../../../glsl/particles/leaves/outputLeaveFragmentShader.glsl";
import projectLeaveVertexShader from "../../../../glsl/particles/leaves/projectLeaveVertexShader.glsl";
import { gui, guiFolders } from "../../../utils/Debug";
import { mouse } from "../../../utils/Mouse";
import raf from "../../../utils/Raf";
import { isSafari } from "../../../utils/misc.js";
import { CustomMeshToonMaterial } from "../../CustomMeshToonMaterial";
import { mainScene } from "../../MainScene.js";
import { LeavesGeometry } from "./LeavesGeometry";
import { DoubleSide, HalfFloatType, RepeatWrapping } from "three";
import { Vector3 } from "three";
import { SphereGeometry } from "three";
import { Color } from "three";
import { ShaderMaterial } from "three";
import { Mesh } from "three";
import { MeshBasicMaterial } from "three";
import { MeshToonMaterial } from "three";
import { Vector2 } from "three";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer";

export class Leaves {
  constructor(WIDTH = 16, BOUNDS = 10) {
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
    this.positionUniforms["camPos"] = { value: new Vector2(0, 0) };
    this.velocityUniforms["time"] = { value: 1.0 };
    this.velocityUniforms["delta"] = { value: 0.0 };
    // this.velocityVariable.material.defines.BOUNDS = this.BOUNDS.toFixed(2);

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
      const x = Math.random() * 100 - 50;
      // const y = Math.random();
      const y = Math.random() * 10;
      const z = Math.random() * -50;
      // const x = 0;
      // const y = 0;
      // const z = 0;

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

      theArray[k + 0] = x;
      theArray[k + 1] = y;
      theArray[k + 2] = z;
      theArray[k + 3] = 1;
    }
  }

  initLeaves() {
    const geometry = new LeavesGeometry(200, this.WIDTH);

    // For Vertex and Fragment
    this.leavesUniforms = {
      uColor: { value: new Color(0x85cf33) },
      uColor2: { value: new Color(0x3f7836) },
      texturePosition: { value: null },
      textureVelocity: { value: null },
      time: { value: 1.0 },
      delta: { value: 0.0 },
    };

    const leavesFolder = guiFolders.get("atmosphere").addFolder("Leaves");
    leavesFolder.addColor(this.leavesUniforms.uColor, "value").name("Leaves color");
    leavesFolder.addColor(this.leavesUniforms.uColor2, "value").name("Leaves color");

    // const material = new CustomMeshToonMaterial(
    //   commonLeaveFragmentShader,
    //   outputLeaveFragmentShader,
    //   commonLeaveVertexShader,
    //   null,
    //   projectLeaveVertexShader,
    //   this.leavesUniforms,
    //   {
    //     side: DoubleSide,
    //     transparent: true,
    //     // wireframe: true,
    //   }
    // );
    const material = new MeshToonMaterial({
      side: DoubleSide,
      transparent: true,
      // wireframe: true,
    });
    material.depthWrite = 0;
    material.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...this.leavesUniforms };
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        commonLeaveFragmentShader
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        outputLeaveFragmentShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        commonLeaveVertexShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <project_vertex>",
        projectLeaveVertexShader
      );
    };

    this.leaveMesh = new Mesh(geometry, material);
    // this.leaveMesh.position.z = -10;
    // this.leaveMesh.position.y = -3;
    this.leaveMesh.rotation.y = -Math.PI / 2;
    // this.leaveMesh.renderOrder = 10;
    this.leaveMesh.matrixAutoUpdate = false;
    this.leaveMesh.frustumCulled = false;
    this.leaveMesh.updateMatrix();
  }

  update() {
    this.positionUniforms["time"].value = raf.elapsedTime;
    this.positionUniforms["delta"].value = raf.deltaTime;
    this.positionUniforms["camPos"].value = new Vector2(
      mainScene.camera.position.x,
      mainScene.camera.position.z
    );
    this.velocityUniforms["time"].value = raf.elapsedTime;
    this.velocityUniforms["delta"].value = raf.deltaTime;

    this.leavesUniforms["time"].value = raf.elapsedTime;
    this.leavesUniforms["delta"].value = raf.deltaTime;

    this.gpuCompute.compute();

    this.leavesUniforms["texturePosition"].value = this.gpuCompute.getCurrentRenderTarget(
      this.positionVariable
    ).texture;
    this.leavesUniforms["textureVelocity"].value = this.gpuCompute.getCurrentRenderTarget(
      this.velocityVariable
    ).texture;

    // this.leaveMesh.updateMatrixWorld();

    // this.leaveMesh.position.z = mainScene.camera.position.z - 10;

    // this.leaveMesh.rotation.z = mainScene.camera.rotation.y;
    // this.leaveMesh.position.x =
    //   mainScene.camera.position.x + Math.sign(this.leaveMesh.position.x) * 10;

    // this.leaveMesh.position.set(
    //   mainScene.camera.position.x,
    //   0,
    //   mainScene.camera.position.z + 10
    // );
    // console.log("camera", mainScene.camera.position.z);
    // console.log("leaves", this.leaveMesh.position.z);
  }
}
