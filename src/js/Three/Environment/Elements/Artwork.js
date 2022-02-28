import outerBeginVertexShader from "@glsl/artworks/outer/beginVertex.glsl";
import outerCommonFragmentShader from "@glsl/artworks/outer/commonFragment.glsl";
import outerCommonVertexShader from "@glsl/artworks/outer/commonVertex.glsl";
import outerOutputFragmentShader from "@glsl/artworks/outer/outputFragment.glsl";
import innerBeginVertexShader from "@glsl/artworks/inner/beginVertex.glsl";
import innerCommonFragmentShader from "@glsl/artworks/inner/commonFragment.glsl";
import innerCommonVertexShader from "@glsl/artworks/inner/commonVertex.glsl";
import innerOutputFragmentShader from "@glsl/artworks/inner/outputFragment.glsl";
import { customFogUniforms } from "@js/utils/misc";
import gsap from "gsap";
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
import { texturesMap } from "../../../utils/assets";

export class Artwork extends Group {
  static materialInner;
  static materialOuter;
  static artworkContentTitle = document.querySelector(".content-artwork_titles .title");
  static artworkContentSubtitle = document.querySelector(
    ".content-artwork_titles .subtitle"
  );
  static artworkFooterTitle = document.querySelector(".content-artwork_footer .title");
  static artworkFooterSubtitle = document.querySelector(
    ".content-artwork_footer .author"
  );
  // static contentArtworkFooterTween = gsap
  //   .to(".content-artwork_footer", {
  //     duration: 1,
  //     opacity: 1,
  //     delay: 1,
  //   })
  //   .pause();

  // static contentArtworkFooterTweenOut = gsap
  //   .to(".content-artwork_footer", {
  //     duration: 1,
  //     opacity: 0,
  //   })
  //   .pause();

  static contentArtworkTitlesTween = gsap
    .to(".content-artwork_titles", {
      duration: 0.5,
      opacity: 1,
    })
    .pause();

  constructor(details, position) {
    super();
    this.details = details;

    this.artworkUniformsOuter = {
      uTime: { value: 0 },
      uColor: { value: new Color("#180c04") },
      uColor2: { value: new Color("#f8c270") },
      uNoiseTexture: { value: texturesMap.get("noiseTexture")[0] },
      uProgress: { value: 0 },
    };

    this.artworkMaterialOuter = new MeshToonMaterial({
      side: DoubleSide,
      transparent: true,
    });
    this.artworkMaterialOuter.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        ...this.artworkUniformsOuter,
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

    this.artworkUniformsInner = {
      uTime: { value: 0 },
      uNoiseTexture: { value: texturesMap.get("noiseTexture")[0] },
      uProgress: { value: 0 },
    };

    this.artworkMaterialInner = new MeshBasicMaterial();

    this.artworkMaterialInner.onBeforeCompile = (shader) => {
      shader.uniforms = {
        uTexture: { value: details.texture },
        ...shader.uniforms,
        ...this.artworkUniformsInner,
        ...customFogUniforms,
      };
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        innerCommonFragmentShader
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        innerOutputFragmentShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        innerBeginVertexShader
      );
    };
    this.artworkGeometryOuter = new BoxGeometry();
    this.artworkGeometryInner = new PlaneGeometry();

    const scaleFactor = details.dimensions[0] > details.dimensions[1] ? 3.4 : 2.4;
    this.outerMesh = new Mesh(this.artworkGeometryOuter, this.artworkMaterialOuter);
    this.outerMesh.scale.set(
      scaleFactor,
      (details.dimensions[1] * scaleFactor) / details.dimensions[0],
      0.3
    );

    this.innerMesh = new Mesh(this.artworkGeometryInner, this.artworkMaterialInner);
    this.innerMesh.scale.set(
      scaleFactor - 0.1,
      (details.dimensions[1] * scaleFactor - 0.1) / details.dimensions[0],
      3
    );
    this.innerMesh.position.z = -0.14;

    this.position.set(position.x, position.y, position.z);

    this.outerMesh.matrixAutoUpdate = false;
    this.innerMesh.matrixAutoUpdate = false;
    this.outerMesh.updateMatrix();
    this.innerMesh.updateMatrix();
    this.add(this.innerMesh, this.outerMesh);

    // Hover animation
    this.hoverTimeline = gsap
      .timeline({ paused: true })
      .to(this.artworkUniformsOuter.uProgress, { duration: 1, value: 1 }, 0)
      .to(this.artworkUniformsInner.uProgress, { duration: 1, value: 1 }, 0);
  }

  updateDom() {
    Artwork.artworkContentTitle.innerHTML = Artwork.artworkFooterTitle.innerHTML =
      this.details.title;
    Artwork.artworkContentSubtitle.innerHTML = Artwork.artworkFooterSubtitle.innerHTML =
      this.details.author + " - " + this.details.year;
  }
}
