import * as THREE from "three";
import { Vector3 } from "three";
import { texturesMap } from "../../../utils/assets";
import { modelsMap } from "../../../utils/assets";

import commonFragmentShader from "@glsl/flower/commonFragment.glsl";
import commonVertexShader from "@glsl/flower/commonVertex.glsl";
import outputFragmentShader from "@glsl/flower/outputFragment.glsl";
import projectVertexShader from "@glsl/flower/projectVertex.glsl";
import { CustomMeshToonMaterial } from "../../CustomMeshToonMaterial";

export class FlowerInstancedMesh {
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

    // this.instanceNumber = 50000;
    // const instance = new THREE.Object3D();

    // this.geometry = new THREE.PlaneGeometry(0.01, 0.7, 1, 2);

    // this.material = new THREE.MeshBasicMaterial({
    //   side: THREE.DoubleSide,
    //   alphaTest: 0.5,
    //   depthWrite: true,
    //   transparent: true,
    // });

    this.instanceNumber = 1000;
    const instance = new THREE.Object3D();

    this.geometry = modelsMap.get("flower")[0].children[0].geometry;

    this.instancedGrassMesh = new THREE.InstancedMesh(
      this.geometry,
      this.material.meshToonMaterial,
      this.instanceNumber
    );

    this.instancedGrassMesh.matrixAutoUpdate = false;

    for (let i = 0; i < this.instanceNumber; i++) {
      const instancePos = new Vector3();
      const instanceNormal = new Vector3();

      sampler.sample(instancePos, instanceNormal);
      instancePos.x *= envScale;
      instancePos.y *= -envScale;
      instancePos.z *= envScale;

      instanceNormal.x *= -envScale;
      instanceNormal.y *= -envScale;
      instanceNormal.z *= -envScale;

      instance.position.set(instancePos.x, instancePos.z - 2.68, instancePos.y);
      instance.lookAt(instanceNormal);
      let posY = instance.position.y;

      for (let j = 0; j < this.curveTexturesData.length; j++) {
        const flipY = j % 2 == 0 ? 1 : -1;

        let textureInstancePosX, textureInstancePosY, red, green, alpha;

        do {
          textureInstancePosX = Math.floor(
            ((instance.position.x + 25) * this.textureSize) / 50
          );
          textureInstancePosY = Math.floor(
            ((flipY * instance.position.z + 25) * this.textureSize) / 50
          );
          // Red is the main path
          red =
            this.curveTexturesData[j][
              textureInstancePosY * (this.textureSize * 4) + textureInstancePosX * 4
            ];

          // Green is the river path
          green =
            this.curveTexturesData[j][
              textureInstancePosY * (this.textureSize * 4) + textureInstancePosX * 4 + 1
            ];

          // Alpha is where there is no grass
          alpha =
            this.curveTexturesData[j][
              textureInstancePosY * (this.textureSize * 4) + textureInstancePosX * 4 + 3
            ];
          if (alpha === 0) {
            sampler.sample(instancePos, instanceNormal);
            instancePos.x *= envScale;
            instancePos.y *= -envScale;
            instancePos.z *= envScale;

            instanceNormal.x *= -envScale;
            instanceNormal.y *= -envScale;
            instanceNormal.z *= -envScale;

            instance.position.set(instancePos.x, instancePos.z - 2.68, instancePos.y);
            instance.lookAt(instanceNormal);
            posY = instance.position.y;
          }
        } while (alpha === 0);

        instance.position.y = posY * (1 - red / 255) + (-2.7 * red) / 255;
        instance.scale.set(0.02, 0.02, 0.02);
        instance.rotation.y = Math.random() * Math.PI;
        if (green >= 1 || alpha === 0) {
          // Setting the vector scale to 0 doesn't work... all instances get black ?
          instance.position.y = -100;
          instance.scale.y = 0;
        }

        instance.updateMatrix();

        if (!this.curveTexturesMatrices.get(j))
          this.curveTexturesMatrices.set(j, [instance.matrix.clone()]);
        else this.curveTexturesMatrices.get(j).push(instance.matrix.clone());
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

  setInstanceMatrices(groundIndex, instancedMesh) {
    for (let i = 0; i < this.instanceNumber; i++) {
      const newInstanceMatrix = this.curveTexturesMatrices.get(groundIndex)[i];
      instancedMesh.setMatrixAt(i, newInstanceMatrix.clone());
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
    instancedMesh.updateMatrix();
  }
}