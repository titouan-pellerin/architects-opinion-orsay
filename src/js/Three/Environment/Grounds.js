import { guiFolders } from "../../utils/Debug";
import { texturesMap } from "../../utils/assets";
import { Ground } from "./Ground";
import { Group } from "three";

export class Grounds {
  constructor(groundAmount, parameters = {}) {
    this.firstTexture = texturesMap.get("firstCurveTexture")[0];
    this.lastTexture = texturesMap.get("lastCurveTexture")[0];
    this.textures = texturesMap.get("curveTextures");

    this.currentTexture = this.firstTexture;

    this.ground1 = new Ground(this.firstTexture, parameters);
    this.ground2 = this.getClonedGround();
    this.ground3 = this.getClonedGround();
    this.currentGround = this.ground1;
    this.currentIndex = 0;
    this.groundAmount = groundAmount - 1;

    /**
     * DEBUG
     */
    const sceneFolder = guiFolders.get("scene");

    const groundFolder = sceneFolder.addFolder("Ground");
    groundFolder
      .addColor(parameters, "groundColor")
      .onChange(() => {
        this.ground1.ground.material.uniforms.uColor.set(parameters.groundColor);
      })
      .name("Color");
    groundFolder
      .add(this.ground1.ground.material.uniforms.uStroke, "value")
      .min(0)
      .max(10000)
      .name("StrokeQuantity");
    groundFolder
      .add(this.ground1.ground.material.uniforms.uSmallNoise, "value")
      .min(250)
      .max(750)
      .name("SmallNoise");
    groundFolder
      .add(this.ground1.ground.material.uniforms.uBigNoise, "value")
      .min(0)
      .max(100)
      .name("BigNoise");
    groundFolder
      .add(this.ground1.ground.material.uniforms.uSpeed, "value")
      .min(0)
      .max(2)
      .name("Speed");

    const groundMaskFolder = sceneFolder.addFolder("GroundMask");
    groundMaskFolder
      .addColor(this.ground1.groundMaskUniforms.uColor, "value")
      .name("Color");
  }

  getRandomTexture() {
    return this.textures[Math.floor(Math.random() * this.textures.length)];
  }

  getClonedGround(lastGround = false) {
    const clonedGround = this.ground1.clone();
    clonedGround.mask.material = clonedGround.mask.material.clone();
    clonedGround.ground.material = clonedGround.ground.material.clone();
    if (lastGround) clonedGround.ground.material.uniforms.uTexture = this.lastTexture;
    else clonedGround.ground.material.uniforms.uTexture = this.getRandomTexture();
    return clonedGround;
  }
}
