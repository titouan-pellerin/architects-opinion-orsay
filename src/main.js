import "./styles/style.scss";
import Experience from "./Experience/Experience";

const experience = new Experience({
  targetElement: document.querySelector("#app"),
  canvas: document.querySelector(".webgl"),
});
