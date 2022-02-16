import { sRGBEncoding } from "three";
import { gltfLoader, textureLoader } from "./Loader";

const texturesMap = new Map();
const modelsMap = new Map();
const records = [];

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

const butterflyPattern = textureLoader.load("/assets/butterfly/butterfly.png");
texturesMap.set("butterflyPattern", [butterflyPattern]);
butterflyPattern.encoding = sRGBEncoding;

const artwork1 = textureLoader.load("/assets/artworks/la-main-emile-galle.jpeg");
artwork1.encoding = sRGBEncoding;
artwork1.userData.dimensions = [548, 850];

const artwork2 = textureLoader.load("/assets/artworks/presentoir-eugene-rousseau.jpeg");
artwork2.encoding = sRGBEncoding;
artwork2.userData.dimensions = [850, 729];

const artwork3 = textureLoader.load(
  "/assets/artworks/la-reine-isabeau-de-baviere-henry-cros.jpeg"
);
artwork3.encoding = sRGBEncoding;
artwork3.userData.dimensions = [546, 850];

const artwork4 = textureLoader.load("/assets/artworks/vase-albert-dammouse.jpeg");
artwork4.encoding = sRGBEncoding;
artwork4.userData.dimensions = [638, 850];

const artwork5 = textureLoader.load(
  "/assets/artworks/the-peacock-garden-walter-crane.jpeg"
);
artwork5.encoding = sRGBEncoding;
artwork5.userData.dimensions = [1530, 2250];

const artwork6 = textureLoader.load(
  "/assets/artworks/holland-park-carpet-william-morris.jpeg"
);
artwork6.encoding = sRGBEncoding;
artwork6.userData.dimensions = [2500, 3185];

const artwork7 = textureLoader.load("/assets/artworks/maison-horta-victor-horta.jpeg");
artwork7.encoding = sRGBEncoding;
artwork7.userData.dimensions = [2610, 3910];

const artwork8 = textureLoader.load(
  "/assets/artworks/banquette-de-fumoir-hector-guimard.jpeg"
);
artwork8.encoding = sRGBEncoding;
artwork8.userData.dimensions = [1118, 1189];

const artwork9 = textureLoader.load(
  "/assets/artworks/castel-beranger-hector-guimard.jpeg"
);
artwork9.encoding = sRGBEncoding;
artwork9.userData.dimensions = [3096, 3870];

const artwork10 = textureLoader.load(
  "/assets/artworks/la-libellule-de-la-station-dauphine.jpeg"
);
artwork10.encoding = sRGBEncoding;
artwork10.userData.dimensions = [1497, 1899];

const artwork11 = textureLoader.load("/assets/artworks/hotel-tassel-victor-horta-1.jpeg");
artwork11.encoding = sRGBEncoding;
artwork11.userData.dimensions = [800, 1200];

const artwork12 = textureLoader.load("/assets/artworks/hotel-tassel-victor-horta-2.jpeg");
artwork12.encoding = sRGBEncoding;
artwork12.userData.dimensions = [1761, 2362];

const artwork13 = textureLoader.load("/assets/artworks/pendentif-rene-lalique.jpeg");
artwork13.encoding = sRGBEncoding;
artwork13.userData.dimensions = [579, 850];

const artwork14 = textureLoader.load("/assets/artworks/pavot-rene-lalique.jpeg");
artwork14.encoding = sRGBEncoding;
artwork14.userData.dimensions = [850, 849];

const artwork15 = textureLoader.load(
  "/assets/artworks/ecritoire-henry-van-de-velde.jpeg"
);
artwork15.encoding = sRGBEncoding;
artwork15.userData.dimensions = [1000, 640];

const artwork16 = textureLoader.load("/assets/artworks/fauteuil-louis-majorelle.jpeg");
artwork16.encoding = sRGBEncoding;
artwork16.userData.dimensions = [651, 850];

const artwork17 = textureLoader.load(
  "/assets/artworks/vol-de-mouettes-jacques-gruber.jpeg"
);
artwork17.encoding = sRGBEncoding;
artwork17.userData.dimensions = [799, 850];

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
gltfLoader.load("/assets/models/flower/flower7.glb", (gltf) => {
  flower[0] = gltf.scene;
});

modelsMap.set("trees", trees);
modelsMap.set("flower", flower);

const record11 = "/assets/records/1-1.mp3";
const record12 = "/assets/records/1-2.mp3";
const record13 = "/assets/records/1-3.mp3";
const record14 = "/assets/records/1-4.mp3";
const record15 = "/assets/records/1-5.mp3";
const record16 = "/assets/records/1-6.mp3";
const record17 = "/assets/records/1-7.mp3";

records.push([record11, record12, record13, record14, record15, record16, record17]);

const record21 = "/assets/records/2-1.mp3";
const record22 = "/assets/records/2-2.mp3";
const record23 = "/assets/records/2-3.mp3";
const record24 = "/assets/records/2-4.mp3";
const record25 = "/assets/records/2-5.mp3";
const record26 = "/assets/records/2-6.mp3";
const record27 = "/assets/records/2-7.mp3";
const record28 = "/assets/records/2-8.mp3";
const record29 = "/assets/records/2-9.mp3";
const record210 = "/assets/records/2-10.mp3";

records.push([
  record21,
  record22,
  record23,
  record24,
  record25,
  record26,
  record27,
  record28,
  record29,
  record210,
]);

const record31 = "/assets/records/3-1.mp3";
const record32 = "/assets/records/3-2.mp3";
const record33 = "/assets/records/3-3.mp3";
const record34 = "/assets/records/3-4.mp3";
const record35 = "/assets/records/3-5.mp3";
const record36 = "/assets/records/3-6.mp3";
const record37 = "/assets/records/3-7.mp3";

records.push([record31, record32, record33, record34, record35, record36, record37]);

const record41 = "/assets/records/4-1.mp3";
const record42 = "/assets/records/4-2.mp3";
const record43 = "/assets/records/4-3.mp3";
const record44 = "/assets/records/4-4.mp3";
const record45 = "/assets/records/4-5.mp3";
const record46 = "/assets/records/4-6.mp3";
const record47 = "/assets/records/4-7.mp3";
const record48 = "/assets/records/4-8.mp3";
const record49 = "/assets/records/4-9.mp3";
const record410 = "/assets/records/4-10.mp3";
const record411 = "/assets/records/4-11.mp3";

records.push([
  record41,
  record42,
  record43,
  record44,
  record45,
  record46,
  record47,
  record48,
  record49,
  record410,
  record411,
]);

const record412 = "/assets/records/4-12.mp3";
const record413 = "/assets/records/4-13.mp3";

records.push([record412, record413]);

export { texturesMap, modelsMap, records };
