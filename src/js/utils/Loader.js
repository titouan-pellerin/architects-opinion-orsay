import { LoadingManager, TextureLoader } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loadingManager = new LoadingManager();

const textureLoader = new TextureLoader(loadingManager);
const gltfLoader = new GLTFLoader(loadingManager);

const dracoLoader = new DRACOLoader(loadingManager);
dracoLoader.setDecoderPath("/libs/draco/");

const glftLoader = new GLTFLoader(loadingManager);
glftLoader.setDRACOLoader(dracoLoader);

export { textureLoader, gltfLoader };
