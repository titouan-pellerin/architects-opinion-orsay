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

const artwork1 = textureLoader.load("/assets/artworks/1.jpeg");
artwork1.encoding = sRGBEncoding;
const artwork2 = textureLoader.load("/assets/artworks/2.jpeg");
artwork2.encoding = sRGBEncoding;
const artwork3 = textureLoader.load("/assets/artworks/3.jpeg");
artwork3.encoding = sRGBEncoding;
const artwork4 = textureLoader.load("/assets/artworks/4.jpeg");
artwork4.encoding = sRGBEncoding;
// const artwork5 = textureLoader.load("/assets/artworks/5.jpeg");
// artwork5.encoding = sRGBEncoding;
// const artwork6 = textureLoader.load("/assets/artworks/6.jpeg");
// artwork6.encoding = sRGBEncoding;

texturesMap.set("artworksTextures", [
  artwork1,
  artwork2,
  artwork3,
  artwork4,
  // artwork5,
  // artwork6,
]);

const trees = [];
gltfLoader.load("/assets/models/arbre.glb", (gltf) => {
  trees.push(gltf.scene);
});

gltfLoader.load("/assets/models/tree_orsay7.glb", (gltf) => {
  trees.push(gltf.scene);
});

modelsMap.set("trees", trees);

export { texturesMap, modelsMap };
