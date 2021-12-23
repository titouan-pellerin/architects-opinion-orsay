import { LoadingManager, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loadingManager = new LoadingManager();
const textureLoader = new TextureLoader(loadingManager);
const glftLoader = new GLTFLoader(loadingManager);

export { textureLoader, glftLoader };
