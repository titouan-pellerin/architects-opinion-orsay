import { gltfLoader, textureLoader } from "./Loader";
import { sRGBEncoding } from "three";

const texturesMap = new Map();
const modelsMap = new Map();

// const groundDisplacement = textureLoader.load("/assets/ground/displacement.jpg");
// texturesMap.set("groundDisplacement", groundDisplacement);

// const groundAo = textureLoader.load("/assets/ground/ao.jpg");
// texturesMap.set("groundAo", groundAo);

// const groundMap = textureLoader.load("/assets/ground/map.jpg");
// texturesMap.set("groundMap", groundMap);

// const groundNormal = textureLoader.load("/assets/ground/normal.jpg");
// texturesMap.set("groundNormal", groundNormal);

const curveTexture1 = textureLoader.load("/assets/curve/texture1.png");
const curveTexture2 = textureLoader.load("/assets/curve/texture2.png");
const curveTexture3 = textureLoader.load("/assets/curve/texture3.png");
// const curveTexture4 = textureLoader.load("/assets/curve/texture4.png");
// const curveTexture5 = textureLoader.load("/assets/curve/texture5.png");

texturesMap.set("curveTextures", [
  curveTexture1,
  curveTexture2,
  curveTexture3,
  // curveTexture4,
  // curveTexture5,
]);

const noise = textureLoader.load("/assets/noise.jpg");
texturesMap.set("noiseTexture", [noise]);

const oeuvre = textureLoader.load("/assets/oeuvres/1.jpeg");
oeuvre.encoding = sRGBEncoding;
texturesMap.set("oeuvreTexture", [oeuvre]);

const oeuvre2 = textureLoader.load("/assets/oeuvres/2.jpeg");
oeuvre2.encoding = sRGBEncoding;
texturesMap.set("oeuvre2Texture", [oeuvre2]);

const trees = [];
gltfLoader.load("/assets/models/tree_orsay8.glb", (gltf) => {
  trees.push(gltf.scene);
});

gltfLoader.load("/assets/models/tree_orsay7.glb", (gltf) => {
  trees.push(gltf.scene);
});

modelsMap.set("trees", trees);

export { texturesMap, modelsMap };
