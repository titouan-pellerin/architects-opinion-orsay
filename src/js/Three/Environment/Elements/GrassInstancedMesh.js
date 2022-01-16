import commonFragmentShader from "@glsl/grass/commonFragment.glsl";
import commonVertexShader from "@glsl/grass/commonVertex.glsl";
import outputFragmentShader from "@glsl/grass/outputFragment.glsl";
import projectVertexShader from "@glsl/grass/projectVertex.glsl";
import * as THREE from "three";
import { Vector3 } from "three";
import { texturesMap } from "../../../utils/assets";
import { CustomMeshToonMaterial } from "../../CustomMeshToonMaterial";

export class GrassInstancedMesh {
  constructor(uniforms, envScale, sampler, pathLine) {
    this.pathLine = pathLine;

    this.defaultPositions = [];
    this.curveTexturesData = [];
    this.curveTexturesMatrices = new Map();
    this.textureSize = Math.floor(texturesMap.get("curveTextures")[0].image.width * 0.25);

    this.generateTexturesData();

    this.material = new CustomMeshToonMaterial(
      commonFragmentShader,
      outputFragmentShader,
      commonVertexShader,
      null,
      projectVertexShader,
      uniforms,
      {
        side: THREE.DoubleSide,
      }
    );

    this.instanceNumber = 100000;
    const instance = new THREE.Object3D();

    this.geometry = new THREE.PlaneGeometry(0.01, 1, 1, 8);

    this.instancedGrassMesh = new THREE.InstancedMesh(
      this.geometry,
      this.material.meshToonMaterial,
      this.instanceNumber
    );

    this.instancedGrassMesh.matrixAutoUpdate = false;

    for (let i = 0; i < this.instanceNumber; i++) {
      const instancePos = new Vector3();

      sampler.sample(instancePos);
      instancePos.x *= envScale;
      instancePos.y *= -envScale;
      instancePos.z *= envScale;
      instance.position.set(instancePos.x, instancePos.z - 2.85, instancePos.y);

      for (let i = 0; i < this.curveTexturesData.length; i++) {
        const textureInstancePosX = Math.floor(
          ((instance.position.x + 25) * this.textureSize) / 50
        );
        const textureInstancePosY = Math.floor(
          ((instance.position.z + 25) * this.textureSize) / 50
        );
        const red =
          this.curveTexturesData[i][
            textureInstancePosY * (this.textureSize * 4) + textureInstancePosX * 4 + 2
          ];

        instance.position.y = instance.position.y * (1 - red / 255) + (-2.95 * red) / 255;
        instance.scale.y = 1 * (1 - red / 255) + (0.5 * red) / 255;
        instance.updateMatrix();

        if (!this.curveTexturesMatrices.get(i))
          this.curveTexturesMatrices.set(i, [instance.matrix.clone()]);
        else this.curveTexturesMatrices.get(i).push(instance.matrix.clone());
      }
    }
  }

  generateTexturesData() {
    const textures = texturesMap.get("curveTextures");
    const canvas = document.createElement("canvas");
    canvas.width = this.textureSize;
    canvas.height = this.textureSize;
    const context = canvas.getContext("2d");
    for (const texture of textures) {
      context.drawImage(texture.image, 0, 0, this.textureSize, this.textureSize);
      const imageData = context.getImageData(0, 0, this.textureSize, this.textureSize);
      this.curveTexturesData.push(imageData.data);
      context.clearRect(0, 0, this.textureSize, this.textureSize);
    }
    canvas.remove();
  }

  removeInPath(groundIndex, instancedMesh, flipY = false) {
    for (let i = 0; i < this.instanceNumber; i++) {
      const newInstanceMatrix = this.curveTexturesMatrices.get(groundIndex)[i];
      instancedMesh.setMatrixAt(i, newInstanceMatrix.clone());
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
    instancedMesh.updateMatrix();
  }
}
