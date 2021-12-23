import { MeshToonMaterial } from "three";

export class CustomMeshToonMaterial extends MeshToonMaterial {
  constructor(
    commonFrag,
    outputFrag,
    commonVert,
    beginVertex,
    projectVertex,
    customUniforms = {},
    parameters = {}
  ) {
    super(parameters);
    // this.customUniforms = customUniforms;
    this.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...customUniforms };
      if (commonVert)
        shader.vertexShader = shader.vertexShader.replace(
          "#include <common>",
          commonVert
        );
      if (projectVertex)
        shader.vertexShader = shader.vertexShader.replace(
          "#include <project_vertex>",
          projectVertex
        );
      if (beginVertex)
        shader.vertexShader = shader.vertexShader.replace(
          "#include <begin_vertex>",
          beginVertex
        );
      if (commonFrag)
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <common>",
          commonFrag
        );
      if (outputFrag)
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <output_fragment>",
          outputFrag
        );
    };
  }
}
