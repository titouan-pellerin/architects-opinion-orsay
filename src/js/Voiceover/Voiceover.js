import { records } from "../utils/assets";
import { Record } from "./Record";
import subtitles from "./subtitles.json";

export class Voiceover {
  constructor() {
    this.recordsByChapter = [];
    this.currentChapter;
    this.currentRecord;
    this.chapterIndex = 0;
    this.recordIndex = 0;

    for (let i = 0; i < records.length; i++) {
      const currentChapter = [];
      for (let j = 0; j < records[i].length; j++) {
        currentChapter.push(new Record(records[i][j], i, subtitles[i][j]));
      }
      this.recordsByChapter.push(currentChapter);
    }
    this.recordsByChapter[0][0].init();

    // this.playChapter(0);
  }

  playChapter(index = this.chapterIndex) {
    this.currentChapter = this.recordsByChapter[index];
    this.playRecord(0);
    this.chapterIndex++;
  }

  playRecord(index = this.recordIndex) {
    const nextRecord = this.currentChapter[index + 1]
      ? this.currentChapter[index + 1].init()
      : null;

    this.currentRecord = this.currentChapter[index];
    if (!this.currentRecord.audio) this.currentRecord.init();
    this.currentRecord.play();
    if (nextRecord) {
      this.recordIndex++;
      this.currentRecord.audio.onended = () => {
        this.playRecord(this.recordIndex);
      };
    } else this.recordIndex = 0;
  }
}
