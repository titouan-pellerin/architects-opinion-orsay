import { MeshBasicMaterial } from "three";
import { Mesh } from "three";
import { BoxGeometry } from "three";
import { Group } from "three";

export class Cubes extends Group {
  constructor(positions = []) {
    super();
    this.geometry = new BoxGeometry(1, 1, 1);
    this.material = new MeshBasicMaterial({ color: 0xff0000 });
    const cube1 = new Mesh(this.geometry, this.material);
    cube1.position.set(positions[0].x, -2, positions[0].y);
    this.add(cube1);
    for (let i = 1; i < positions.length; i++) {
      const newCube = cube1.clone();
      newCube.position.set(positions[i].x, -2, positions[i].y);
      this.add(newCube);
    }
  }
}
