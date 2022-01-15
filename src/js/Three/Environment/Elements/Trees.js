import * as THREE from "three";
import { guiFolders } from "@js/utils/Debug";
import { modelsMap } from "../../../utils/assets";
import raf from "../../../utils/Raf";
import commonVertexShader from "@glsl/tree/trunk/commonVertex.glsl";
import beginVertexShader from "@glsl/tree/trunk/beginVertex.glsl";
import commonFragmentShader from "@glsl/tree/trunk/commonFragment.glsl";
import outputFragmentShader from "@glsl/tree/trunk/outputFragment.glsl";

import commonVertexShaderLeaf from "@glsl/tree/leaf/commonVertex.glsl";
import projectVertexShaderLeaf from "@glsl/tree/leaf/projectVertex.glsl";
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
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#d1e997") },
      uColor2: { value: new THREE.Color("#4a9e36") },
      uDisplaceIntensity: { value: 0.25 },
      uSpeed: { value: 1.2 },
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
    let simplex = new SimplexNoise();
    let noise2D;

    const instanceNumber = 1000;
    const instance = new THREE.Object3D();

    this.geometry = new THREE.PlaneGeometry(0.25, 0.25, 1, 4);

    this.leafsPattern = new THREE.InstancedMesh(
      this.geometry,
      this.materialLeaf,
      instanceNumber
    );

    this.leafsPattern.matrixAutoUpdate = false;
    this.leafsPattern.updateMatrix();

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
      this.leafsPattern.setMatrixAt(i, instance.matrix);
    }

    const leafs = new THREE.Group();
    leafs.add(this.leafsPattern);

    leafs.scale.set(8, 8, 8);
    leafs.position.set(13.883822441101074, 75, -26.477598190307617);

    const leafs2 = leafs.clone();
    leafs2.position.set(6.021400451660156, 56.60111999511719, 9.720206260681152);
    const leafs3 = leafs.clone();
    leafs3.position.set(-13.538918495178223, 56.0611457824707, 18.083316802978516);
    const leafs4 = leafs.clone();
    leafs4.position.set(-28.79485511779785, 57.274925231933594, 4.6373291015625);
    const leafs5 = leafs.clone();
    leafs5.position.set(29.977325439453125, 51.851558685302734, -34.322364807128906);
    const leafs6 = leafs.clone();
    leafs6.position.set(-11.098029136657715, 62.07094955444336, 5.341279029846191);
    const leafs7 = leafs.clone();
    leafs7.position.set(-6.821478843688965, 61.90618896484375, -2.9381091594696045);
    const leafs8 = leafs.clone();
    leafs8.position.set(8.947877883911133, 55.19361877441406, 15.726387023925781);
    const leafs9 = leafs.clone();
    leafs9.position.set(13.598841667175293, 45.93263626098633, -12.688941955566406);

    const trunk1 = modelsMap.get("trees")[0].clone();
    trunk1.children[0].material = this.material;

    const trunk2 = modelsMap.get("trees")[1].clone();
    trunk2.children[0].material = this.material;

    console.log(trunk2.children[0].name);

    const tree1 = new THREE.Group();
    tree1.add(trunk1, leafs, leafs2, leafs3, leafs4, leafs5, leafs6);
    tree1.position.set(positions[0].x, -3.5, positions[0].y);
    tree1.scale.set(0.2, 0.2, 0.2);
    tree1.matrixAutoUpdate = false;
    tree1.updateMatrix();

    const tree2 = new THREE.Group();
    tree2.add(trunk2, leafs7, leafs8, leafs9);
    tree2.position.set(positions[1].x, -3.5, positions[1].y);
    tree2.scale.set(0.2, 0.2, 0.2);
    tree2.matrixAutoUpdate = false;
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
    raf.subscribe("Tree", this.update.bind(this));
  }

  update() {
    this.leafUniforms.uTime.value = raf.elapsedTime;
    // this.group.rotation.x = raf.elapsedTime * 0.5;
  }
}
