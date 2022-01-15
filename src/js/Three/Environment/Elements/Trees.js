import * as THREE from "three";
import { guiFolders } from "@js/utils/Debug";
import { modelsMap } from "../../../utils/assets";
import raf from "../../../utils/Raf";
import commonVertexShader from "@glsl/tree/trunk/commonVertex.glsl";
import beginVertexShader from "@glsl/tree/trunk/beginVertex.glsl";
import commonFragmentShader from "@glsl/tree/trunk/commonFragment.glsl";
import outputFragmentShader from "@glsl/tree/trunk/outputFragment.glsl";

import commonVertexShaderLeaf from "@glsl/tree/leaf/commonVertex.glsl";
import beginVertexShaderLeaf from "@glsl/tree/leaf/beginVertex.glsl";
import commonFragmentShaderLeaf from "@glsl/tree/leaf/commonFragment.glsl";
import outputFragmentShaderLeaf from "@glsl/tree/leaf/outputFragment.glsl";
import { mainScene } from "../../MainScene";
import SimplexNoise from "simplex-noise";

export class Trees extends THREE.Group {
  constructor(positions = []) {
    super();

    this.trunkUniforms = {
      uColor: { value: new THREE.Color("#180c04") },
      uColor2: { value: new THREE.Color("#f8c270") },
    };

    this.leafUniforms = {
      uColor: { value: new THREE.Color("#d1e997") },
      uColor2: { value: new THREE.Color("#4a9e36") },
    };

    const sceneFolder = guiFolders.get("scene");
    const treeFolder = sceneFolder.addFolder("Tree");
    const trunkFolder = treeFolder.addFolder("trunk");
    trunkFolder.addColor(this.trunkUniforms.uColor, "value").name("Color1");
    trunkFolder.addColor(this.trunkUniforms.uColor2, "value").name("Color2");
    const leafFolder = treeFolder.addFolder("leaf");
    leafFolder.addColor(this.leafUniforms.uColor, "value").name("Color1");
    leafFolder.addColor(this.leafUniforms.uColor2, "value").name("Color2");

    this.material = new THREE.MeshToonMaterial();
    this.material.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...this.trunkUniforms };
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
        "#include <begin_vertex>",
        beginVertexShader
      );
    };

    this.materialLeaf = new THREE.MeshToonMaterial();
    this.materialLeaf.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...this.leafUniforms };
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        commonFragmentShaderLeaf
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        outputFragmentShaderLeaf
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        commonVertexShaderLeaf
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        beginVertexShaderLeaf
      );
    };

    // initializing a new simplex instance
    // do this only once as it is relatively expensive
    let simplex = new SimplexNoise();
    let value3d;

    const instanceNumber = 50000;
    const instance = new THREE.Object3D();

    this.geometry = new THREE.PlaneGeometry(0.5, 0.5, 1, 4);

    this.grassPattern = new THREE.InstancedMesh(
      this.geometry,
      this.materialLeaf,
      instanceNumber
    );

    this.grassPattern.matrixAutoUpdate = false;
    this.grassPattern.updateMatrix();

    for (let i = 0; i < instanceNumber; i++) {
      value3d = simplex.noise3D(Math.random * 5, Math.random * 5, Math.random * 5);

      instance.position.set(Math.random() * 10, Math.random() * 10, Math.random() * 10);
      instance.rotation.set(Math.random() * 10, Math.random() * 10, Math.random() * 10);
      // instance.rotation.set(Math.random(), Math.random(), Math.random());

      instance.updateMatrix();
      this.grassPattern.setMatrixAt(i, instance.matrix);
    }

    this.group = new THREE.Group();
    this.group.position.z = -20;
    this.group.add(this.grassPattern);

    mainScene.add(this.group);

    const tree1 = modelsMap.get("trees")[0];
    const tree2 = modelsMap.get("trees")[1];
    tree1.scale.set(0.2, 0.2, 0.2);
    tree2.scale.set(0.2, 0.2, 0.2);

    tree1.children[0].material = this.material;
    // tree1.children[1].material = this.materialLeaf;
    tree2.children[0].material = this.material;
    // tree2.children[1].material = this.materialLeaf;

    tree1.matrixAutoUpdate = false;
    tree2.matrixAutoUpdate = false;

    tree1.position.set(positions[0].x, -3.5, positions[0].y);
    tree2.position.set(positions[1].x, -3.5, positions[1].y);
    tree1.updateMatrix();
    tree2.updateMatrix();
    this.add(tree1, tree2);

    for (let i = 2; i < positions.length; i++) {
      const newTree = i % 2 === 0 ? tree1.clone() : tree2.clone();

      newTree.position.set(positions[i].x, -3.5, positions[i].y);
      newTree.rotation.set(
        (Math.random() - 0.5) * 0.2 * Math.PI,
        Math.random() * Math.PI,
        (Math.random() - 0.5) * 0.2 * Math.PI
      );
      const randomScale = Math.random() * (0.2 - 0.06) + 0.06;
      newTree.scale.set(randomScale, randomScale, randomScale);
      newTree.updateMatrix();
      this.add(newTree);
    }
  }
}
