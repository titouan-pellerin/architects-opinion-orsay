import gsap from "gsap";
import raf from "../utils/Raf";

export class Record {
  static domEl = document.querySelector(".subtitles p");
  /**
   *
   * @param {AudioBuffer} buffer
   * @param {Number} chapter
   * @param {Array} subtitles
   */
  constructor(buffer, chapter, recordIndex, subtitles) {
    this.buffer = buffer;
    this.chapter = chapter;
    this.recordIndex = recordIndex;
    this.subtitles = subtitles;
    this.currentSubtitleIndex = 0;

    this.context = null;
    this.duration = null;
    this.source = null;
    this.amp = null;

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

  /**
   *
   * @param {AudioContext} context
   * @returns
   */
  init(context) {
    this.context = context;
    this.source = context.createBufferSource();
    this.amp = context.createGain();

    this.source.buffer = this.buffer;
    this.source.connect(this.amp);
    this.amp.connect(context.destination);
    return this;
  }

  play() {
    this.source.start();
    raf.subscribe("subtitles", this.onProgress.bind(this));
    this.showSubtitle();
  }

  showSubtitle() {
    Record.domEl.textContent = this.subtitles[this.currentSubtitleIndex].subtitle;
    this.isAnimComplete = false;
    this.showTween.restart();
  }

  hideSubtitle() {
    this.isAnimComplete = false;
    this.currentSubtitleIndex++;

    this.hideTween.restart();
  }

  onProgress() {
    if (
      this.isHidden === false &&
      this.isAnimComplete === true &&
      this.context.currentTime >=
        this.previousDurations + this.subtitles[this.currentSubtitleIndex].duration - 0.2
    ) {
      this.previousDurations += this.subtitles[this.currentSubtitleIndex].duration;
      this.hideSubtitle();
    }
  }
}
