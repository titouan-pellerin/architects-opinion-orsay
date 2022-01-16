import commonFragmentShader from "@glsl/grass/commonFragment.glsl";
import commonVertexShader from "@glsl/grass/commonVertex.glsl";
import outputFragmentShader from "@glsl/grass/outputFragment.glsl";
import projectVertexShader from "@glsl/grass/projectVertex.glsl";
import * as THREE from "three";
import { DoubleSide, Object3D, Vector3 } from "three";
import { CustomMeshToonMaterial } from "../../CustomMeshToonMaterial";

export class GrassInstancedMesh {
  constructor(uniforms, envScale, sampler, pathLine) {
    this.pathLine = pathLine;

    this.defaultPositions = [];

    this.material = new CustomMeshToonMaterial(
      commonFragmentShader,
      outputFragmentShader,
      commonVertexShader,
      null,
      projectVertexShader,
      uniforms,
      {
        side: DoubleSide,
      }
    );

    this.instanceNumber = 100000;
    // this.instanceNumber = 10;
    const instance = new THREE.Object3D();

    this.geometry = new THREE.PlaneGeometry(0.01, 0.4, 1, 8);

    this.instancedGrassMesh = new THREE.InstancedMesh(
      this.geometry,
      this.material.meshToonMaterial,
      this.instanceNumber
    );

    this.instancedGrassMesh.matrixAutoUpdate = false;
    this.instancedGrassMesh.updateMatrix();
    // this.instancedGrassMesh.scale.set(3, 3, 3);

    console.time("grass");
    for (let i = 0; i < this.instanceNumber; i++) {
      // const randomScale = Math.random() * 3;
      const instancePos = new Vector3();

      sampler.sample(instancePos);
      instancePos.x *= envScale;
      instancePos.y *= -envScale;
      instancePos.z *= envScale;
      // console.log(instancePos);

      // instanceMatrix.makeTranslation(instancePos.x, instancePos.y, instancePos.z);

      // // do {
      // instancePos.x =
      //   Math.random() * (envScale * groundSize * 0.5 + envScale * groundSize * 0.5) -
      //   envScale * groundSize * 0.5;
      // instancePos.y = 0;
      // // instancePos.z = (Math.random() - 0.5) * 100;
      // instancePos.z =
      //   Math.random() * (envScale * groundSize * 0.5 + envScale * groundSize * 0.5) -
      //   envScale * groundSize * 0.5;

      // instance.scale.set(instanceScale.x, instanceScale.y, instanceScale.z);
      instance.position.set(instancePos.x, instancePos.z - 2.85, instancePos.y);

      this.defaultPositions.push(instance.position.clone());

      // if (pathLine.isPositionInRange(new Vector2(instancePos.x, instancePos.y))) {
      //   //   console.log("in range");
      //   instance.scale.set(0, 0, 0);
      //   //   // instancePos.y = Math.random() * -0.8;
      // }
      instance.updateMatrix();
      this.instancedGrassMesh.setMatrixAt(i, instance.matrix);
    }
    // this.instancedGrassMesh.instanceMatrix.setUsage(DynamicDrawUsage);
    console.timeEnd("grass");
    // this.instancedGrassMesh.updateMatrix();

    // this.group.position.y = -3;

    // for (let i = 0; i < this.parameters.grassQuantity; i++) {
    //   this.grass = this.grassPattern.clone();
    //   this.grass.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    //   setTimeout(() => {
    //     this.grass.matrixAutoUpdate = false;
    //   }, 1);

    //   this.grass.position.set(
    //     (Math.random() - 0.5) * 30,
    //     Math.random() / 2 - 3.2,
    //     (Math.random() - 0.5) * 30,
    //   );
    //   this.group.add(this.grass);
    // }
  }

  removeInPath(texture, instancedMesh, flipY = false) {
    // console.log(this.defaultPositions);
    // const instance = new Object3D();
    // for (let i = 0; i < this.instanceNumber; i++) {
    //   const instanceDefaultPosition = this.defaultPositions[i];
    //   const instanceWorldPosition = instanceDefaultPosition.clone();
    //   instance.position.set(
    //     instanceDefaultPosition.x,
    //     instanceDefaultPosition.y,
    //     instanceDefaultPosition.z
    //   );
    //   instance.localToWorld(instanceWorldPosition);
    //   if (
    //     this.pathLine.isPositionInRange(
    //       new Vector2(instanceWorldPosition.x, instanceWorldPosition.z)
    //     )
    //   ) {
    //     // console.log("in range");
    //     instance.scale.setScalar(0);
    //   }
    //   instance.updateMatrix();

    //   instancedMesh.setMatrixAt(i, instance.matrix);
    // }
    // console.log(instancedMesh);
    const canvas = document.createElement("canvas");
    const textureSize = texture.image.width / 10;
    canvas.width = textureSize;
    canvas.height = textureSize;
    const context = canvas.getContext("2d");

    context.drawImage(texture.image, 0, 0, textureSize, textureSize);
    // const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // const curvePosTexture = new DataTexture(
    //   imageData.data,
    //   canvas.width,
    //   canvas.height,
    //   RGBAFormat
    // );
    // console.log(imageData.data);
    const instance = new Object3D();
    console.log(this.defaultPositions);
    for (let i = 0; i < this.instanceNumber; i++) {
      // const randomScale = Math.random() * 3;
      const newInstancePos = this.defaultPositions[i].clone();

      const textureInstancePosX = Math.floor(
        ((newInstancePos.x + 25) * textureSize) / 50
      );
      const textureInstancePosY = Math.floor(
        ((newInstancePos.z + 25) * textureSize) / 50
      );
      const pixel = context.getImageData(textureInstancePosX, textureInstancePosY, 1, 1);
      if (pixel.data[1] >= 178.5) newInstancePos.y = newInstancePos.y * 0.1 - 2.75;
      // console.log(pixel.data[0] >= 178.5);
      instance.position.set(newInstancePos.x, newInstancePos.y, newInstancePos.z);
      instance.updateMatrix();
      instancedMesh.setMatrixAt(i, instance.matrix);
    }
    instancedMesh.updateMatrix();
    canvas.remove();
  }
}
