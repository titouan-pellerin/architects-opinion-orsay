import flowerCommonFragmentShader from "@glsl/flower/commonFragment.glsl";
import flowerCommonVertexShader from "@glsl/flower/commonVertex.glsl";
import flowerOutputFragmentShader from "@glsl/flower/outputFragment.glsl";
import flowerProjectVertexShader from "@glsl/flower/projectVertex.glsl";
import grassCommonFragmentShader from "@glsl/grass/commonFragment.glsl";
import grassCommonVertexShader from "@glsl/grass/commonVertex.glsl";
import grassOutputFragmentShader from "@glsl/grass/outputFragment.glsl";
import grassProjectVertexShader from "@glsl/grass/projectVertex.glsl";
import { customFogUniforms } from "@js/utils/misc";
import {
  Color,
  DoubleSide,
  InstancedMesh,
  MathUtils,
  MeshToonMaterial,
  Object3D,
  PlaneGeometry,
  Vector3,
} from "three";
import { modelsMap, texturesMap } from "../../../utils/assets";
import { CustomMeshToonMaterial } from "../../utils/CustomMeshToonMaterial";

export class GroundElements {
  constructor(grassUniforms, flowersUniforms, envScale, sampler, pathLine) {
    this.pathLine = pathLine;

    this.curveTexturesData = [];
    this.curveTexturesMatrices = new Map();
    this.textureSize = Math.floor(texturesMap.get("curveTextures")[0].image.width * 0.25);

    this.generateTexturesData();

    const grassMaterial = new CustomMeshToonMaterial(
      grassCommonFragmentShader,
      grassOutputFragmentShader,
      grassCommonVertexShader,
      null,
      grassProjectVertexShader,
      grassUniforms,
      {
        side: DoubleSide,
      }
    );

    this.flowersColors = [
      new Color("#bad1ef"),
      new Color("#ffcd10"),
      new Color("#f94f24"),
      new Color("#eeafb7"),
    ];

    this.grassColor = [new Color("#84b15a"), new Color("#236760"), new Color("#236700")];
    const flowerMaterial = new MeshToonMaterial({
      side: DoubleSide,
    });
    flowerMaterial.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...flowersUniforms, ...customFogUniforms };
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        flowerCommonFragmentShader
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        flowerOutputFragmentShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        flowerCommonVertexShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <project_vertex>",
        flowerProjectVertexShader
      );
    };

    const grassInstanceNumber = 80000;
    const flowerInstanceNumber = 250;

    const instance = new Object3D();

    const grassGeometry = new PlaneGeometry(0.01, 0.5, 1, 1);
    const flowerGeometry = modelsMap.get("flower")[0].children[0].geometry;
    flowerGeometry.scale(0.023, 0.023, 0.023);

    this.instancedGrassMesh = new InstancedMesh(
      grassGeometry,
      grassMaterial.meshToonMaterial,
      grassInstanceNumber
    );

    this.instancedFlowersMesh = new InstancedMesh(
      flowerGeometry,
      flowerMaterial,
      flowerInstanceNumber
    );

    this.instancedGrassMesh.matrixAutoUpdate = false;
    this.instancedFlowersMesh.matrixAutoUpdate = false;

    for (let i = 0; i < grassInstanceNumber + flowerInstanceNumber; i++) {
      const instancePos = new Vector3();
      const instanceNormal = new Vector3();

      sampler.sample(instancePos, instanceNormal);
      instancePos.x *= envScale;
      instancePos.y *= -envScale;
      instancePos.z *= envScale;

      instanceNormal.x *= -envScale;
      instanceNormal.y *= -envScale;
      instanceNormal.z *= -envScale;

      instance.position.set(instancePos.x, instancePos.z - 2.78, instancePos.y);
      instance.lookAt(instanceNormal);

      if (i >= grassInstanceNumber) instance.rotation.y = Math.random() * Math.PI * 2;

      let posY = instance.position.y;
      for (let j = 0; j < this.curveTexturesData.length; j++) {
        const flipY = j % 2 == 0 ? 1 : -1;

        let textureInstancePosX, textureInstancePosY, red, green, alpha;
        const random = (Math.random() - 0.5) * 30;
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
          if (alpha === 0 || red > 150 + random || green > 0) {
            sampler.sample(instancePos, instanceNormal);
            instancePos.x *= envScale;
            instancePos.y *= -envScale;
            instancePos.z *= envScale;

            instanceNormal.x *= -envScale;
            instanceNormal.y *= -envScale;
            instanceNormal.z *= -envScale;

            instance.position.set(instancePos.x, instancePos.z - 2.78, instancePos.y);
            instance.lookAt(instanceNormal);

            if (i >= grassInstanceNumber) {
              instance.rotation.y = Math.random() * Math.PI * 2;
            }

            posY = instance.position.y;
          }
        } while (alpha === 0 || red > 150 + random || green > 0);

        instance.position.y =
          posY * (1 - red / (150 + random)) + (-2.85 * red) / (150 + random);
        // posY * (1 - red / (150 + random)) + (-2.75 * red) / (150 + random);
        // instance.scale.y = 1 * (1 - red / (150 + random)) + (0.5 * red) / (150 + random);
        if (i >= grassInstanceNumber) {
          const randomScale = MathUtils.randFloat(0.8, 1);
          instance.scale.set(randomScale, randomScale, randomScale);
        } else
          instance.scale.y =
            1 * (1 - red / (150 + random)) + (0.5 * red) / (150 + random);

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

  /**
   *
   * @param {Number} groundIndex
   * @param {InstancedMesh} grassInstancedMesh
   * @param {InstancedMesh} flowersInstancedMesh
   */
  setInstanceMatrices(groundIndex, grassInstancedMesh, flowersInstancedMesh) {
    let i = 0;
    while (i < grassInstancedMesh.count) {
      // for (let i = 0; i < grassInstancedMesh.count; i++) {
      grassInstancedMesh.setMatrixAt(i, this.curveTexturesMatrices.get(groundIndex)[i]);
      grassInstancedMesh.setColorAt(
        i,
        this.grassColor[MathUtils.randInt(0, this.grassColor.length - 1)]
      );
      i++;
    }

    i = 0;
    while (i < flowersInstancedMesh.count) {
      // for (let i = 0; i < flowersInstancedMesh.count; i++) {
      flowersInstancedMesh.setMatrixAt(
        i,
        this.curveTexturesMatrices.get(groundIndex)[i + grassInstancedMesh.count]
      );
      flowersInstancedMesh.setColorAt(
        i,
        this.flowersColors[MathUtils.randInt(0, this.flowersColors.length - 1)]
      );
      i++;
    }

    grassInstancedMesh.instanceMatrix.needsUpdate = true;
    flowersInstancedMesh.instanceMatrix.needsUpdate = true;
    // grassInstancedMesh.updateMatrix();
    // flowersInstancedMesh.updateMatrix();
  }
}
