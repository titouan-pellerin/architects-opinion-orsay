import { Color, Group, Line, Vector3 } from "three";
import { texturesMap } from "../../utils/assets";
import { guiFolders } from "../../utils/Debug";
import { positions } from "../../utils/positions";
import raf from "../../utils/Raf";
import { mainScene } from "../MainScene";
import { Checkpoint } from "../Path/Checkpoint";
import { Butterfly } from "./Elements/Butterfly";
import { Dust } from "./Elements/Dust";
import { Leaf } from "./Elements/Leaf";
import { Ground } from "./Ground";

export class Grounds extends Group {
  /**
   *
   * @param {Number} groundAmount
   * @param {*} parameters
   * @param {Line} forestPathLine
   * @param {Checkpoint[]} checkpoints
   */
  constructor(groundAmount, parameters = {}, forestPathLine, artworks, raycasting) {
    super();
    this.forestPathLine = forestPathLine;
    this.currentIndex = 1;
    this.groundAmount = groundAmount - 1;
    this.parameters = parameters;
    this.raycasting = raycasting;

    this.textures = texturesMap.get("curveTextures");

    this.grassUniforms = {
      uTime: { value: 0 },
      uColor: { value: new Color("#84b15a") },
      uColor2: { value: new Color("#236760") },
      uDisplaceIntensity: { value: 0.185 },
      uSpeed: { value: 1.2 },
      uRayPos: { value: new Vector3() },
      uFlipped: { value: 1 },
    };

    this.flowersUniforms = {
      uTime: { value: 0 },
      uDisplaceIntensity: { value: 0.25 },
      uSpeed: { value: 1.2 },
      uTexture: { value: texturesMap.get("flowerPattern")[0] },
      uRayPos: { value: new Vector3() },
    };

    this.riverUniforms = {
      uTime: { value: 0 },
      uColor: { value: new Color("#a2dae9") },
      uColor2: { value: new Color("#0f98c4") },
      uRayPos: { value: new Vector3() },
    };

    this.leafUniforms = {
      uTime: { value: 0 },
      uColor: { value: new Color("#d1e997") },
      uDisplaceIntensity: { value: 0.25 },
      uSpeed: { value: 1.2 },
      uRayPos: { value: new Vector3() },
    };

    // Previous Ground
    this.ground1 = new Ground(
      this.textures[2],
      this.grassUniforms,
      this.flowersUniforms,
      this.riverUniforms,
      this.leafUniforms,
      forestPathLine,
      parameters
    );
    this.raycasting.spheresToRaycast[0] = this.ground1.trees.spheresToRaycast;

    this.ground1.position.z += parameters.envScale * this.parameters.groundSize;
    this.ground1.scale.z = -1;
    this.ground1.ground.updateMatrix();
    this.ground1.mask.updateMatrix();

    // Current Ground
    this.ground2 = new Ground(
      this.textures[0],
      this.grassUniforms,
      this.flowersUniforms,
      this.riverUniforms,
      this.leafUniforms,
      forestPathLine,
      parameters
    );
    Ground.groundElements.setInstanceMatrices(
      0,
      this.ground2.grass,
      this.ground2.flowers
    );

    this.ground2.trees.updateTreesPositions(positions.get("treesPositions")[0]);
    this.raycasting.spheresToRaycast[2] = this.ground2.trees.spheresToRaycast;

    this.ground2.rocks.updateRocksPositions(positions.get("rocksPositions")[0]);
    this.ground2.woodLogs.updateWoodLogsPositions(positions.get("woodLogsPositions")[0]);

    const dust = new Dust();

    const leaf = new Leaf();

    const butterfly = new Butterfly();

    this.ground2.add(
      // woodLogs1,
      // rocks1,
      leaf.object.mesh,
      dust.object.mesh,
      butterfly.object.mesh,
      butterfly.object.mirrorMesh
    );

    // Next Ground
    this.ground3 = new Ground(
      this.textures[1],
      this.grassUniforms,
      this.flowersUniforms,
      this.riverUniforms,
      this.leafUniforms,
      forestPathLine,
      parameters
    );
    Ground.groundElements.setInstanceMatrices(
      1,
      this.ground3.grass,
      this.ground3.flowers
    );

    this.ground3.texture.flipY = false;
    this.ground3.position.z -= parameters.envScale * parameters.groundSize;
    this.ground3.scale.z = -1;

    this.ground3.trees.updateTreesPositions(positions.get("treesPositions")[1]);
    this.ground3.trees.scale.z = -1;
    this.raycasting.spheresToRaycast[3] = this.ground3.trees.spheresToRaycast;

    this.ground3.rocks.updateRocksPositions(positions.get("rocksPositions")[1]);
    this.ground3.rocks.scale.z = -1;
    this.ground3.woodLogs.updateWoodLogsPositions(positions.get("woodLogsPositions")[1]);
    this.ground3.woodLogs.scale.z = -1;

    const leaf2 = leaf.object.mesh.clone();
    const dust2 = dust.object.mesh.clone();
    const butterfly2 = butterfly.object.mesh.clone();
    const butterflyMirror2 = butterfly.object.mirrorMesh.clone();

    this.ground3.add(
      // woodLogs2, rocks2,
      leaf2,
      dust2,
      butterfly2,
      butterflyMirror2
    );

    this.add(this.ground1, this.ground2, this.ground3);
    this.add(...artworks);

    raf.subscribe("grounds", this.update.bind(this));

    /**
     * DEBUG
     */
    const sceneFolder = guiFolders.get("scene");

    const groundMaskFolder = sceneFolder.addFolder("Mask");
    groundMaskFolder
      .addColor(this.ground2.groundMaskUniforms.uColor, "value")
      .name("Color");
    groundMaskFolder
      .add(this.ground2.groundMaskUniforms.uStroke, "value")
      .min(0)
      .max(10000)
      .name("StrokeQuantity");
    groundMaskFolder
      .add(this.ground2.groundMaskUniforms.uSmallNoise, "value")
      .min(250)
      .max(750)
      .name("SmallNoise");
    groundMaskFolder
      .add(this.ground2.groundMaskUniforms.uBigNoise, "value")
      .min(0)
      .max(100)
      .name("BigNoise");

    const groundFolder = sceneFolder.addFolder("Ground");
    groundFolder.addColor(this.ground2.groundUniforms.uColor, "value").name("Color");
    groundFolder
      .addColor(this.ground2.groundUniforms.uPathColor, "value")
      .name("Path Color");

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
    console.time("switch");
    const currentGround1 = this.ground1;
    const currentGround2 = this.ground2;
    const currentGround3 = this.ground3;

    currentGround1.position.z -=
      this.parameters.envScale * this.parameters.groundSize * 3;
    const texture = this.textures[this.currentIndex + 1];
    texture.flipY = !!(this.currentIndex % 2);
    currentGround1.groundUniforms.uTexture.value = texture;
    currentGround1.groundMaskUniforms.uTexture.value = texture;
    Ground.groundElements.setInstanceMatrices(
      this.currentIndex + 1,
      currentGround1.grass,
      currentGround1.flowers
    );

    currentGround1.ground.updateMatrix();
    currentGround1.scale.z = !!(this.currentIndex % 2) ? 1 : -1;
    currentGround1.mask.updateMatrix();

    currentGround1.trees.updateTreesPositions(
      positions.get("treesPositions")[this.currentIndex + 1]
    );
    currentGround1.trees.scale.z = !!(this.currentIndex % 2) ? 1 : -1;

    currentGround1.rocks.updateRocksPositions(
      positions.get("rocksPositions")[this.currentIndex + 1]
    );
    currentGround1.rocks.scale.z = !!(this.currentIndex % 2) ? 1 : -1;

    currentGround1.woodLogs.updateWoodLogsPositions(
      positions.get("woodLogsPositions")[this.currentIndex + 1]
    );
    currentGround1.woodLogs.scale.z = !!(this.currentIndex % 2) ? 1 : -1;

    this.ground1 = currentGround2;
    this.ground2 = currentGround3;
    this.ground3 = currentGround1;

    this.currentIndex++;
    console.timeEnd("switch");
  }

  update() {
    if (
      mainScene.cameraContainer.position.z <= this.ground2.getCenter().z &&
      this.currentIndex < this.groundAmount
    ) {
      this.switchGrounds();
    }
    this.grassUniforms.uTime.value = raf.elapsedTime;

    this.flowersUniforms.uRayPos.value.copy(this.raycasting.rayPos);
    this.riverUniforms.uRayPos.value.copy(this.raycasting.rayPos);
    this.grassUniforms.uRayPos.value.copy(this.raycasting.rayPos);
    this.grassUniforms.uFlipped.value = this.raycasting.groundFlipped;
    this.leafUniforms.uRayPos.value.copy(this.raycasting.rayPos);

    this.flowersUniforms.uTime.value = raf.elapsedTime;
    this.riverUniforms.uTime.value = raf.elapsedTime;

    this.leafUniforms.uTime.value = raf.elapsedTime;
  }
}
