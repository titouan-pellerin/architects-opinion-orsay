import beginFragmentShader from "../../glsl/ground/beginFragment.glsl";
import beginVertexShader from "../../glsl/ground/beginVertex.glsl";
import fragmentShader from "../../glsl/ground/fragment.glsl";
import vertexShader from "../../glsl/ground/vertex.glsl";
import voidFragmentShader from "../../glsl/ground/voidFragment.glsl";
import voidVertexShader from "../../glsl/ground/voidVertex.glsl";
import { gui, guiFolders } from "../utils/Debug";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import { texturesMap } from "../utils/assets";
import * as THREE from "three";

export class Environnement {
  constructor() {
    this.parameters = {
      envScale: 100,
      uTime: { value: 0 },
      groundColor: new THREE.Color("#ffffff"),
      groundMaskColor: new THREE.Color("#83ce72"),
      skyColor: new THREE.Color("#ffffff"),
      speed: 0.75,
      stroke: 5000,
      smallNoise: 500,
      bigNoise: 50,
    };

    this.groundMaskMaterial = new THREE.MeshToonMaterial({
      side: THREE.BackSide,
    });

    this.groundMaskMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = this.parameters.uTime;
      shader.uniforms.uColor = { value: this.parameters.groundMaskColor };

      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        beginVertexShader
      );

      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        voidVertexShader
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        beginFragmentShader
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        voidFragmentShader
      );
    };

    this.groundMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.BackSide,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: this.parameters.speed },
        uStroke: { value: this.parameters.stroke },
        uSmallNoise: { value: this.parameters.smallNoise },
        uBigNoise: { value: this.parameters.bigNoise },
        uColor: { value: this.parameters.groundColor },
      },
    });

    this.skyMaterial = this.groundMaterial.clone();
    this.skyMaterial.uniforms.uColor.value = this.parameters.skyColor;

    this.groundGeometry = new THREE.PlaneGeometry(1, 1, 512, 512);

    this.ground = new THREE.Mesh(this.groundGeometry, this.groundMaterial);
    this.ground.rotation.x = Math.PI * 0.5;
    this.ground.position.y = -3;
    this.ground.scale.set(
      this.parameters.envScale,
      this.parameters.envScale,
      this.parameters.envScale
    );

    this.mask = new THREE.Mesh(this.groundGeometry, this.groundMaskMaterial);
    this.mask.rotation.x = Math.PI * 0.5;
    this.mask.position.y = -3.01;
    this.mask.scale.set(
      this.parameters.envScale,
      this.parameters.envScale,
      this.parameters.envScale
    );
    this.mask.receiveShadow = true;

    this.skyGeometry = new THREE.SphereGeometry();

    this.sky = new THREE.Mesh(this.skyGeometry, this.skyMaterial);
    this.sky.scale.set(
      this.parameters.envScale,
      this.parameters.envScale,
      this.parameters.envScale
    );

    raf.subscribe("Ground", this.update.bind(this));

    const sceneFolder = guiFolders.get("scene");
    const atmosphereFolder = guiFolders.get("atmosphere");
    const groundFolder = sceneFolder.addFolder("Ground");
    groundFolder
      .addColor(this.parameters, "groundColor")
      .onChange(() => {
        this.groundMaterial.uniforms.uColor.set(this.parameters.groundColor);
      })
      .name("Color");
    groundFolder
      .add(this.groundMaterial.uniforms.uStroke, "value")
      .min(0)
      .max(10000)
      .name("StrokeQuantity");
    groundFolder
      .add(this.groundMaterial.uniforms.uSmallNoise, "value")
      .min(250)
      .max(750)
      .name("SmallNoise");
    groundFolder
      .add(this.groundMaterial.uniforms.uBigNoise, "value")
      .min(0)
      .max(100)
      .name("BigNoise");
    groundFolder
      .add(this.groundMaterial.uniforms.uSpeed, "value")
      .min(0)
      .max(2)
      .name("Speed");

    const groundMaskFolder = sceneFolder.addFolder("GroundMask");
    groundMaskFolder
      .addColor(this.parameters, "groundMaskColor")
      .onChange(() => {
        this.groundMaterial.uniforms.uColor.set(
          this.parameters.groundMaskColor
        );
      })
      .name("Color");

    const skyFolder = atmosphereFolder.addFolder("Sky");
    skyFolder
      .addColor(this.parameters, "skyColor")
      .onChange(() => {
        this.skyMaterial.uniforms.uColor.set(this.parameters.skyColor);
      })
      .name("Color");
    skyFolder
      .add(this.skyMaterial.uniforms.uStroke, "value")
      .min(0)
      .max(10000)
      .name("StrokeQuantity");
    skyFolder
      .add(this.skyMaterial.uniforms.uSmallNoise, "value")
      .min(250)
      .max(750)
      .name("SmallNoise");
    skyFolder
      .add(this.skyMaterial.uniforms.uBigNoise, "value")
      .min(0)
      .max(100)
      .name("BigNoise");
    skyFolder
      .add(this.skyMaterial.uniforms.uSpeed, "value")
      .min(0)
      .max(2)
      .name("Speed");
  }

  update() {
    this.groundMaterial.uniforms.uTime.value = raf.elapsedTime;
    this.skyMaterial.uniforms.uTime.value = raf.elapsedTime;
    this.parameters.uTime.value = raf.elapsedTime;
  }
}
