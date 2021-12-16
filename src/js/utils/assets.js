import { textureLoader } from "./Loader";

const texturesMap = new Map();

const totoTexture = textureLoader.load("/assets/thoma.jpg");
texturesMap.set("totoTexture", totoTexture);

export { texturesMap };
