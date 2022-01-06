import subtitles from "../../../../public/assets/subtitles.json";
import gsap from "gsap";

export class Subtitles {
  constructor() {
    this.text = document.querySelector(".words");
  }

  createElements() {
    for (let i = 0; i < subtitles.length; i++) {
      const paragraph = document.createElement("p");
      paragraph.className = `p${i} words`;

      const splitted = subtitles[i].content.split(/\s+/);
      for (let j = 0; j < splitted.length; j++) {
        const span = document.createElement("span");
        span.className = "char";
        const letter = document.createTextNode(`${splitted[j]} `);
        span.appendChild(letter);
        paragraph.appendChild(span);
      }
      document.body.appendChild(paragraph);
    }
  }

  createTimeline() {
    this.createElements();

    const tl = gsap.timeline();

    for (let i = 0; i < subtitles.length; i++) {
      tl.to(`.p${i} .char`, {
        duration: subtitles[i].duration,
        delay: subtitles[i].duration,
        opacity: 1,
        ease: "none",
        stagger: {
          from: "random",
          amount: 0.7,
        },
      });

      tl.to(`.p${i} .char`, {
        duration: subtitles[i].duration,
        delay: subtitles[i].duration,
        opacity: 0,
        ease: "none",
        stagger: {
          from: "random",
          amount: 0.7,
        },
      });
    }
  }
}
