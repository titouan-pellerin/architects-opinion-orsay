import outerBeginVertexShader from "@glsl/artworks/outer/beginVertex.glsl";
import outerCommonFragmentShader from "@glsl/artworks/outer/commonFragment.glsl";
import outerCommonVertexShader from "@glsl/artworks/outer/commonVertex.glsl";
import outerOutputFragmentShader from "@glsl/artworks/outer/outputFragment.glsl";
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
  static contentArtworkFooterTween = gsap
    .to(".content-artwork_footer", {
      duration: 0.4,
      opacity: 1,
    })
    .pause();

  static contentArtworkTitlesTween = gsap
    .to(".content-artwork_titles", {
      duration: 0.4,
      opacity: 1,
    })
    .pause();

  static chockwaveAnimation = gsap
    .timeline({ paused: true })
    .to(customFogUniforms.transitionIsIn, {
      duration: 0,
      value: 2,
    })
    .to(customFogUniforms.progress, { duration: 2.25, value: 1.15 })
    .to(customFogUniforms.transitionIsIn, {
      duration: 0,
      value: 3,
      delay: -1.25,
    })
    .to(customFogUniforms.progress, {
      duration: 0,
      value: -0.1,
      delay: -1.25,
    })
    .to(customFogUniforms.progress, {
      duration: 2.25,
      value: 1.15,
      delay: -1.25,
    })
    .to(customFogUniforms.transitionIsIn, { duration: 0, value: 0 })
    .to(customFogUniforms.progress, { duration: 0, value: -0.1 });

  constructor(details, position) {
    super();
    this.details = details;

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

    // this.overrideFogUniforms = {
    //   progress: { value: 0 },
    // };

    this.artworkMaterialInner = new MeshBasicMaterial();

    this.artworkMaterialInner.onBeforeCompile = (shader) => {
      shader.uniforms = {
        uTexture: { value: details.texture },
        ...shader.uniforms,
        // ...this.overrideFogUniforms,
        ...customFogUniforms,
      };
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `#include <common>
        uniform sampler2D uTexture;`
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        `#include <output_fragment>
        gl_FragColor = texture2D(uTexture, vUv);`
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
        vUv = uv;`
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
  }

  updateDom() {
    Artwork.artworkContentTitle.textContent = Artwork.artworkFooterTitle.textContent =
      this.details.title;
    Artwork.artworkContentSubtitle.textContent =
      Artwork.artworkFooterSubtitle.textContent =
        this.details.author + " - " + this.details.year;
  }

  // hoverMaterial() {}
}
