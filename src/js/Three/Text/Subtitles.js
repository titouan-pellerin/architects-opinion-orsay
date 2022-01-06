import subtitles from "./subtitles.json";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";

export class Subtitles {
  constructor() {
    this.text = document.querySelector(".words");
    gsap.registerPlugin(TextPlugin);
  }

  createElements() {
    for (let i = 0; i < subtitles.length; i++) {
      const paragraph = document.createElement("p");
      paragraph.className = `p${i} words`;

      for (let j = 0; j < subtitles[i].content.length; j++) {
        const span = document.createElement("span");
        span.className = "char";
        const letter = document.createTextNode(subtitles[i].content[j]);
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
        duration: 2,
        delay: 2,
        opacity: 1,
        ease: "none",
        stagger: {
          from: "random",
          amount: 0.7,
        },
      });

      tl.to(`.p${i} .char`, {
        duration: 2,
        delay: 3,
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
