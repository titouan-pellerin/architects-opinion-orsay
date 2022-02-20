import outerBeginVertexShader from "@glsl/artworks/outer/beginVertex.glsl";
import outerCommonFragmentShader from "@glsl/artworks/outer/commonFragment.glsl";
import outerCommonVertexShader from "@glsl/artworks/outer/commonVertex.glsl";
import outerOutputFragmentShader from "@glsl/artworks/outer/outputFragment.glsl";
import { customFogUniforms } from "@js/utils/misc";
import {
  BoxGeometry,
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshToonMaterial,
  PlaneGeometry,
} from "three";

export class Artwork extends Group {
  /**
   *
   * @param {Texture} texture
   * @param {Vector3} position
   */
  static materialInner;
  static materialOuter;
  constructor(texture, position) {
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
      shader.uniforms = {
        ...shader.uniforms,
        ...this.artworkUniforms,
        ...customFogUniforms,
      };
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        outerCommonFragmentShader
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        outerOutputFragmentShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        outerCommonVertexShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        outerBeginVertexShader
      );
    };

    this.artworkMaterialInner = new MeshBasicMaterial({
      map: texture,
    });

    this.artworkMaterialInner.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        ...this.artworkUniforms,
        ...customFogUniforms,
      };
    };
    this.artworkGeometryOuter = new BoxGeometry();
    this.artworkGeometryInner = new PlaneGeometry();

    this.outerMesh = new Mesh(this.artworkGeometryOuter, this.artworkMaterialOuter);
    this.outerMesh.scale.set(
      2.4,
      (texture.userData.dimensions[1] * 2.4) / texture.userData.dimensions[0],
      0.65
    );

    this.innerMesh = new Mesh(this.artworkGeometryInner, this.artworkMaterialInner);
    this.innerMesh.scale.set(
      2.3,
      (texture.userData.dimensions[1] * 2.3) / texture.userData.dimensions[0],
      3
    );
    this.innerMesh.position.z = -0.3;

    this.position.set(position.x, position.y, position.z);

    this.outerMesh.matrixAutoUpdate = false;
    this.innerMesh.matrixAutoUpdate = false;
    this.outerMesh.updateMatrix();
    this.innerMesh.updateMatrix();
    this.add(this.innerMesh, this.outerMesh);
  }
}
