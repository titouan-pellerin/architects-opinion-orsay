import commonFragmentShaderLeaf from "@glsl/tree/leaf/commonFragment.glsl";
import commonVertexShaderLeaf from "@glsl/tree/leaf/commonVertex.glsl";
import outputFragmentShaderLeaf from "@glsl/tree/leaf/outputFragment.glsl";
import projectVertexShaderLeaf from "@glsl/tree/leaf/projectVertex.glsl";
import beginVertexShader from "@glsl/tree/trunk/beginVertex.glsl";
import commonFragmentShader from "@glsl/tree/trunk/commonFragment.glsl";
import commonVertexShader from "@glsl/tree/trunk/commonVertex.glsl";
import outputFragmentShader from "@glsl/tree/trunk/outputFragment.glsl";
import { guiFolders } from "@js/utils/Debug";
import * as THREE from "three";
import { modelsMap } from "../../../utils/assets";
import { simplex } from "../../../utils/misc";
import raf from "../../../utils/Raf";

export class Trees extends THREE.Group {
  constructor(positions = [], leafUniforms) {
    super();
    this.leafUniforms = leafUniforms;

    this.trunkUniforms = {
      uColor: { value: new THREE.Color("#180c04") },
      uColor2: { value: new THREE.Color("#f8c270") },
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

    this.materialLeaf = new THREE.MeshToonMaterial({
      side: THREE.DoubleSide,
    });
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
        "#include <project_vertex>",
        projectVertexShaderLeaf
      );
    };

    // initializing a new simplex instance
    // do this only once as it is relatively expensive
    let noise2D;

    const instanceNumber = 1000;
    const instance = new THREE.Object3D();

    this.geometry = new THREE.PlaneGeometry(0.25, 0.25, 1, 4);

    this.leavesPattern = new THREE.InstancedMesh(
      this.geometry,
      this.materialLeaf,
      instanceNumber
    );

    this.leavesPattern.matrixAutoUpdate = false;
    this.leavesPattern.updateMatrix();

    const radius = 3;

    for (let i = 0; i < instanceNumber; i++) {
      const angle = Math.random() * Math.PI * 2;
      const angleHeight = noise2D * Math.PI;
      noise2D = simplex.noise2D(angleHeight, Math.random());

      instance.position.set(
        radius *
          Math.cos(angle * noise2D * 50) *
          noise2D *
          1 *
          Math.sin(angleHeight) *
          Math.cos(noise2D),
        radius *
          Math.sin(angle * noise2D * 50) *
          noise2D *
          1 *
          Math.sin(angleHeight) *
          Math.cos(noise2D),
        radius * Math.cos(angleHeight) * noise2D * 1 * Math.sin(angleHeight * 50)
      );
      instance.rotation.set(
        radius *
          Math.cos(angle * noise2D * 50) *
          noise2D *
          1 *
          Math.sin(angleHeight) *
          Math.cos(noise2D),
        radius *
          Math.sin(angle * noise2D * 50) *
          noise2D *
          1 *
          Math.sin(angleHeight) *
          Math.cos(noise2D),
        radius * Math.cos(angleHeight) * noise2D * 1 * Math.sin(angleHeight * 50)
      );
      instance.updateMatrix();
      this.leavesPattern.setMatrixAt(i, instance.matrix);
    }

    const leaves = new THREE.Group();
    leaves.add(this.leavesPattern);

    leaves.scale.set(8, 8, 8);
    leaves.position.set(-3.85, 46.53, 9.81);

    const leaves2 = leaves.clone();
    leaves2.position.set(-3.014, 63.6, -0.32);
    const leaves3 = leaves.clone();
    leaves3.position.set(4.61, 48.24, -13.37);
    const leaves4 = leaves.clone();
    leaves4.position.set(28.92, 51.7, -11.41);
    const leaves5 = leaves.clone();
    leaves5.position.set(9.59, 68.83, -4.69);

    const leaves6 = leaves.clone();
    leaves6.position.set(13.89, 73.02, -23.35);
    const leaves7 = leaves.clone();
    leaves7.position.set(7.96, 55.73, 14.13);
    const leaves8 = leaves.clone();
    leaves8.position.set(-28.89, 56.82, 7.39);
    const leaves9 = leaves.clone();
    leaves9.position.set(30.26, 51.28, -30.93);
    const leaves10 = leaves.clone();
    leaves10.position.set(-10.41, 61.12, 8.93);
    const leaves11 = leaves.clone();
    leaves11.position.set(-11.83, 55.96, 21.94);

    const trunk1 = modelsMap.get("trees")[0].clone();
    trunk1.children[0].material = this.material;

    const trunk2 = modelsMap.get("trees")[1].clone();
    trunk2.children[0].material = this.material;

    const tree1 = new THREE.Group();
    tree1.add(trunk1, leaves, leaves2, leaves3, leaves4, leaves5);
    tree1.matrixAutoUpdate = false;

    const tree2 = new THREE.Group();
    tree2.add(trunk2, leaves6, leaves7, leaves8, leaves9, leaves10, leaves11);
    tree2.matrixAutoUpdate = false;

    for (let i = 0; i < positions.length; i++) {
      const newTree = i % 2 === 0 ? tree1.clone() : tree2.clone();

      newTree.position.set(positions[i].x, -3.5, positions[i].y);
      newTree.rotation.set(
        (Math.random() - 0.5) * 0.1 * Math.PI,
        Math.random() * Math.PI,
        (Math.random() - 0.5) * 0.1 * Math.PI
      );
      const randomScale = Math.random() * (0.2 - 0.08) + 0.08;
      newTree.scale.set(randomScale, randomScale, randomScale);
      newTree.updateMatrix();
      // this.add(newTree);
    }
    raf.subscribe("Tree", this.update.bind(this));
  }

  update() {
    this.leafUniforms.uTime.value = raf.elapsedTime;
    // this.group.rotation.x = raf.elapsedTime * 0.5;
  }
}
