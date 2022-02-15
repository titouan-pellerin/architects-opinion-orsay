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

    this.context = null;

    for (let i = 0; i < records.length; i++) {
      const currentChapter = [];
      for (let j = 0; j < records[i].length; j++) {
        currentChapter.push(new Record(records[i][j], i, j, subtitles[i][j]));
      }
      this.recordsByChapter.push(currentChapter);
    }

    // this.playChapter(0);
  }

  init(context) {
    this.context = context;
    this.recordsByChapter[0][0].init(context);
  }

  playChapter(index = this.chapterIndex) {
    this.currentChapter = this.recordsByChapter[index];
    this.recordIndex = 0;
    this.playRecord(0);
    this.chapterIndex++;
  }

  playRecord(index = this.recordIndex) {
    if (this.currentRecord && this.currentRecord.source) this.currentRecord.source.stop();
    const nextRecord = this.currentChapter[index + 1]
      ? this.currentChapter[index + 1].init(this.context)
      : null;
    this.currentRecord = this.currentChapter[index];
    if (!this.currentRecord.source) this.currentRecord.init(this.context);
    this.currentRecord.play();
    if (nextRecord) {
      this.recordIndex++;
      this.currentRecord.source.onended = () => {
        this.playRecord(this.recordIndex);
      };
    } else this.recordIndex = 0;
  }
}
