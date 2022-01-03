import { PlaneGeometry } from "three";
import { BufferAttribute } from "three";
import { BufferGeometry } from "three";

export class LeavesGeometry extends BufferGeometry {
  constructor(amount, textureWidth) {
    super();

    const plane = new PlaneGeometry(1, 1);
    console.log(plane.getAttribute("position"));
    console.log(plane.getAttribute("uv"));

    const trianglesPerLeaf = 3;
    const triangles = amount * trianglesPerLeaf;
    const points = triangles * 2;

    const vertices = new BufferAttribute(new Float32Array(points * 3), 3);
    const uvs = new BufferAttribute(new Float32Array(points * 2), 2);
    const references = new BufferAttribute(new Float32Array(points * 2), 2);
    const leafVertex = new BufferAttribute(new Float32Array(points), 1);

    this.setAttribute("position", vertices);
    this.setAttribute("uv", uvs);
    this.setAttribute("reference", references);
    this.setAttribute("leafVertex", leafVertex);

    for (let i = 0; i < amount; i++) {
      const i18 = i * 18;
      const i8 = i * 8;

      // verts_push(0, 0, -0.75, -1, 0, 0, 0, 0, 0.75);
      // verts_push(0, 0, 0.75, 1, 0, 0, 0, 0, -0.75);
      // First triangle

      vertices.array[i18] = -0.5;
      vertices.array[i18 + 1] = 0.5;
      vertices.array[i18 + 2] = 0;

      uvs.array[i8] = 0;
      uvs.array[i8 + 1] = 1;

      vertices.array[i18 + 3] = 0.5;
      vertices.array[i18 + 4] = 0.5;
      vertices.array[i18 + 5] = 0;

      uvs.array[i8 + 2] = 1;
      uvs.array[i8 + 3] = 1;

      vertices.array[i18 + 6] = -0.5;
      vertices.array[i18 + 7] = -0.5;
      vertices.array[i18 + 8] = 0;

      uvs.array[i8 + 4] = 0;
      uvs.array[i8 + 5] = 0;

      // Second triangle
      vertices.array[i18 + 9] = 0.5;
      vertices.array[i18 + 10] = -0.5;
      vertices.array[i18 + 11] = 0;

      uvs.array[i8 + 6] = 1;
      uvs.array[i8 + 7] = 0;

      // vertices.array[i12 + 12] = 1;
      // vertices.array[i12 + 13] = 0;
      // vertices.array[i12 + 14] = 0;

      // uvs.array[i12 + 8] = 1;
      // uvs.array[i12 + 9] = 0.5;

      // vertices.array[i12 + 15] = 0;
      // vertices.array[i12 + 16] = 0;
      // vertices.array[i12 + 17] = -1;

      // uvs.array[i12 + 10] = 0.5;
      // uvs.array[i12 + 11] = 0;
    }

    for (let v = 0; v < triangles * 3; v++) {
      const triangleIndex = ~~(v / 3);
      const leafIndex = ~~(triangleIndex / trianglesPerLeaf);
      const x = (leafIndex % textureWidth) / textureWidth;
      const y = ~~(leafIndex / textureWidth) / textureWidth;
      references.array[v * 2] = x;
      references.array[v * 2 + 1] = y;

      leafVertex.array[v] = v % 9;
    }

    this.scale(0.2, 0.2, 0.2);
  }
}
