import { dataTextureLoader, textureLoader } from "./Loader";

const texturesMap = new Map();

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
const curveTexture4 = textureLoader.load("/assets/curve/texture4.png");
const curveTexture5 = textureLoader.load("/assets/curve/texture5.png");

texturesMap.set("curveTextures", [
  curveTexture1,
  curveTexture2,
  curveTexture3,
  curveTexture4,
  curveTexture5,
]);

export { texturesMap };
