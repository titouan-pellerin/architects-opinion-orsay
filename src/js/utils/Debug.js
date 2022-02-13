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

const guiFolders = new Map();
const experienceFolder = gui.addFolder("Experience");
guiFolders.set("experience", experienceFolder);

const cameraFolder = gui.addFolder("Camera");
cameraFolder.close();
guiFolders.set("camera", cameraFolder);

const sceneFolder = gui.addFolder("Scene");
sceneFolder.close();
guiFolders.set("scene", sceneFolder);

const atmosphereFolder = gui.addFolder("Atmosphere");
atmosphereFolder.close();
guiFolders.set("atmosphere", atmosphereFolder);

export { guiFolders, stats };
