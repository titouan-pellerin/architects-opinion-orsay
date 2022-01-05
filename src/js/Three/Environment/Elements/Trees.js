import { modelsMap } from "../../../utils/assets";
import { Group } from "three";

export class Trees extends Group {
  constructor(positions = []) {
    super();
    const tree1 = modelsMap.get("trees")[0];
    const tree2 = modelsMap.get("trees")[1];
    tree1.scale.set(0.1, 0.1, 0.1);
    tree2.scale.set(0.1, 0.1, 0.1);

    // tree1.traverse(function (node) {
    //   if (node.isMesh) {
    //     // console.log(node);
    //     node.castShadow = true;
    //   }
    // });
    // tree2.traverse(function (node) {
    //   if (node.isMesh) {
    //     // console.log(node);
    //     node.castShadow = true;
    //   }
    // });
    tree1.matrixAutoUpdate = false;
    tree2.matrixAutoUpdate = false;

    tree1.position.set(positions[0].x, -3.5, positions[0].y);
    tree2.position.set(positions[1].x, -3.5, positions[1].y);
    tree1.updateMatrix();
    tree2.updateMatrix();
    this.add(tree1, tree2);

    for (let i = 2; i < positions.length; i++) {
      const newTree = i % 2 === 0 ? tree1.clone() : tree2.clone();

      newTree.position.set(positions[i].x, -4, positions[i].y);
      newTree.rotation.set(
        (Math.random() - 0.5) * 0.2 * Math.PI,
        Math.random() * Math.PI,
        (Math.random() - 0.5) * 0.2 * Math.PI
      );
      const randomScale = Math.random() * (0.1 - 0.03) + 0.03;
      newTree.scale.set(randomScale, randomScale, randomScale);
      newTree.updateMatrix();
      this.add(newTree);
    }
  }
}
