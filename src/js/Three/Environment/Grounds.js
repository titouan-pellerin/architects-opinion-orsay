import { guiFolders } from "../../utils/Debug";
import raf from "../../utils/Raf";
import { texturesMap } from "../../utils/assets";
import { positions } from "../../utils/positions";
import { mainScene } from "../MainScene";
import { Cubes } from "./Elements/Cubes";
import { Trees } from "./Elements/Trees";
import { Ground } from "./Ground";
import { Group } from "three";

export class Grounds extends Group {
  constructor(groundAmount, parameters = {}) {
    super();
    this.currentIndex = 1;
    this.groundAmount = groundAmount - 1;
    this.parameters = parameters;

    this.textures = texturesMap.get("curveTextures");

    // Previous Ground
    this.ground1 = new Ground(this.textures[2], parameters);
    this.ground1.texture.flipY = false;
    this.ground1.position.z += parameters.envScale;
    this.ground1.scale.z = -1;

    // Current Ground
    this.ground2 = new Ground(this.textures[0], parameters);
    // const cubes1 = new Cubes(positions.get("cubesPositions")[0]);
    // this.ground2.cubes = cubes1;
    const trees1 = new Trees(positions.get("treesPositions")[0]);
    this.ground2.trees = trees1;
    this.ground2.add(trees1);

    // Next Ground
    this.ground3 = new Ground(this.textures[1], parameters);
    this.ground3.texture.flipY = false;
    this.ground3.position.z -= this.parameters.envScale;
    this.ground3.scale.z = -1;
    const cubes2 = new Cubes(positions.get("cubesPositions")[1]);
    cubes2.scale.z = -1;
    this.ground3.cubes = cubes2;
    this.ground3.add(cubes2);

    this.add(this.ground1, this.ground2, this.ground3);

    raf.subscribe("grounds", this.update.bind(this));

    /**
     * DEBUG
     */
    const sceneFolder = guiFolders.get("scene");

    const groundFolder = sceneFolder.addFolder("Mask");
    groundFolder.addColor(this.ground2.groundMaskUniforms.uColor, "value").name("Color");
    groundFolder
      .add(this.ground2.groundMaskUniforms.uStroke, "value")
      .min(0)
      .max(10000)
      .name("StrokeQuantity");
    groundFolder
      .add(this.ground2.groundMaskUniforms.uSmallNoise, "value")
      .min(250)
      .max(750)
      .name("SmallNoise");
    groundFolder
      .add(this.ground2.groundMaskUniforms.uBigNoise, "value")
      .min(0)
      .max(100)
      .name("BigNoise");
    groundFolder
      .add(this.ground2.groundMaskUniforms.uSpeed, "value")
      .min(0)
      .max(2)
      .name("Speed");

    const groundMaskFolder = sceneFolder.addFolder("Ground");
    groundMaskFolder.addColor(this.ground2.groundUniforms.uColor, "value").name("Color");
    groundMaskFolder
      .addColor(this.ground2.groundUniforms.uPathColor, "value")
      .name("Path Color");
  }

  getNextTexture() {
    return this.textures[this.currentIndex + 1];
  }

  switchGrounds() {
    if (this.currentIndex < this.groundAmount) {
      const currentGround1 = this.ground1;
      const currentGround2 = this.ground2;
      const currentGround3 = this.ground3;

      currentGround1.position.z -= this.parameters.envScale * 3;
      const texture = this.getNextTexture();
      texture.flipY = !!(this.currentIndex % 2);
      currentGround1.groundUniforms.uTexture.value = texture;
      currentGround1.scale.z = !!(this.currentIndex % 2) ? 1 : -1;
      const newCubes = new Cubes(positions.get("cubesPositions")[this.currentIndex + 1]);
      newCubes.scale.z = !!(this.currentIndex % 2) ? 1 : -1;
      currentGround1.remove(currentGround1.cubes);
      currentGround1.add(newCubes);
      currentGround1.cubes = newCubes;

      this.ground1 = currentGround2;
      this.ground2 = currentGround3;
      this.ground3 = currentGround1;

      this.currentIndex++;
    } else raf.unsubscribe("grounds");
  }

  update() {
    if (mainScene.cameraContainer.position.z <= this.ground2.getCenter().z) {
      this.switchGrounds();
    }
  }
}
