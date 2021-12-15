import GUI from "lil-gui";

export const gui = new GUI();
if (!location.hash.includes("debug")) {
  gui.domElement.style.display = "none";
}
