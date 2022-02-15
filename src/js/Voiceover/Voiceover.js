import { records } from "../utils/assets";
import raf from "../utils/Raf";
import { Record } from "./Record";
import subtitles from "./subtitles.json";

export class Voiceover {
  constructor() {
    this.recordsByChapter = [];
    this.currentChapter;
    this.currentRecord;
    this.chapterIndex = 0;
    this.recordIndex = 0;

    this.audioListener = null;

    for (let i = 0; i < records.length; i++) {
      const currentChapter = [];
      for (let j = 0; j < records[i].length; j++) {
        currentChapter.push(new Record(records[i][j], i, j, subtitles[i][j]));
      }
      this.recordsByChapter.push(currentChapter);
    }

    // this.playChapter(0);
  }

  init(audioListener) {
    this.audioListener = audioListener;
    this.recordsByChapter[0][0].init(audioListener);
  }

  playChapter(index = this.chapterIndex) {
    this.audioListener.context.resume();
    this.currentChapter = this.recordsByChapter[index];
    this.recordIndex = 0;
    this.playRecord(0);
    this.chapterIndex++;
  }

  playRecord(index = this.recordIndex) {
    if (this.currentRecord && this.currentRecord.audio) this.currentRecord.audio.pause();
    const nextRecord = this.currentChapter[index + 1]
      ? this.currentChapter[index + 1].init(this.audioListener)
      : null;
    this.currentRecord = this.currentChapter[index];
    if (!this.currentRecord.audio) this.currentRecord.init(this.audioListener);
    this.currentRecord.play();
    this.currentRecord.audio.source.onended = () => {
      this.currentRecord.audio.isPlaying = false;
      if (nextRecord) {
        this.recordIndex++;
        this.playRecord(this.recordIndex);
      } else {
        this.audioListener.context.suspend();
        raf.unsubscribe("subtitles");
        this.recordIndex = 0;
      }
    };
  }
}
