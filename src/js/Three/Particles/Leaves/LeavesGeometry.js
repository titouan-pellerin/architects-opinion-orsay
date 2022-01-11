import { BufferAttribute, BufferGeometry } from "three";

export class LeavesGeometry extends BufferGeometry {
  constructor(amount, textureWidth) {
    super();

    // const plane = new PlaneGeometry(1, 1);
    // console.log(plane.getAttribute("position"));
    // console.log(plane.getAttribute("uv"));

    const trianglesPerLeaf = 2;
    const triangles = amount * trianglesPerLeaf;
    const points = triangles * 3;

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
      const i12 = i * 12;
      const randomScale = Math.random() * (1.6 - 0.15) + 0.15;

      // First triangle

      vertices.array[i18] = -randomScale;
      vertices.array[i18 + 1] = randomScale;
      vertices.array[i18 + 2] = 0;

      uvs.array[i12] = 0;
      uvs.array[i12 + 1] = 1;

      vertices.array[i18 + 3] = randomScale;
      vertices.array[i18 + 4] = randomScale;
      vertices.array[i18 + 5] = 0;

      uvs.array[i12 + 2] = 1;
      uvs.array[i12 + 3] = 1;

      vertices.array[i18 + 6] = -randomScale;
      vertices.array[i18 + 7] = -randomScale;
      vertices.array[i18 + 8] = 0;

      uvs.array[i12 + 4] = 0;
      uvs.array[i12 + 5] = 0;

      // Second triangle

      vertices.array[i18 + 9] = -randomScale;
      vertices.array[i18 + 10] = -randomScale;
      vertices.array[i18 + 11] = 0;

      uvs.array[i12 + 6] = 0;
      uvs.array[i12 + 7] = 0;

      vertices.array[i18 + 12] = randomScale;
      vertices.array[i18 + 13] = randomScale;
      vertices.array[i18 + 14] = 0;

      uvs.array[i12 + 8] = 1;
      uvs.array[i12 + 9] = 1;

      vertices.array[i18 + 15] = randomScale;
      vertices.array[i18 + 16] = -randomScale;
      vertices.array[i18 + 17] = 0;

      uvs.array[i12 + 10] = 1;
      uvs.array[i12 + 11] = 0;
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

    this.scale(0.08, 0.08, 0.08);
  }
}
