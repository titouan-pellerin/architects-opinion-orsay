import { MeshToonMaterial } from "three";

export class CustomMeshToonMaterial {
  constructor(
    commonFrag,
    outputFrag,
    commonVert,
    beginVertex,
    projectVertex,
    customUniforms = {},
    parameters = {},
  ) {
    this.meshToonMaterial = new MeshToonMaterial(parameters);
    this.meshToonMaterial.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...customUniforms };
      if (commonFrag)
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <common>",
          commonFrag,
        );
      if (outputFrag)
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <output_fragment>",
          outputFrag,
        );
      if (commonVert)
        shader.vertexShader = shader.vertexShader.replace(
          "#include <common>",
          commonVert,
        );
      if (beginVertex)
        shader.vertexShader = shader.vertexShader.replace(
          "#include <begin_vertex>",
          beginVertex,
        );
      if (projectVertex)
        shader.vertexShader = shader.vertexShader.replace(
          "#include <project_vertex>",
          projectVertex,
        );
    };
  }
}
