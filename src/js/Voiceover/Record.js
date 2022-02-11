export class Record {
  constructor(src, chapter) {
    this.src = src;
    this.chapter = chapter;

    this.duration = null;
    this.audio = null;
  }

  init() {
    this.audio = new Audio(this.src);
    return this;
  }
}
