import groundBeginVertexShader from "@glsl/ground/ground/beginVertex.glsl";
import groundCommonFragmentShader from "@glsl/ground/ground/commonFragment.glsl";
import groundCommonVertexShader from "@glsl/ground/ground/commonVertex.glsl";
import groundOutputFragmentShader from "@glsl/ground/ground/outputFragment.glsl";
import maskBeginVertexShader from "@glsl/ground/mask/beginVertex.glsl";
import maskCommonFragmentShader from "@glsl/ground/mask/commonFragment.glsl";
import maskCommonVertexShader from "@glsl/ground/mask/commonVertex.glsl";
import maskOutputFragmentShader from "@glsl/ground/mask/outputFragment.glsl";
import riverBeginVertexShader from "@glsl/ground/river/beginVertex.glsl";
import riverCommonFragmentShader from "@glsl/ground/river/commonFragment.glsl";
import riverCommonVertexShader from "@glsl/ground/river/commonVertex.glsl";
import riverOutputFragmentShader from "@glsl/ground/river/outputFragment.glsl";
import { CustomMeshToonMaterial } from "@js/Three/CustomMeshToonMaterial";
import { Color, Group, Mesh, MeshToonMaterial, PlaneGeometry, Vector3 } from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import { simplex } from "../../utils/misc";
import { GroundElements } from "./Elements/GroundElements";

export class Ground extends Group {
  static groundGeometry;
  static grass;
  constructor(
    texture,
    grassUniforms,
    flowersUniforms,
    riverUniforms,
    pathLine,
    parameters = {}
  ) {
    super();

    // Static attribute to create only one geometry (because no-indexed geometry requires a bit more time)
    if (!Ground.groundGeometry) {
      Ground.groundGeometry = new PlaneGeometry(
        parameters.groundSize,
        parameters.groundSize,
        256,
        256
      ).toNonIndexed();
      const vertices = Ground.groundGeometry.getAttribute("position").array;

      for (let i = 0; i < vertices.length / 3; i++) {
        const i3 = i * 3;
        const noise = simplex.noise2D(vertices[i3] * 30, vertices[i3 + 1] * 30) + 1 * 0.7;
        vertices[i3 + 2] += noise * 0.004;
      }
    }

    this.texture = texture;
    this.trees = null;
    this.rocks = null;
    this.woodLogs = null;

    this.groundUniforms = {
      uTime: { value: 0 },
      uColor: { value: new Color("#4a7740") },
      uPathColor: { value: new Color("#7c574b") },
      uTexture: { value: texture },
    };

    const groundMaterial = new CustomMeshToonMaterial(
      groundCommonFragmentShader,
      groundOutputFragmentShader,
      groundCommonVertexShader,
      groundBeginVertexShader,
      null,
      this.groundUniforms
    );

    this.ground = new Mesh(Ground.groundGeometry, groundMaterial.meshToonMaterial);
    this.ground.rotation.x = -Math.PI * 0.5;
    this.ground.position.y = -3.001;
    this.ground.scale.set(parameters.envScale, parameters.envScale, parameters.envScale);
    this.ground.matrixAutoUpdate = false;
    this.ground.updateMatrix();

    this.groundMaskUniforms = {
      uStroke: { value: parameters.stroke },
      uSmallNoise: { value: parameters.smallNoise },
      uBigNoise: { value: parameters.bigNoise },
      uColor: { value: parameters.groundColor },
      uTexture: { value: texture },
    };

    const groundMaskMaterial = new MeshToonMaterial({
      transparent: true,
    });
    groundMaskMaterial.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...this.groundMaskUniforms };
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        maskCommonFragmentShader
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        maskOutputFragmentShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        maskCommonVertexShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        maskBeginVertexShader
      );
    };

    this.mask = new Mesh(Ground.groundGeometry, groundMaskMaterial);
    this.mask.rotation.x = -Math.PI * 0.5;
    this.mask.position.y = -3;
    this.mask.scale.set(parameters.envScale, parameters.envScale, parameters.envScale);
    this.mask.matrixAutoUpdate = false;
    this.mask.updateMatrix();

    const riverMaterial = new MeshToonMaterial({
      transparent: true,
      opacity: 0.8,
    });
    riverMaterial.onBeforeCompile = (shader) => {
      shader.uniforms = { ...shader.uniforms, ...riverUniforms };
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        riverCommonFragmentShader
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        riverOutputFragmentShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        riverCommonVertexShader
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        riverBeginVertexShader
      );
    };

    const riverGeometry = new PlaneGeometry(0.5, 0.5, 256, 256);
    this.riverPlane = new Mesh(riverGeometry, riverMaterial);
    this.riverPlane.rotation.x = -Math.PI * 0.5;
    this.riverPlane.position.y = -3.14;
    this.riverPlane.scale.set(
      parameters.envScale,
      parameters.envScale,
      parameters.envScale
    );
    this.riverPlane.matrixAutoUpdate = false;
    this.riverPlane.updateMatrix();

    this.add(this.ground, this.mask, this.riverPlane);

    const sampler = new MeshSurfaceSampler(this.ground).build();
    if (!Ground.grass && !Ground.flowers) {
      Ground.groundElements = new GroundElements(
        grassUniforms,
        flowersUniforms,
        parameters.envScale,
        sampler,
        pathLine
      );
      this.grass = Ground.groundElements.instancedGrassMesh;
      this.flowers = Ground.groundElements.instancedFlowersMesh;
    } else {
      this.grass = Ground.groundElements.instancedGrassMesh.clone();
      this.flowers = Ground.groundElements.instancedFlowersMesh.clone();
    }
    this.add(this.grass, this.flowers);
  }

  getCenter() {
    this.ground.geometry.computeBoundingBox();
    const center = new Vector3();
    this.ground.geometry.boundingBox.getCenter(center);
    this.ground.localToWorld(center);
    return center;
  }
}
