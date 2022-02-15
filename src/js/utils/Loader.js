import { AudioLoader, LoadingManager, TextureLoader } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loadingManager = new LoadingManager();

const textureLoader = new TextureLoader(loadingManager);
const audioLoader = new AudioLoader(loadingManager);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/libs/draco/");

const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);

export { loadingManager, textureLoader, audioLoader, gltfLoader };
