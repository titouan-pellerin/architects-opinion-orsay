import { sRGBEncoding } from "three";
import { gltfLoader, textureLoader } from "./Loader";

const texturesMap = new Map();
const modelsMap = new Map();

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

const noise = textureLoader.load("/assets/noise.jpg");
texturesMap.set("noiseTexture", [noise]);

const artwork1 = textureLoader.load("/assets/artworks/la-main-emile-galle.jpeg");
artwork1.encoding = sRGBEncoding;

const artwork2 = textureLoader.load("/assets/artworks/presentoir-eugene-rousseau.jpeg");
artwork2.encoding = sRGBEncoding;

const artwork3 = textureLoader.load(
  "/assets/artworks/la-reine-isabeau-de-baviere-henry-cros.jpeg"
);
artwork3.encoding = sRGBEncoding;

const artwork4 = textureLoader.load("/assets/artworks/vase-albert-dammouse.jpeg");
artwork4.encoding = sRGBEncoding;

const artwork5 = textureLoader.load(
  "/assets/artworks/the-peacock-garden-walter-crane.jpeg"
);
artwork5.encoding = sRGBEncoding;

const artwork6 = textureLoader.load(
  "/assets/artworks/holland-park-carpet-william-morris.jpeg"
);
artwork6.encoding = sRGBEncoding;

const artwork7 = textureLoader.load("/assets/artworks/maison-horta-victor-horta.jpeg");
artwork7.encoding = sRGBEncoding;

const artwork8 = textureLoader.load(
  "/assets/artworks/banquette-de-fumoir-hector-guimard.jpeg"
);
artwork8.encoding = sRGBEncoding;

const artwork9 = textureLoader.load(
  "/assets/artworks/castel-beranger-hector-guimard.jpeg"
);
artwork9.encoding = sRGBEncoding;

const artwork10 = textureLoader.load(
  "/assets/artworks/la-libellule-de-la-station-dauphine.jpeg"
);
artwork10.encoding = sRGBEncoding;

const artwork11 = textureLoader.load("/assets/artworks/hotel-tassel-victor-horta-1.jpeg");
artwork11.encoding = sRGBEncoding;

const artwork12 = textureLoader.load("/assets/artworks/hotel-tassel-victor-horta-2.jpeg");
artwork12.encoding = sRGBEncoding;

const artwork13 = textureLoader.load("/assets/artworks/pendentif-rene-lalique.jpeg");
artwork13.encoding = sRGBEncoding;

const artwork14 = textureLoader.load("/assets/artworks/pavot-rene-lalique.jpeg");
artwork14.encoding = sRGBEncoding;

const artwork15 = textureLoader.load(
  "/assets/artworks/ecritoire-henry-van-de-velde.jpeg"
);
artwork15.encoding = sRGBEncoding;

const artwork16 = textureLoader.load("/assets/artworks/fauteuil-louis-majorelle.jpeg");
artwork16.encoding = sRGBEncoding;

const artwork17 = textureLoader.load(
  "/assets/artworks/vol-de-mouettes-jacques-gruber.jpeg"
);
artwork17.encoding = sRGBEncoding;

const flowerPattern = textureLoader.load("/assets/flower/flower.jpg");
flowerPattern.encoding = sRGBEncoding;
flowerPattern.flipY = false;
texturesMap.set("flowerPattern", [flowerPattern]);

texturesMap.set("artworksTextures", [
  artwork1,
  artwork2,
  artwork3,
  artwork4,
  artwork5,
  artwork6,
  artwork7,
  artwork8,
  artwork9,
  artwork10,
  artwork11,
  artwork12,
  artwork13,
  artwork14,
  artwork15,
  artwork16,
  artwork17,
]);

const trees = [];
gltfLoader.load("/assets/models/trunk1.glb", (gltf) => {
  trees[0] = gltf.scene;
});

gltfLoader.load("/assets/models/trunk2.glb", (gltf) => {
  trees[1] = gltf.scene;
});

const flower = [];
gltfLoader.load("/assets/models/flower/flower2.glb", (gltf) => {
  flower[0] = gltf.scene;
});

modelsMap.set("trees", trees);
modelsMap.set("flower", flower);

export { texturesMap, modelsMap };
