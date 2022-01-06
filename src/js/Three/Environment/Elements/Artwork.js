import { DoubleSide, MeshBasicMaterial } from "three";
import { MeshToonMaterial } from "three";
import { PlaneGeometry } from "three";
import { Mesh } from "three";
import { Group } from "three";

export class Artwork extends Group {
  constructor(texture, position, envScale) {
    super();

    this.artworkBasicMaterial = new MeshToonMaterial({
      side: DoubleSide,
    });
    this.artworkMaterial = new MeshBasicMaterial({
      map: texture,
      side: DoubleSide,
    });
    this.artworkGeometry = new PlaneGeometry();

    this.outerMesh = new Mesh(this.artworkGeometry, this.artworkBasicMaterial);
    // this.outerMesh.scale.set(1 * 2.75, 1.0198 * 2.75, 1 * 2.75);
    this.outerMesh.scale.set(
      3.3,
      (texture.image.height * 3.3) / texture.image.width,
      3.3
    );

    this.innerMesh = new Mesh(this.artworkGeometry, this.artworkMaterial);
    this.innerMesh.scale.set(3, (texture.image.height * 3) / texture.image.width, 2);
    // this.innerMesh.scale.set(1 * 2.35, 1.0198 * 2.35, 1 * 2.35);
    this.innerMesh.position.z = 0.001;

    // this.add(this.innerMesh, this.outerMesh);
    // this.scale.set(0.85, 0.85, 0.85);
    this.position.set(position.x * envScale, -1.5, position.y * envScale);
    // this.position.set(0, -1.5, -10);

    this.outerMesh.matrixAutoUpdate = false;
    this.innerMesh.matrixAutoUpdate = false;
    this.outerMesh.updateMatrix();
    this.innerMesh.updateMatrix();
    this.add(this.innerMesh, this.outerMesh);
  }
}
