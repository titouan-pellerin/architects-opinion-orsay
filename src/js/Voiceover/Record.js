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

    this.isAnimComplete = true;
    this.isHidden = true;

    this.previousDurations = 0;

    this.showTween = gsap
      .to(Record.domEl, {
        duration: 0.2,
        opacity: 1,
        onComplete: () => {
          this.isAnimComplete = true;
          this.isHidden = false;
        },
      })
      .pause();
    this.hideTween = gsap
      .to(Record.domEl, {
        duration: 0.2,
        opacity: 0,
        onComplete: () => {
          this.isAnimComplete = true;
          this.isHidden = true;
          if (this.subtitles[this.currentSubtitleIndex]) this.showSubtitle();
        },
      })
      .pause();
  }

  init() {
    this.audio = new Audio(this.src);
    return this;
  }

  play() {
    this.audio.play();
    raf.subscribe("subtitles", this.onProgress.bind(this));
    this.showSubtitle();
  }

  showSubtitle() {
    console.log("show");
    Record.domEl.textContent = this.subtitles[this.currentSubtitleIndex].subtitle;
    this.isAnimComplete = false;
    this.showTween.restart();
  }

  hideSubtitle() {
    console.log("hide");
    this.isAnimComplete = false;
    this.currentSubtitleIndex++;

    this.hideTween.restart();
  }

  onProgress() {
    if (
      this.isHidden === false &&
      this.isAnimComplete === true &&
      this.audio.currentTime >=
        this.previousDurations + this.subtitles[this.currentSubtitleIndex].duration - 0.2
    ) {
      this.previousDurations += this.subtitles[this.currentSubtitleIndex].duration;
      this.hideSubtitle();
    }
  }
}
