import beginVertexShader from "@glsl/artworks/beginVertex.glsl";
import commonFragmentShader from "@glsl/artworks/commonFragment.glsl";
import commonVertexShader from "@glsl/artworks/commonVertex.glsl";
import outputFragmentShader from "@glsl/artworks/outputFragment.glsl";
import {
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshToonMaterial,
  PlaneGeometry,
  BoxGeometry,
  Color,
} from "three";
import { mainScene } from "../../MainScene";

export class Artwork extends Group {
  constructor(texture, position, envScale) {
    super();

    this.artworkUniforms = {
      uColor: { value: new Color("#180c04") },
      uColor2: { value: new Color("#f8c270") },
    };

    this.artworkMaterialOuter = new MeshToonMaterial({
      side: DoubleSide,
      transparent: true,
    });

    this.artworkMaterialOuter.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...this.artworkUniforms };
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

    this.artworkMaterialInner = new MeshBasicMaterial({
      map: texture,
    });
    this.artworkGeometryOuter = new BoxGeometry();
    this.artworkGeometryInner = new PlaneGeometry();

    this.outerMesh = new Mesh(this.artworkGeometryOuter, this.artworkMaterialOuter);
    this.outerMesh.scale.set(3.3, (texture.image.height * 3.3) / texture.image.width, 1);

    this.innerMesh = new Mesh(this.artworkGeometryInner, this.artworkMaterialInner);
    this.innerMesh.scale.set(3, (texture.image.height * 3) / texture.image.width, 3);
    this.innerMesh.position.z = 0;

    this.position.set(position.x * envScale, position.y, position.z * envScale);

    this.outerMesh.matrixAutoUpdate = false;
    this.innerMesh.matrixAutoUpdate = false;
    this.outerMesh.updateMatrix();
    this.innerMesh.updateMatrix();
    // this.add(this.innerMesh, this.outerMesh);
    mainScene.add(this.innerMesh, this.outerMesh);
    console.log(mainScene);
  }
}
