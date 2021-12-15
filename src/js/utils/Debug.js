import GUI from "lil-gui";
import Stats from "stats.js";

const gui = new GUI();
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
if (!location.hash.includes("debug")) {
  gui.domElement.style.display = "none";
  document.body.removeChild(stats.dom);
}

export { gui, stats };
