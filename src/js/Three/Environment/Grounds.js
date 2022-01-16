import { Color, Group } from "three";
import { texturesMap } from "../../utils/assets";
import { guiFolders } from "../../utils/Debug";
import { positions } from "../../utils/positions";
import raf from "../../utils/Raf";
import { mainScene } from "../MainScene";
import { Rocks } from "./Elements/Rocks";
import { Trees } from "./Elements/Trees";
import { WoodLogs } from "./Elements/WoodLogs";
import { Ground } from "./Ground";

export class Grounds extends Group {
  constructor(groundAmount, parameters = {}, forestPathLine) {
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
    };

    // Previous Ground
    this.ground1 = new Ground(
      this.textures[2],
      this.grassUniforms,
      forestPathLine,
      parameters
    );
    // this.ground1.texture.flipY = false;
    this.ground1.position.z += parameters.envScale * this.parameters.groundSize;
    this.ground1.scale.z = -1;

    // Current Ground
    this.ground2 = new Ground(
      this.textures[0],
      this.grassUniforms,
      forestPathLine,
      parameters
    );
    const trees1 = new Trees(positions.get("treesPositions")[0]);
    this.ground2.trees = trees1;
    this.ground2.add(trees1);

    const rocks1 = new Rocks(positions.get("rocksPositions")[0]);
    this.ground2.rocks = rocks1;
    this.ground2.add(rocks1);

    const woodLogs1 = new WoodLogs(positions.get("woodLogsPositions")[0]);
    this.ground2.woodLogs = woodLogs1;
    this.ground2.add(woodLogs1);

    // Next Ground
    this.ground3 = new Ground(
      this.textures[1],
      this.grassUniforms,
      forestPathLine,
      parameters
    );
    this.ground3.texture.flipY = false;
    this.ground3.position.z -= parameters.envScale * parameters.groundSize;
    this.ground3.scale.z = -1;

    const trees2 = new Trees(positions.get("treesPositions")[1]);
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

    // const artwork1Pos = positions.get("artworksPositions")[0];
    // this.artwork1 = new Artwork(
    //   texturesMap.get("artworksTextures")[0],
    //   new Vector3(artwork1Pos.x, -1.38, artwork1Pos.y),
    //   parameters.envScale
    // );

    // const artwork2Pos = positions.get("artworksPositions")[1];
    // this.artwork2 = new Artwork(
    //   texturesMap.get("artworksTextures")[1],
    //   new Vector3(artwork2Pos.x, -1, artwork2Pos.y),
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
    // this.add(this.artwork1, this.artwork2, this.artwork3, this.artwork4);

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
      Ground.grass.removeInPath(texture, currentGround1.grass, !!(this.currentIndex % 2));

      currentGround1.scale.z = !!(this.currentIndex % 2) ? 1 : -1;
      currentGround1.ground.updateMatrix();
      currentGround1.mask.updateMatrix();

      // const newTrees = new Trees(positions.get("treesPositions")[this.currentIndex + 1]);
      // newTrees.scale.z = !!(this.currentIndex % 2) ? 1 : -1;
      // currentGround1.remove(currentGround1.trees);
      // currentGround1.add(newTrees);
      // currentGround1.trees = newTrees;

      // const newRocks = new Rocks(
      //   positions.get("rocksPositions")[this.currentIndex + 1],
      //   this.forestPathLine
      // );
      // newRocks.scale.z = !!(this.currentIndex % 2) ? 1 : -1;
      // currentGround1.remove(currentGround1.rocks);
      // currentGround1.add(newRocks);
      // currentGround1.rocks = newRocks;

      // const newWoodLogs = new WoodLogs(
      //   positions.get("woodLogsPositions")[this.currentIndex + 1]
      // );
      // newWoodLogs.scale.z = !!(this.currentIndex % 2) ? 1 : -1;
      // currentGround1.remove(currentGround1.woodLogs);
      // currentGround1.add(newWoodLogs);
      // currentGround1.woodLogs = newWoodLogs;

      // const newCubes = new Cubes(positions.get("cubesPositions")[this.currentIndex + 1]);
      // newCubes.scale.z = !!(this.currentIndex % 2) ? 1 : -1;
      // currentGround1.remove(currentGround1.cubes);
      // currentGround1.add(newCubes);
      // currentGround1.cubes = newCubes;

      this.ground1 = currentGround2;
      this.ground2 = currentGround3;
      this.ground3 = currentGround1;

      this.currentIndex++;
    } else raf.unsubscribe("grounds");
  }

  update() {
    // if (mainScene.cameraContainer.position.z <= this.ground2.getCenter().z) {
    if (mainScene.camera.position.z <= this.ground2.getCenter().z) {
      this.switchGrounds();
      console.log("switch");
    }
    this.grassUniforms.uTime.value = raf.elapsedTime;
  }
}
