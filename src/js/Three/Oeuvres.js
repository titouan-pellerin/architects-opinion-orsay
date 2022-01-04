import outerCommonFragmentShader from "../../glsl/grass/commonFragment.glsl";
import outerCommonVertexShader from "../../glsl/grass/commonVertex.glsl";
import innerCommonFragmentShader from "../../glsl/oeuvres/commonFragment.glsl";
import innerCommonVertexShader from "../../glsl/oeuvres/commonVertex.glsl";
import outputFragmentShader from "../../glsl/rock/outputFragment.glsl";
import projectVertexShader from "../../glsl/rock/projectVertex.glsl";
import { guiFolders } from "../utils/Debug";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import { CustomMeshToonMaterial } from "./CustomMeshToonMaterial";
import * as THREE from "three";
import { DoubleSide } from "three";
import { texturesMap } from "../utils/assets";

export class Oeuvres {
  constructor() {
    this.rockUniforms = {
      uColor: { value: new THREE.Color("#949c90") },
      uColor2: { value: new THREE.Color("#236760") },
    };

    // this.material2 = new CustomMeshToonMaterial(
    //   innerCommonFragmentShader,
    //   outputFragmentShader,
    //   innerCommonVertexShader,
    //   null,
    //   projectVertexShader,
    //   this.rockUniforms,
    //   { side: DoubleSide, 
    //     map: texturesMap.get("oeuvreTexture")[0] },
    // );
    this.material = new THREE.MeshStandardMaterial({
    })

    const folder = guiFolders.get("scene").addFolder("Rock");
    folder.addColor(this.rockUniforms.uColor, "value").name("Color");
    folder.addColor(this.rockUniforms.uColor2, "value").name("Color2");

    this.geometry = new THREE.PlaneGeometry();

    const oeuvre1 = () => {
      this.materialOeuvre = new THREE.MeshBasicMaterial({
        map: texturesMap.get("oeuvreTexture")[0],
      })

      this.outerMesh = new THREE.Mesh( this.geometry, this.material );
      this.outerMesh.scale.set(1 * 2.75, 1.0198 * 2.75, 1 * 2.75);

      this.innerMesh = new THREE.Mesh( this.geometry, this.materialOeuvre );
      this.innerMesh.scale.set(1 * 2.35, 1.0198 * 2.35, 1 * 2.35);
      this.innerMesh.position.z = 0.001    

      this.oeuvre = new THREE.Group();
      this.oeuvre.add(this.innerMesh, this.outerMesh)
      this.oeuvre.scale.set(0.85, 0.85, 0.85)
      this.oeuvre.position.y = -1.5;

      setTimeout(() => {
        this.outerMesh.matrixAutoUpdate = false;
        this.innerMesh.matrixAutoUpdate = false;
      }, 1);
    }
    oeuvre1()

    const oeuvre2 = () => {
      this.materialOeuvre = new THREE.MeshBasicMaterial({
        map: texturesMap.get("oeuvre2Texture")[0],
      })

      this.outerMesh = new THREE.Mesh( this.geometry, this.material );
      this.outerMesh.scale.set(1 * 2.75, 1.26 * 2.75, 1 * 2.75);

      this.innerMesh = new THREE.Mesh( this.geometry, this.materialOeuvre );
      this.innerMesh.scale.set(1 * 2.35, 1.26 * 2.35, 1 * 2.35);
      this.innerMesh.position.z = 0.001    

      this.oeuvre2 = new THREE.Group();
      this.oeuvre2.add(this.innerMesh, this.outerMesh)
      this.oeuvre2.scale.set(0.85, 0.85, 0.85)
      this.oeuvre2.position.y = -1.5;
      this.oeuvre2.position.x = 5;

      setTimeout(() => {
        this.outerMesh.matrixAutoUpdate = false;
        this.innerMesh.matrixAutoUpdate = false;
      }, 1);
    }
    oeuvre2()

  }
}
