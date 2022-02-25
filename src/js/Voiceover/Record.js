import gsap from "gsap";
import { PositionalAudio } from "three";
import raf from "../utils/Raf";

export class Record {
  static domEl = document.querySelector(".content-subtitles p");
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

    this.audio = null;
    this.startTime = 0;

    this.isAnimComplete = true;
    this.isHidden = true;

    this.previousDurations = 0;
    this.pausedTime = 0;

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
   * @param {AudioListener} audioListener
   * @returns
   */
  init(audioListener) {
    this.audioListener = audioListener;
    this.audio = new PositionalAudio(audioListener);
    this.audio.setRefDistance(60);
    this.audio.setRolloffFactor(0);
    this.audio.setBuffer(this.buffer);
    this.audio.setVolume(0.7);

    return this;
  }

  play() {
    this.currentSubtitleIndex = 0;
    this.startTime = this.audio.context.currentTime;
    this.audio.play();

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
      this.audio.context.currentTime - this.startTime + this.pausedTime >=
        this.previousDurations + this.subtitles[this.currentSubtitleIndex].duration - 0.2
    ) {
      this.previousDurations += this.subtitles[this.currentSubtitleIndex].duration;
      this.hideSubtitle();
    }
  }

  pause() {
    this.pausedTime = this.audio.context.currentTime;
    raf.unsubscribe("subtitles");
  }

  resume() {
    this.pausedTime -= this.audio.context.currentTime;
    raf.subscribe("subtitles", this.onProgress.bind(this));
  }
}
