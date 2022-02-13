import gsap from "gsap";
import raf from "../utils/Raf";

export class Record {
  static domEl = document.querySelector(".subtitles p");
  /**
   *
   * @param {String} src
   * @param {Number} chapter
   * @param {Array} subtitles
   */
  constructor(src, chapter, recordIndex, subtitles) {
    this.src = src;
    this.chapter = chapter;
    this.recordIndex = recordIndex;
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
    if (this.recordIndex === 0) {
      Record.domEl.textContent = this.subtitles[this.currentSubtitleIndex].subtitle;
      gsap.to(Record.domEl, {
        duration: 0.2,
        opacity: 1,
      });
    } else this.updateDomEl();
  }

  onPlaying() {
    if (
      this.subtitles[this.currentSubtitleIndex] &&
      this.subtitles[this.currentSubtitleIndex].duration <= this.audio.currentTime
    ) {
      this.updateDomEl();
    }
  }

  updateDomEl() {
    if (!this.subtitles[this.currentSubtitleIndex]) {
      raf.unsubscribe("subtitles");
      return;
    }
    // console.log(this.subtitles[this.currentSubtitleIndex].subtitle);
    const tween = gsap.to(Record.domEl, {
      duration: 0.2,
      opacity: 0,
      onComplete: () => {
        if (this.subtitles[this.currentSubtitleIndex]) {
          Record.domEl.textContent = this.subtitles[this.currentSubtitleIndex].subtitle;
          this.currentSubtitleIndex++;

          tween.reverse();
        }
      },
    });
  }
}
