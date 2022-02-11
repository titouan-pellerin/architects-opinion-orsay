import raf from "../utils/Raf";

export class Record {
  static domEl = document.querySelector(".subtitles p");
  /**
   *
   * @param {String} src
   * @param {Number} chapter
   * @param {Array} subtitles
   */
  constructor(src, chapter, subtitles) {
    this.src = src;
    this.chapter = chapter;
    this.subtitles = subtitles;
    this.currentSubtitleIndex = 0;

    this.duration = null;
    this.audio = null;
  }

  init() {
    this.audio = new Audio(this.src);
    if (this.subtitles.length > 1) raf.subscribe("subtitles", this.onPlaying.bind(this));
    return this;
  }

  play() {
    this.audio.play();
    this.updateDomEl();
  }

  onPlaying() {
    console.log(this.audio.currentTime);
    if (this.subtitles[this.currentSubtitleIndex].duration <= this.audio.currentTime) {
      this.currentSubtitleIndex++;
      this.updateDomEl();
    }
  }

  updateDomEl() {
    if (!this.subtitles[this.currentSubtitleIndex]) {
      raf.unsubscribe("subtitles");
      return;
    }
    console.log(this.subtitles[this.currentSubtitleIndex].subtitle);
    Record.domEl.textContent = this.subtitles[this.currentSubtitleIndex].subtitle;
  }
}
