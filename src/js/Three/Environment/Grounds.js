import { Color, Group, Line } from "three";
import { texturesMap } from "../../utils/assets";
import { guiFolders } from "../../utils/Debug";
import { positions } from "../../utils/positions";
import raf from "../../utils/Raf";
import { mainScene } from "../MainScene";
import { Checkpoint } from "../Path/Checkpoint";
import { Artwork } from "./Elements/Artwork";
import { Rocks } from "./Elements/Rocks";
import { Mist } from "./Elements/Mist";
import { Trees } from "./Elements/Trees";
import { WoodLogs } from "./Elements/WoodLogs";
import { Ground } from "./Ground";

export class Grounds extends Group {
  /**
   *
   * @param {Number} groundAmount
   * @param {*} parameters
   * @param {Line} forestPathLine
   * @param {Checkpoint[]} checkpoints
   */
  constructor(groundAmount, parameters = {}, forestPathLine, checkpoints) {
    super();
    this.forestPathLine = forestPathLine;
    this.currentIndex = 1;
    this.groundAmount = groundAmount - 1;
    this.parameters = parameters;

    this.textures = texturesMap.get("curveTextures");

    this.grassUniforms = {
      uTime: { value: 0 },
      uColor: { value: new Color("#84b15a") },
      uColor2: { value: new Color("#236760") },
      uDisplaceIntensity: { value: 0.25 },
      uSpeed: { value: 1.2 },
      uTexture: { value: texturesMap.get("flowerPattern")[0] },
    };

    this.riverUniforms = {
      uTime: { value: 0 },
      uColor: { value: new Color("#a2dae9") },
      uColor2: { value: new Color("#0f98c4") },
    };

    this.leafUniforms = {
      uTime: { value: 0 },
      uColor: { value: new Color("#d1e997") },
      uColor2: { value: new Color("#4a9e36") },
      uDisplaceIntensity: { value: 0.25 },
      uSpeed: { value: 1.2 },
    };

    // Previous Ground
    this.ground1 = new Ground(
      this.textures[2],
      this.grassUniforms,
      this.riverUniforms,
      forestPathLine,
      parameters
    );
    this.ground1.grass.removeFromParent();

    this.ground1.position.z += parameters.envScale * this.parameters.groundSize;
    this.ground1.scale.z = -1;

    // Current Ground
    this.ground2 = new Ground(
      this.textures[0],
      this.grassUniforms,
      this.riverUniforms,
      forestPathLine,
      parameters
    );
    Ground.grass.setInstanceMatrices(0, this.ground2.grass);
    // this.ground2.grass.removeFromParent();

    const trees1 = new Trees(positions.get("treesPositions")[0], this.leafUniforms);
    this.ground2.trees = trees1;
    this.ground2.add(trees1);

    const rocks1 = new Rocks(positions.get("rocksPositions")[0]);
    this.ground2.rocks = rocks1;
    this.ground2.add(rocks1);

    const woodLogs1 = new WoodLogs(positions.get("woodLogsPositions")[0]);
    this.ground2.woodLogs = woodLogs1;
    this.ground2.add(woodLogs1);

    const mist = new Mist();
    mainScene.add(mist.particleSystem);

    // Next Ground
    this.ground3 = new Ground(
      this.textures[1],
      this.grassUniforms,
      this.riverUniforms,
      forestPathLine,
      parameters
    );
    Ground.grass.setInstanceMatrices(1, this.ground3.grass);
    // this.ground3.grass.removeFromParent();

    this.ground3.texture.flipY = false;
    this.ground3.position.z -= parameters.envScale * parameters.groundSize;
    this.ground3.scale.z = -1;

    const trees2 = new Trees(positions.get("treesPositions")[1], this.leafUniforms);
    trees2.scale.z = -1;
    this.ground3.trees = trees2;
    this.ground3.add(trees2);

    const rocks2 = new Rocks(positions.get("rocksPositions")[1]);
    rocks2.scale.z = -1;
    this.ground3.rocks = rocks2;
    this.ground3.add(rocks2);

    const woodLogs2 = new WoodLogs(positions.get("woodLogsPositions")[1]);
    woodLogs2.scale.z = -1;
    this.ground3.woodLogs = woodLogs2;
    this.ground3.add(woodLogs2);

    this.artworks = [];
    for (let i = 0; i < positions.get("artworksPositions").length; i++) {
      const artwork = new Artwork(
        texturesMap.get("artworksTextures")[i],
        positions.get("artworksPositions")[i]
      );
      this.artworks.push(artwork);
    }
    this.artworks[0].lookAt(checkpoints[0].position.x, -0.8, checkpoints[0].position.y);
    this.artworks[1].lookAt(checkpoints[0].position.x, -0.8, checkpoints[0].position.y);
    this.artworks[2].lookAt(checkpoints[0].position.x, -0.8, checkpoints[0].position.y);
    this.artworks[3].lookAt(checkpoints[0].position.x, -0.8, checkpoints[0].position.y);

    // const artwork2Pos = positions.get("artworksPositions")[1];
    // this.artwork2 = new Artwork(
    //   texturesMap.get("artworksTextures")[1],
    //   new THREE.Vector3(artwork2Pos.x, -1, artwork2Pos.y),
    //   parameters.envScale
    // );
    // this.artwork2.rotation.x *= -1;

    // const artwork3Pos = positions.get("artworksPositions")[2];
    // this.artwork3 = new Artwork(
    //   texturesMap.get("artworksTextures")[2],
    //   new Vector3(artwork3Pos.x, -1.5, artwork3Pos.y),
    //   parameters.envScale
    // );

    // const artwork4Pos = positions.get("artworksPositions")[3];
    // this.artwork4 = new Artwork(
    //   texturesMap.get("artworksTextures")[3],
    //   new Vector3(artwork4Pos.x, -0.6, artwork4Pos.y),
    //   parameters.envScale
    // );
    // this.artwork3.rotation.y = -Math.PI * 0.09;

    this.add(this.ground1, this.ground2, this.ground3);
    this.add(...this.artworks);

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

    const groundMaskFolder = sceneFolder.addFolder("Ground");
    groundMaskFolder.addColor(this.ground2.groundUniforms.uColor, "value").name("Color");
    groundMaskFolder
      .addColor(this.ground2.groundUniforms.uPathColor, "value")
      .name("Path Color");

    const rocksFolder = guiFolders.get("scene").addFolder("Rock");
    rocksFolder.addColor(this.ground2.rocks.rockUniforms.uColor, "value").name("Color");
    rocksFolder.addColor(this.ground2.rocks.rockUniforms.uColor2, "value").name("Color2");

    const woodLogsFolder = guiFolders.get("scene").addFolder("wood");
    woodLogsFolder
      .addColor(this.ground2.woodLogs.woodUniforms.uColor, "value")
      .name("Color");
    woodLogsFolder
      .addColor(this.ground2.woodLogs.woodUniforms.uColor2, "value")
      .name("Color2");
    woodLogsFolder
      .addColor(this.ground2.woodLogs.woodInnerUniforms.uColor, "value")
      .name("InnerColor");
    woodLogsFolder
      .addColor(this.ground2.woodLogs.woodInnerUniforms.uColor2, "value")
      .name("InnerColor2");

    const folder = sceneFolder.addFolder("Grass");
    folder.addColor(this.grassUniforms.uColor, "value").name("Color");
    folder.addColor(this.grassUniforms.uColor2, "value").name("Color2");
    folder
      .add(this.grassUniforms.uDisplaceIntensity, "value")
      .min(0)
      .max(1)
      .name("DisplaceIntensity");
    folder.add(this.grassUniforms.uSpeed, "value").min(0).max(2).name("Speed");

    const riverFolder = sceneFolder.addFolder("River");
    riverFolder.addColor(this.riverUniforms.uColor, "value").name("Color");
    riverFolder.addColor(this.riverUniforms.uColor2, "value").name("Color2");
  }

  switchGrounds() {
    if (this.currentIndex < this.groundAmount) {
      const currentGround1 = this.ground1;
      const currentGround2 = this.ground2;
      const currentGround3 = this.ground3;

      currentGround1.position.z -=
        this.parameters.envScale * this.parameters.groundSize * 3;
      const texture = this.textures[this.currentIndex + 1];
      texture.flipY = !!(this.currentIndex % 2);
      currentGround1.groundUniforms.uTexture.value = texture;
      currentGround1.groundMaskUniforms.uTexture.value = texture;
      Ground.grass.setInstanceMatrices(this.currentIndex + 1, currentGround1.grass);

      currentGround1.scale.z = !!(this.currentIndex % 2) ? 1 : -1;

      currentGround1.ground.updateMatrix();
      currentGround1.mask.updateMatrix();

      this.ground1 = currentGround2;
      this.ground2 = currentGround3;
      this.ground3 = currentGround1;

      this.currentIndex++;
    } else raf.unsubscribe("grounds");
  }

  update() {
    // if (mainScene.cameraContainer.position.z <= this.ground2.getCenter().z) {
    if (mainScene.cameraContainer.position.z <= this.ground2.getCenter().z) {
      this.switchGrounds();
      console.log("Switch");
    }
    this.grassUniforms.uTime.value = raf.elapsedTime;
    this.riverUniforms.uTime.value = raf.elapsedTime;
  }
}
