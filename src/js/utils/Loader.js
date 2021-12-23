import { LoadingManager, TextureLoader } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const loadingManager = new LoadingManager();
const textureLoader = new TextureLoader(loadingManager);
const gltfLoader = new GLTFLoader(loadingManager)

export { textureLoader, gltfLoader };
