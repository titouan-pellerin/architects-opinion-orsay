import beginVertexShader from "../../glsl/ground/beginVertex.glsl";
import commonFragmentShader from "../../glsl/ground/commonFragment.glsl";
import commonVertexShader from "../../glsl/ground/commonVertex.glsl";
import fragmentShader from "../../glsl/ground/fragment.glsl";
import outputFragmentShader from "../../glsl/ground/outputFragment.glsl";
import vertexShader from "../../glsl/ground/vertex.glsl";
import { gui, guiFolders } from "../utils/Debug";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import { texturesMap } from "../utils/assets";
import { CustomMeshToonMaterial } from "./CustomMeshToonMaterial";
import * as THREE from "three";

export class Environnement {
  constructor() {
    this.parameters = {
      envScale: 100,
      groundColor: new THREE.Color("#ffffff"),
      skyColor: new THREE.Color("#ffffff"),
      speed: 0.75,
      stroke: 5000,
      smallNoise: 500,
      bigNoise: 50,
    };

    this.groundMaskUniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#83ce72") },
    };

    this.groundMaskMaterial = new CustomMeshToonMaterial(
      commonFragmentShader,
      outputFragmentShader,
      commonVertexShader,
      beginVertexShader,
      null,
      this.groundMaskUniforms,
      {
        side: THREE.BackSide,
      },
    );

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
      this.parameters.envScale,
    );

    this.mask = new THREE.Mesh(
      this.groundGeometry,
      this.groundMaskMaterial.meshToonMaterial,
    );
    this.mask.rotation.x = Math.PI * 0.5;
    this.mask.position.y = -3.01;
    this.mask.scale.set(
      this.parameters.envScale,
      this.parameters.envScale,
      this.parameters.envScale,
    );
    this.mask.receiveShadow = true;

    this.skyGeometry = new THREE.SphereGeometry(
      1,
      16,
      8,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.5,
    );

    this.sky = new THREE.Mesh(this.skyGeometry, this.skyMaterial);
    this.sky.scale.set(
      this.parameters.envScale,
      this.parameters.envScale,
      this.parameters.envScale,
    );

    raf.subscribe("Environnement", this.update.bind(this));

    setTimeout(() => {
      this.ground.matrixAutoUpdate = false;
      this.mask.matrixAutoUpdate = false;
      this.sky.matrixAutoUpdate = false;
    }, 1);

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
    groundMaskFolder.addColor(this.groundMaskUniforms.uColor, "value").name("Color");

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
    skyFolder.add(this.skyMaterial.uniforms.uSpeed, "value").min(0).max(2).name("Speed");
  }

  update() {
    // this.groundMaterial.uniforms.uTime.value = raf.elapsedTime * 0.5;
    this.skyMaterial.uniforms.uTime.value = raf.elapsedTime;
    this.groundMaskUniforms.uTime.value = raf.elapsedTime;
  }
}
