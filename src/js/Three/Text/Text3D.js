import gsap from "gsap";
import Splitting from "splitting";
import "splitting/dist/splitting-cells.css";
import "splitting/dist/splitting.css";

export class Text3D {
  constructor() {
    console.log("subtitles ready");
  }

  createTimeline() {
    Splitting();

    const tl = gsap.timeline();

    for (let i = 1; i <= 10; i++) {
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
        duration: 0.8,
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
