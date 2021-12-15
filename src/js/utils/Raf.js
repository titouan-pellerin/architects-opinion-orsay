import { Clock } from "three";

class Raf {
  constructor() {
    this.functions = new Map();
    this.clock = new Clock();
    this.elapsedTime = 0;
    this.init();
  }

  subscribe(id, fn) {
    this.functions.set(id, fn);
  }

  unsubscribe(id) {
    if (this.functions.has(id)) this.functions.delete(id);
  }

  init() {
    this.update = this.update.bind(this);
    this.update();
  }

  update() {
    requestAnimationFrame(this.update);

    this.elapsedTime = this.clock.getElapsedTime();
    this.functions.forEach((fn) => {
      fn();
    });
  }
}

const raf = new Raf();
export default raf;