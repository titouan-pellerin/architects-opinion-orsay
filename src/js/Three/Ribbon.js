import raf from "../utils/Raf";
import * as THREE from "three";

export class Ribbon {
  constructor() {
    this.geometry = new THREE.PlaneGeometry(5, 5, 1, 30);
    this.m = new THREE.MeshPhysicalMaterial({
      color: 0xff0000 * Math.random(),
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.m);
    this.mesh.dynamic = true;
    this.speed = 1;
    this.width = 1;
    this.travel = 0;
    this.position = new THREE.Vector3(0, 0, 0);
    raf.subscribe("ribbon", this.update.bind(this));
  }

  update() {
    // console.log("target", target);
    const time = raf.elapsedTime / 2;

    this.pp = [...this.geometry.attributes.position.array];

    for (let j = 0; j < 6; j++) {
      this.pp.pop();
    }

    // Comment this part
    this.position.x = Math.sin(time * 5.5) * (4 + Math.sin(time * 7));
    this.position.y = Math.cos(time * 3) * (3 + Math.sin(time * 5));

    // this.nextPos = new THREE.Vector3().lerpVectors(this.position, target, 0.1);
    // this.travel += this.nextPos.distanceTo(this.position);
    // this.position = this.nextPos;

    // let rot = [
    //   (Math.sin(this.travel / 5) * this.width) / 2,
    //   (Math.cos(this.travel / 5) * this.width) / 2,
    // ];

    const rot = [
      (Math.sin(time / 5) * this.width) / 2,
      (Math.cos(time / 5) * this.width) / 2,
    ];

    this.position.z = 3 * Math.sin(time / 5);

    this.pp.unshift(
      this.position.x + rot[0],
      this.position.y + time * 0,
      this.position.z + rot[1],
    );
    this.pp.unshift(
      this.position.x - rot[0],
      this.position.y + time * 0,
      this.position.z - rot[1],
    );

    this.geometry.attributes.position.array = new Float32Array(this.pp);
    this.geometry.attributes.position.needsUpdate = true;

    this.geometry.computeVertexNormals();
  }
}
