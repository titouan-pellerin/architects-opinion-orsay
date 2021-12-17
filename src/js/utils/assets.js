import { textureLoader } from "./Loader";

const texturesMap = new Map();

const groundDisplacement = textureLoader.load("/assets/ground/displacement.jpg");
texturesMap.set("groundDisplacement", groundDisplacement);

const groundAo = textureLoader.load("/assets/ground/ao.jpg");
texturesMap.set("groundAo", groundAo);

const groundMap = textureLoader.load("/assets/ground/map.jpg");
texturesMap.set("groundMap", groundMap);

const groundNormal = textureLoader.load("/assets/ground/normal.jpg");
texturesMap.set("groundNormal", groundNormal);

export { texturesMap };
