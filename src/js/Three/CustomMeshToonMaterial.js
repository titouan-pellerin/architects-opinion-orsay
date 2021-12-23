import { MeshToonMaterial } from "three";

export class CustomMeshToonMaterial extends MeshToonMaterial {
  constructor(
    beginFrag,
    endFrag,
    beginVert,
    endVert,
    customUniforms = {},
    parameters = {}
  ) {
    super(parameters);
    // this.customUniforms = customUniforms;
    this.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...customUniforms };
      shader.vertexShader = shader.vertexShader.replace("#include <common>", beginVert);
      shader.vertexShader = shader.vertexShader.replace(
        "#include <project_vertex>",
        endVert
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        beginFrag
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        endFrag
      );
    };
  }
}
