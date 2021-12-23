import beginFragmentShader from "../../glsl/grass/beginFragment.glsl";
import beginVertexShader from "../../glsl/grass/beginVertex.glsl";
import voidFragmentShader from "../../glsl/grass/voidFragment.glsl";
import voidVertexShader from "../../glsl/grass/voidVertex.glsl";
import { guiFolders } from "../utils/Debug";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export class TreeInstancedMesh {
  constructor() {
    this.parameters = {
      uTime: { value: 0 },
      color: new THREE.Color("#84b15a"),
      color2: new THREE.Color("#236760"),
      displaceIntensity: 0.135,
      grassQuantity: 150,
      speed: 1,
    };

    this.material = new THREE.MeshToonMaterial({
      transparent: true,
    });

    raf.subscribe("Grass", this.update.bind(this));
  }

  update() {
    // this.parameters.uTime.value = raf.elapsedTime;
  }
}
