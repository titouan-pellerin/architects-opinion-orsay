import { LoadingManager, TextureLoader } from "three";
import { BasisTextureLoader } from "three/examples/jsm/loaders/BasisTextureLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loadingManager = new LoadingManager();

const textureLoader = new TextureLoader(loadingManager);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/libs/draco/");

const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);

const basisLoader = new BasisTextureLoader();
basisLoader.setTranscoderPath("/libs/basis/");
// basisLoader.detectSupport(mainScene.renderer);
export { loadingManager, textureLoader, BasisTextureLoader, gltfLoader };
