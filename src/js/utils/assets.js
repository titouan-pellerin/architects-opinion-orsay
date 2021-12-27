import { textureLoader } from "./Loader";

const texturesMap = new Map();

// const groundDisplacement = textureLoader.load("/assets/ground/displacement.jpg");
// texturesMap.set("groundDisplacement", groundDisplacement);

// const groundAo = textureLoader.load("/assets/ground/ao.jpg");
// texturesMap.set("groundAo", groundAo);

// const groundMap = textureLoader.load("/assets/ground/map.jpg");
// texturesMap.set("groundMap", groundMap);

// const groundNormal = textureLoader.load("/assets/ground/normal.jpg");
// texturesMap.set("groundNormal", groundNormal);

const firstCurveTexture = textureLoader.load("/assets/curve/curve1.png");
const curveTexture1 = textureLoader.load("/assets/curve/curve2.png");
const curveTexture2 = textureLoader.load("/assets/curve/curve3.png");
const curveTexture3 = textureLoader.load("/assets/curve/curve4.png");
const lastCurveTexture = textureLoader.load("/assets/curve/curve5.png");

texturesMap.set("firstCurveTexture", [firstCurveTexture]);
texturesMap.set("curveTextures", [curveTexture1, curveTexture2, curveTexture3]);
texturesMap.set("lastCurveTexture", [lastCurveTexture]);

export { texturesMap };
