import { LoadingManager, TextureLoader } from "three";

const loadingManager = new LoadingManager();
const textureLoader = new TextureLoader(loadingManager);

export { textureLoader };
