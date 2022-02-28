import { Color, Group, Line, Vector3 } from "three";
import { mainScene } from "../../../main";
import { texturesMap } from "../../utils/assets";
import { guiFolders } from "../../utils/Debug";
import { positions } from "../../utils/positions";
import raf from "../../utils/Raf";
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
  constructor(parameters = {}, forestPathLine, artworks, raycasting) {
    super();
    this.forestPathLine = forestPathLine;
    this.groundIndex = 1;
    this.parameters = parameters;
    this.raycasting = raycasting;

    this.textures = texturesMap.get("curveTextures");

    this.grassUniforms = {
      uTime: { value: 0 },
      uColor: { value: new Color("#84b15a") },
      uColor2: { value: new Color("#236760") },
      uDisplaceIntensity: { value: 0.25 },
      uSpeed: { value: 1 },
      uRayPos: { value: new Vector3() },
      uFlipped: { value: 1 },
    };

    this.flowersUniforms = {
      uTime: { value: 0 },
      uDisplaceIntensity: { value: 0.25 },
      uSpeed: { value: 1 },
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
      uColor2: { value: new Color("#4a9e36") },
      uDisplaceIntensity: { value: 0.25 },
      uSpeed: { value: 1 },
      uRayPos: { value: new Vector3() },
    };

    const dustParticles = new Dust();
    const leafParticles = new Leaf();
    const butterflyParticles = new Butterfly();

    // Ground 1
    this.ground1 = new Ground(
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
      this.ground1.grass,
      this.ground1.flowers
    );

    this.ground1.trees.setTrees(positions.get("treesPositions")[0]);
    this.ground1.rocks.setRocks(positions.get("rocksPositions")[0]);
    this.ground1.woodLogs.setWoodLogs(positions.get("woodLogsPositions")[0]);

    const dustParticlesMesh1 = dustParticles.object.mesh;
    const leafParticlesMesh1 = leafParticles.object.mesh;
    const butterflyParticlesMesh1 = butterflyParticles.object.mesh;
    const butterflyParticlesMirrorMesh1 = butterflyParticles.object.mirrorMesh;

    // this.ground1.add(
    //   dustParticlesMesh1,
    //   leafParticlesMesh1,
    //   butterflyParticlesMesh1,
    //   butterflyParticlesMirrorMesh1
    // );
    mainScene.add(
      dustParticlesMesh1,
      butterflyParticlesMesh1,
      butterflyParticlesMirrorMesh1
    );

    // Ground 2
    this.ground2 = new Ground(
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
      this.ground2.grass,
      this.ground2.flowers
    );

    this.ground2.trees.setTrees(positions.get("treesPositions")[1]);
    this.ground2.rocks.setRocks(positions.get("rocksPositions")[1]);
    this.ground2.woodLogs.setWoodLogs(positions.get("woodLogsPositions")[1]);

    this.ground2.texture.flipY = false;
    this.ground2.scale.z = -1;
    this.ground2.trees.scale.z = -1;
    this.ground2.rocks.scale.z = -1;
    this.ground2.woodLogs.scale.z = -1;
    this.ground2.position.z = -parameters.envScale * parameters.groundSize;

    const leafParticlesMesh2 = leafParticlesMesh1.clone();
    const dustParticlesMesh2 = dustParticlesMesh1.clone();
    const butterflyParticlesMesh2 = butterflyParticlesMesh1.clone();
    const butterflyParticlesMirrorMesh2 = butterflyParticlesMirrorMesh1.clone();
    dustParticlesMesh2.scale.z = -1;
    leafParticlesMesh2.scale.z = -1;
    butterflyParticlesMesh2.scale.z = -1;
    butterflyParticlesMirrorMesh2.scale.z = -1;

    // this.ground2.add(
    //   leafParticlesMesh2,
    //   dustParticlesMesh2,
    //   butterflyParticlesMesh2,
    //   butterflyParticlesMirrorMesh2
    // );

    this.ground3 = new Ground(
      this.textures[2],
      this.grassUniforms,
      this.flowersUniforms,
      this.riverUniforms,
      this.leafUniforms,
      forestPathLine,
      parameters
    );
    this.ground3.position.z = -parameters.envScale * parameters.groundSize * 2;

    Ground.groundElements.setInstanceMatrices(
      2,
      this.ground3.grass,
      this.ground3.flowers
    );

    this.ground3.trees.setTrees(positions.get("treesPositions")[2]);
    this.ground3.rocks.setRocks(positions.get("rocksPositions")[2]);
    this.ground3.woodLogs.setWoodLogs(positions.get("woodLogsPositions")[2]);

    const leafParticlesMesh3 = leafParticlesMesh1.clone();
    const dustParticlesMesh3 = dustParticlesMesh1.clone();
    const butterflyParticlesMesh3 = butterflyParticlesMesh1.clone();
    const butterflyParticlesMirrorMesh3 = butterflyParticlesMirrorMesh1.clone();
    dustParticlesMesh3.updateMatrix();
    leafParticlesMesh3.updateMatrix();
    butterflyParticlesMesh3.updateMatrix();
    butterflyParticlesMirrorMesh3.updateMatrix();

    // this.ground3.add(
    //   leafParticlesMesh3,
    //   dustParticlesMesh3,
    //   butterflyParticlesMesh3,
    //   butterflyParticlesMirrorMesh3
    // );

    this.ground4 = new Ground(
      this.textures[3],
      this.grassUniforms,
      this.flowersUniforms,
      this.riverUniforms,
      this.leafUniforms,
      forestPathLine,
      parameters
    );
    Ground.groundElements.setInstanceMatrices(
      3,
      this.ground4.grass,
      this.ground4.flowers
    );

    this.ground4.trees.setTrees(positions.get("treesPositions")[3]);
    this.ground4.rocks.setRocks(positions.get("rocksPositions")[3]);
    this.ground4.woodLogs.setWoodLogs(positions.get("woodLogsPositions")[3]);

    this.ground4.texture.flipY = false;
    this.ground4.trees.scale.z = -1;
    this.ground4.rocks.scale.z = -1;
    this.ground4.woodLogs.scale.z = -1;
    this.ground4.scale.z = -1;
    this.ground4.position.z = -parameters.envScale * parameters.groundSize * 3;

    const leafParticlesMesh4 = leafParticlesMesh1.clone();
    const dustParticlesMesh4 = dustParticlesMesh1.clone();
    const butterflyParticlesMesh4 = butterflyParticlesMesh1.clone();
    const butterflyParticlesMirrorMesh4 = butterflyParticlesMirrorMesh1.clone();
    dustParticlesMesh3.scale.z = -1;
    leafParticlesMesh3.scale.z = -1;
    butterflyParticlesMesh3.scale.z = -1;
    butterflyParticlesMirrorMesh3.scale.z = -1;

    // this.ground4.add(
    //   leafParticlesMesh4,
    //   dustParticlesMesh4,
    //   butterflyParticlesMesh4,
    //   butterflyParticlesMirrorMesh4
    // );

    this.ground5 = new Ground(
      this.textures[4],
      this.grassUniforms,
      this.flowersUniforms,
      this.riverUniforms,
      this.leafUniforms,
      forestPathLine,
      parameters
    );
    this.ground5.position.z = -parameters.envScale * parameters.groundSize * 4;

    Ground.groundElements.setInstanceMatrices(
      4,
      this.ground5.grass,
      this.ground5.flowers
    );
    // Ground.groundElements.curveTexturesData = null;
    // Ground.groundElements.curveTexturesMatrices = null;

    this.ground5.trees.setTrees(positions.get("treesPositions")[4]);
    this.ground5.rocks.setRocks(positions.get("rocksPositions")[4]);
    this.ground5.woodLogs.setWoodLogs(positions.get("woodLogsPositions")[4]);

    const leafParticlesMesh5 = leafParticlesMesh1.clone();
    const dustParticlesMesh5 = dustParticlesMesh1.clone();
    const butterflyParticlesMesh5 = butterflyParticlesMesh1.clone();
    const butterflyParticlesMirrorMesh5 = butterflyParticlesMirrorMesh1.clone();

    // this.ground5.add(
    //   leafParticlesMesh5,
    //   dustParticlesMesh5,
    //   butterflyParticlesMesh5,
    //   butterflyParticlesMirrorMesh5
    // );

    this.raycasting.spheresToRaycast[0] = this.ground1.trees.spheresToRaycast;
    this.raycasting.spheresToRaycast[1] = this.ground2.trees.spheresToRaycast;
    this.raycasting.groundsToRaycast = [this.ground1.ground, this.ground2.ground];

    this.groundsArray = [
      this.ground1,
      this.ground2,
      this.ground3,
      this.ground4,
      this.ground5,
    ];
    this.add(this.ground1, this.ground2, this.ground3, this.ground4, this.ground5);
    this.ground3.visible = false;
    this.ground4.visible = false;
    this.ground5.visible = false;
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
    console.log(mainScene.cameraContainer.position.z);
    this.groundsArray
      .filter((ground) => ground.visible)
      .forEach((ground) => (ground.visible = false));

    this.groundsArray[this.groundIndex].visible = true;
    this.groundsArray[this.groundIndex + 1].visible = true;
    this.groundsArray[this.groundIndex].updateMatrix();
    this.groundsArray[this.groundIndex + 1].updateMatrix();

    this.raycasting.spheresToRaycast[0] =
      this.groundsArray[this.groundIndex].trees.spheresToRaycast;
    this.raycasting.spheresToRaycast[1] =
      this.groundsArray[this.groundIndex + 1].trees.spheresToRaycast;

    this.raycasting.groundsToRaycast[0] = this.groundsArray[this.groundIndex].ground;
    this.raycasting.groundsToRaycast[1] = this.groundsArray[this.groundIndex + 1].ground;

    this.groundIndex++;
  }

  update() {
    if (
      mainScene.cameraContainer.position.z <=
      this.groundsArray[this.groundIndex].position.z +
        this.parameters.envScale * this.parameters.groundSize * 0.5
    )
      this.switchGrounds();

    this.grassUniforms.uTime.value = raf.elapsedTime;

    this.flowersUniforms.uRayPos.value.copy(this.raycasting.groundRayPos);
    this.riverUniforms.uRayPos.value.copy(this.raycasting.groundRayPos);
    this.grassUniforms.uRayPos.value.copy(this.raycasting.groundRayPos);
    this.grassUniforms.uFlipped.value = this.raycasting.groundFlipped;
    this.leafUniforms.uRayPos.value.copy(this.raycasting.leavesRayPos);

    this.flowersUniforms.uTime.value = raf.elapsedTime;
    this.riverUniforms.uTime.value = raf.elapsedTime;
    this.leafUniforms.uTime.value = raf.elapsedTime;
  }
}
