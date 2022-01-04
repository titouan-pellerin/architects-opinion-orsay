import { modelsMap } from "../../../utils/assets";
import { Group } from "three";

export class Trees extends Group {
  constructor(positions = []) {
    super();
    const tree1 = modelsMap.get("trees")[0];
    tree1.scale.set(0.1, 0.1, 0.1);

    tree1.traverse(function (node) {
      if (node.isMesh) {
        // console.log(node);
        // node.castShadow = true;
      }

      setTimeout(() => {
        tree1.matrixAutoUpdate = false;
      }, 1);
    });

    tree1.position.set(positions[0].x, -3.5, positions[0].y);
    this.add(tree1);

    for (let i = 1; i < positions.length; i++) {
      const newTree = tree1.clone();
      newTree.position.set(positions[i].x, -3.5, positions[i].y);
      newTree.rotation.set(0, Math.random(), 0);
      this.add(newTree);
    }
  }
}
