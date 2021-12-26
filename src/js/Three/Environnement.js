import beginVertexShader from "../../glsl/ground/beginVertex.glsl";
import commonFragmentShader from "../../glsl/ground/commonFragment.glsl";
import commonVertexShader from "../../glsl/ground/commonVertex.glsl";
import groundFragmentShader from "../../glsl/ground/fragment.glsl";
import outputFragmentShader from "../../glsl/ground/outputFragment.glsl";
import groundVertexShader from "../../glsl/ground/vertex.glsl";
import skyFragmentShader from "../../glsl/sky/fragment.glsl";
import skyVertexShader from "../../glsl/sky/vertex.glsl";
import { gui, guiFolders } from "../utils/Debug";
import { textureLoader } from "../utils/Loader";
import raf from "../utils/Raf";
import { texturesMap } from "../utils/assets";
import { CustomMeshToonMaterial } from "./CustomMeshToonMaterial";
import { CameraAnimation } from "./Path/CameraAnimation";
import { ForestPathLine } from "./Path/ForestPathLine";
import * as THREE from "three";
import { RepeatWrapping, Vector3 } from "three";

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

    this.forestPathLine = new ForestPathLine(1024, 2);
    this.forestPathLine.scale.set(
      this.parameters.envScale,
      this.parameters.envScale,
      this.parameters.envScale
    );
    const groundTexture1 = textureLoader.load("/assets/ground/curve1.png");
    const groundTexture2 = textureLoader.load("/assets/ground/curve2.png");
    const groundTexture3 = textureLoader.load("/assets/ground/curve3.png");
    const groundTexture4 = textureLoader.load("/assets/ground/curve4.png");
    const groundTexture5 = textureLoader.load("/assets/ground/curve5.png");

    this.cameraAnimation = new CameraAnimation(
      this.forestPathLine.spline,
      this.parameters.envScale
    );

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
      this.groundMaskUniforms
    );

    this.groundMaterial1 = new THREE.ShaderMaterial({
      vertexShader: groundVertexShader,
      fragmentShader: groundFragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: this.parameters.speed },
        uStroke: { value: this.parameters.stroke },
        uSmallNoise: { value: this.parameters.smallNoise },
        uBigNoise: { value: this.parameters.bigNoise },
        uColor: { value: this.parameters.groundColor },
        uTexture: { value: groundTexture1 },
      },
    });

    this.skyMaterial = new THREE.ShaderMaterial({
      vertexShader: skyVertexShader,
      fragmentShader: skyFragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: this.parameters.speed },
        uStroke: { value: this.parameters.stroke },
        uSmallNoise: { value: this.parameters.smallNoise },
        uBigNoise: { value: this.parameters.bigNoise },
        uColor: { value: this.parameters.skyColor },
      },
    });

    this.groundGeometry = new THREE.PlaneGeometry(1, 1, 512, 512);

    this.ground = new THREE.Mesh(this.groundGeometry, this.groundMaterial1);
    this.ground.rotation.x = -Math.PI * 0.5;
    this.ground.position.y = -3;

    this.ground.scale.set(
      this.parameters.envScale,
      this.parameters.envScale,
      this.parameters.envScale
    );

    this.ground2 = this.ground.clone();
    this.ground2.material = this.ground2.material.clone();
    groundTexture2.flipY = false;
    this.ground2.material.uniforms.uTexture.value = groundTexture2;
    this.ground2.position.z -= this.parameters.envScale;
    this.ground2.scale.y = -this.parameters.envScale;

    this.mask = new THREE.Mesh(this.groundGeometry, this.groundMaskMaterial);
    this.mask.rotation.x = -Math.PI * 0.5;
    this.mask.position.y = -3.01;
    this.mask.scale.set(
      this.parameters.envScale,
      this.parameters.envScale,
      this.parameters.envScale
    );
    this.mask.receiveShadow = true;

    this.mask2 = this.mask.clone();
    this.mask2.position.z -= this.parameters.envScale;
    this.mask2.scale.y = -this.parameters.envScale;

    this.skyGeometry = new THREE.SphereGeometry(
      1,
      16,
      8,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.5
    );

    this.sky = new THREE.Mesh(this.skyGeometry, this.skyMaterial);
    this.sky.scale.set(
      this.parameters.envScale,
      this.parameters.envScale,
      this.parameters.envScale
    );

    raf.subscribe("environment", this.update.bind(this));

    /**
     * DEBUG
     */

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
      .add(this.groundMaterial1.uniforms.uStroke, "value")
      .min(0)
      .max(10000)
      .name("StrokeQuantity");
    groundFolder
      .add(this.groundMaterial1.uniforms.uSmallNoise, "value")
      .min(250)
      .max(750)
      .name("SmallNoise");
    groundFolder
      .add(this.groundMaterial1.uniforms.uBigNoise, "value")
      .min(0)
      .max(100)
      .name("BigNoise");
    groundFolder
      .add(this.groundMaterial1.uniforms.uSpeed, "value")
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
    this.skyMaterial.uniforms.uTime.value = raf.elapsedTime;
    this.groundMaskUniforms.uTime.value = raf.elapsedTime;
  }
}
