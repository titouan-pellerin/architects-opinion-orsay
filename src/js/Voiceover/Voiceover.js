import gsap from "gsap";
import { records } from "../utils/assets";
import raf from "../utils/Raf";
import { Record } from "./Record";
import subtitles from "./subtitles.json";

export class Voiceover {
  constructor() {
    this.recordsByChapter = [];
    this.currentChapter;
    this.currentRecord;
    this.nextRecord;
    this.currentRecordSource;
    this.chapterIndex = 0;
    this.recordIndex = 0;

    this.volume = { level: 0.5 };

    this.audioListener = null;

    for (let i = 0; i < records.length; i++) {
      const currentChapter = [];
      for (let j = 0; j < records[i].length; j++) {
        currentChapter.push(new Record(records[i][j], i, j, subtitles[i][j]));
      }
      this.recordsByChapter.push(currentChapter);
    }
  }

  init(audioListener) {
    this.audioListener = audioListener;
    this.recordsByChapter[0][0].init(audioListener);
  }

  playChapter(index = this.chapterIndex) {
    if (this.recordsByChapter[index]) {
      this.currentChapter = this.recordsByChapter[index];
      if (this.currentRecord) {
        // Reset record
        this.recordIndex = 0;
        this.currentRecord.audio.source.onended = null;
        this.currentRecord.audio = null;
        this.currentRecord = this.currentChapter[0].init(this.audioListener);
      }
      this.playRecord(0);
      this.chapterIndex++;
    }
  }

  playRecord(index) {
    if (this.currentRecord && this.currentRecord.audio) this.currentRecord.audio.pause();
    this.nextRecord = this.currentChapter[index + 1]
      ? this.currentChapter[index + 1].init(this.audioListener)
      : null;
    this.currentRecord = this.currentChapter[index];
    this.currentRecord.currentSubtitleIndex = 0;
    if (!this.currentRecord.audio) this.currentRecord.init(this.audioListener);
    this.currentRecord.play();

    this.currentRecord.audio.source.onended = this.onRecordEnded.bind(this);
  }

  onRecordEnded() {
    if (this.nextRecord) {
      this.recordIndex++;
      this.playRecord(this.recordIndex);
    } else {
      raf.unsubscribe("subtitles");
      this.recordIndex = 0;
      gsap.to(".btn-next_container .text", {
        duration: 1,
        opacity: 1,
        pointerEvents: "all",
      });
    }

    // });
  }

  pause() {
    gsap.to(this.volume, {
      duration: 0.5,
      level: 0,
      onUpdate: () => {
        this.currentRecord.audio.setVolume(this.volume.level);
      },
      onComplete: () => {
        this.currentRecord.audio.pause();
      },
    });
    this.currentRecord.pause();
  }

  resume() {
    this.currentRecord.audio.play();
    this.currentRecord.audio.source.onended = this.onRecordEnded.bind(this);

    gsap.to(this.volume, {
      duration: 0.5,
      level: 0.9,
      onUpdate: () => {
        this.currentRecord.audio.setVolume(this.volume.level);
      },
    });

    this.currentRecord.resume();
  }
}
