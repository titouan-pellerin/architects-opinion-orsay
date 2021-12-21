import { BufferAttribute } from "three";
import { BufferGeometry } from "three";

export class LeavesGeometry extends BufferGeometry {
  constructor(amount, textureWidth) {
    super();

    const trianglesPerLeaf = 3;
    const triangles = amount * trianglesPerLeaf;
    const points = triangles * 3;

    const vertices = new BufferAttribute(new Float32Array(points * 3), 3);
    // const birdColors = new BufferAttribute(new Float32Array(points * 3), 3);
    const references = new BufferAttribute(new Float32Array(points * 2), 2);
    const leafVertex = new BufferAttribute(new Float32Array(points), 1);

    this.setAttribute("position", vertices);
    // this.setAttribute("birdColor", birdColors);
    this.setAttribute("reference", references);
    this.setAttribute("leafVertex", leafVertex);

    let v = 0;

    function verts_push() {
      for (let i = 0; i < arguments.length; i++) {
        vertices.array[v++] = arguments[i];
      }
    }

    for (let f = 0; f < amount; f++) {
      // Body

      verts_push(0, -0, -1, 0, 0.2, -1, 0, 0, 1.5);

      // Wings

      verts_push(0, 0, -0.75, -1, 0, 0, 0, 0, 0.75);

      verts_push(0, 0, 0.75, 1, 0, 0, 0, 0, -0.75);
    }

    for (let v = 0; v < triangles * 3; v++) {
      const triangleIndex = ~~(v / 3);
      const leafIndex = ~~(triangleIndex / trianglesPerLeaf);
      const x = (leafIndex % textureWidth) / textureWidth;
      const y = ~~(leafIndex / textureWidth) / textureWidth;

      //   const c = new Color(0x444444 + (~~(v / 9) / amount) * 0x666666);

      //   birdColors.array[v * 3 + 0] = c.r;
      //   birdColors.array[v * 3 + 1] = c.g;
      //   birdColors.array[v * 3 + 2] = c.b;

      references.array[v * 2] = x;
      references.array[v * 2 + 1] = y;

      leafVertex.array[v] = v % 9;
    }

    this.scale(0.2, 0.2, 0.2);
  }
}
