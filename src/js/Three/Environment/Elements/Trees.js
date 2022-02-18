import commonFragmentShaderLeaf from "@glsl/tree/leaf/commonFragment.glsl";
import commonVertexShaderLeaf from "@glsl/tree/leaf/commonVertex.glsl";
import outputFragmentShaderLeaf from "@glsl/tree/leaf/outputFragment.glsl";
import projectVertexShaderLeaf from "@glsl/tree/leaf/projectVertex.glsl";
import beginVertexShader from "@glsl/tree/trunk/beginVertex.glsl";
import commonFragmentShader from "@glsl/tree/trunk/commonFragment.glsl";
import commonVertexShader from "@glsl/tree/trunk/commonVertex.glsl";
import outputFragmentShader from "@glsl/tree/trunk/outputFragment.glsl";
import { guiFolders } from "@js/utils/Debug";
import {
  Color,
  DoubleSide,
  Group,
  InstancedMesh,
  MathUtils,
  Mesh,
  MeshToonMaterial,
  Object3D,
  PlaneGeometry,
  SphereGeometry,
} from "three";
import { modelsMap } from "../../../utils/assets";
import { simplex } from "../../../utils/misc";

export class Trees extends Group {
  constructor(positions = [], leafUniforms) {
    super();
    this.leafUniforms = leafUniforms;

    this.spheresToRaycast = [];

    this.trunkUniforms = {
      uColor: { value: new Color("#180c04") },
      uColor2: { value: new Color("#f8c270") },
    };

    const sceneFolder = guiFolders.get("scene");
    const treeFolder = sceneFolder.addFolder("Tree");
    const trunkFolder = treeFolder.addFolder("trunk");
    trunkFolder.addColor(this.trunkUniforms.uColor, "value").name("Color1");
    trunkFolder.addColor(this.trunkUniforms.uColor2, "value").name("Color2");
    const leafFolder = treeFolder.addFolder("leaf");
    leafFolder.addColor(this.leafUniforms.uColor, "value").name("Color1");

    this.material = new MeshToonMaterial();
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

    let noise2D;

    const instanceNumber = 500;
    const instance = new Object3D();

    this.geometry = new PlaneGeometry(0.325, 0.325, 1, 1);

    const leafColors = [new Color("#eeff99"), new Color("#ccff99"), new Color("#eeffaa")];

    const materialLeaf = new MeshToonMaterial({ side: DoubleSide });
    materialLeaf.onBeforeCompile = (shader) => {
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

    this.leavesPattern = new InstancedMesh(this.geometry, materialLeaf, instanceNumber);

    this.leavesPattern.matrixAutoUpdate = false;
    this.leavesPattern.updateMatrix();

    const radius = 3;

    for (let i = 0; i < instanceNumber; i++) {
      const angle = Math.random() * Math.PI * 2;
      const angleHeight = noise2D * Math.PI;
      noise2D = simplex.noise2D(angleHeight, Math.random());

      instance.position.set(
        radius *
          Math.cos(angle * noise2D * 2) *
          noise2D *
          2 *
          Math.sin(angleHeight) *
          Math.cos(noise2D * 2),
        radius *
          Math.sin(angle * noise2D * 2) *
          noise2D *
          2 *
          Math.sin(angleHeight) *
          Math.cos(noise2D * 2),
        radius * Math.cos(angleHeight) * noise2D * 2 * Math.sin(angleHeight * 2)
      );
      instance.rotation.set(
        radius *
          Math.cos(angle * noise2D * 2) *
          noise2D *
          2 *
          Math.sin(angleHeight) *
          Math.cos(noise2D * 2),
        radius *
          Math.sin(angle * noise2D * 2) *
          noise2D *
          2 *
          Math.sin(angleHeight) *
          Math.cos(noise2D * 2),
        radius *
          Math.sin(angle * noise2D * 2) *
          noise2D *
          2 *
          Math.sin(angleHeight) *
          Math.cos(noise2D * 2)
      );

      instance.scale.set(noise2D * 2, noise2D * 2, noise2D * 2);
      instance.updateMatrix();
      this.leavesPattern.setMatrixAt(i, instance.matrix);
      this.leavesPattern.setColorAt(
        i,
        leafColors[MathUtils.randInt(0, leafColors.length - 1)]
      );
    }

    const leaves = new Group();
    leaves.add(this.leavesPattern);

    leaves.scale.setScalar(8);
    leaves.position.set(-3.85, 46.53, 9.81);
    const sphereToRaycast = new Mesh(new SphereGeometry(1, 8, 4));
    sphereToRaycast.scale.setScalar(15);
    sphereToRaycast.position.copy(leaves.position);
    sphereToRaycast.visible = false;

    const leaves2 = leaves.clone();
    leaves2.position.set(-3.014, 63.6, -0.32);
    const sphereToRaycast2 = sphereToRaycast.clone();
    sphereToRaycast2.position.copy(leaves2.position);

    const leaves3 = leaves.clone();

    leaves3.position.set(4.61, 48.24, -13.37);
    const sphereToRaycast3 = sphereToRaycast.clone();
    sphereToRaycast3.position.copy(leaves3.position);

    const leaves4 = leaves.clone();
    leaves4.position.set(28.92, 51.7, -11.41);
    const sphereToRaycast4 = sphereToRaycast.clone();
    sphereToRaycast4.position.copy(leaves4.position);

    const leaves5 = leaves.clone();
    leaves5.position.set(9.59, 68.83, -4.69);
    const sphereToRaycast5 = sphereToRaycast.clone();
    sphereToRaycast5.position.copy(leaves5.position);

    const leaves6 = leaves.clone();
    leaves6.position.set(13.89, 73.02, -23.35);
    const sphereToRaycast6 = sphereToRaycast.clone();
    sphereToRaycast6.position.copy(leaves6.position);

    const leaves7 = leaves.clone();
    leaves7.position.set(7.96, 55.73, 14.13);
    const sphereToRaycast7 = sphereToRaycast.clone();
    sphereToRaycast7.position.copy(leaves7.position);

    const leaves8 = leaves.clone();
    leaves8.position.set(-28.89, 56.82, 7.39);
    const sphereToRaycast8 = sphereToRaycast.clone();
    sphereToRaycast8.position.copy(leaves8.position);

    const leaves9 = leaves.clone();
    leaves9.position.set(30.26, 51.28, -30.93);
    const sphereToRaycast9 = sphereToRaycast.clone();
    sphereToRaycast9.position.copy(leaves9.position);

    const leaves10 = leaves.clone();
    leaves10.position.set(-10.41, 61.12, 8.93);
    const sphereToRaycast10 = sphereToRaycast.clone();
    sphereToRaycast10.position.copy(leaves10.position);

    const leaves11 = leaves.clone();
    leaves11.position.set(-11.83, 55.96, 21.94);
    const sphereToRaycast11 = sphereToRaycast.clone();
    sphereToRaycast11.position.copy(leaves11.position);

    const trunk1 = modelsMap.get("trees")[0].clone();
    trunk1.children[0].material = this.material;

    const trunk2 = modelsMap.get("trees")[1].clone();
    trunk2.children[0].material = this.material;

    const tree1 = new Group();
    tree1.add(trunk1, leaves, leaves2, leaves3, leaves4, leaves5);
    const spheresToRaycast1 = [
      sphereToRaycast,
      sphereToRaycast2,
      sphereToRaycast3,
      sphereToRaycast4,
      sphereToRaycast5,
    ];
    tree1.add(...spheresToRaycast1);
    tree1.matrixAutoUpdate = false;

    const tree2 = new Group();
    tree2.add(trunk2, leaves6, leaves7, leaves8, leaves9, leaves10, leaves11);
    const spheresToRaycast2 = [
      sphereToRaycast6,
      sphereToRaycast7,
      sphereToRaycast8,
      sphereToRaycast9,
      sphereToRaycast10,
      sphereToRaycast11,
    ];
    tree2.add(...spheresToRaycast2);
    tree2.matrixAutoUpdate = false;

    for (let i = 0; i < positions.length; i++) {
      const newTree = i % 2 === 0 ? tree1.clone() : tree2.clone();

      newTree.position.set(positions[i].x, -3.5, positions[i].y);
      newTree.rotation.set(
        (Math.random() - 0.5) * 0.1 * Math.PI * 2,
        Math.random() * Math.PI * 2,
        0
      );
      const randomScale = Math.random() * (0.2 - 0.08) + 0.08;
      newTree.scale.set(randomScale, randomScale, randomScale);

      newTree.updateMatrix();
      newTree.updateMatrixWorld();
      this.add(newTree);

      this.spheresToRaycast.push(
        ...newTree.children.filter((child) => child.geometry instanceof SphereGeometry)
      );
    }
  }
  createMaterial() {
    const materialLeaf = new MeshToonMaterial({ side: DoubleSide });
    materialLeaf.onBeforeCompile = (shader) => {
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
    return materialLeaf;
  }
}
