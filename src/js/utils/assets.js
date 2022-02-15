import { sRGBEncoding } from "three";
import { audioLoader, gltfLoader, textureLoader } from "./Loader";

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
gltfLoader.load("/assets/models/flower.glb", (gltf) => {
  flower[0] = gltf.scene;
});

modelsMap.set("trees", trees);
modelsMap.set("flower", flower);

const buffersChapter1 = [];
audioLoader.loadAsync("/assets/records/1-1.mp3").then((audioBuffer) => {
  buffersChapter1[0] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/1-2.mp3").then((audioBuffer) => {
  buffersChapter1[1] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/1-3.mp3").then((audioBuffer) => {
  buffersChapter1[2] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/1-4.mp3").then((audioBuffer) => {
  buffersChapter1[3] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/1-5.mp3").then((audioBuffer) => {
  buffersChapter1[4] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/1-6.mp3").then((audioBuffer) => {
  buffersChapter1[5] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/1-7.mp3").then((audioBuffer) => {
  buffersChapter1[6] = audioBuffer;
});

const buffersChapter2 = [];

audioLoader.loadAsync("/assets/records/2-1.mp3").then((audioBuffer) => {
  buffersChapter2[0] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/2-2.mp3").then((audioBuffer) => {
  buffersChapter2[1] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/2-3.mp3").then((audioBuffer) => {
  buffersChapter2[2] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/2-4.mp3").then((audioBuffer) => {
  buffersChapter2[3] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/2-5.mp3").then((audioBuffer) => {
  buffersChapter2[4] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/2-6.mp3").then((audioBuffer) => {
  buffersChapter2[5] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/2-7.mp3").then((audioBuffer) => {
  buffersChapter2[6] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/2-8.mp3").then((audioBuffer) => {
  buffersChapter2[7] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/2-9.mp3").then((audioBuffer) => {
  buffersChapter2[8] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/2-10.mp3").then((audioBuffer) => {
  buffersChapter2[9] = audioBuffer;
});

const buffersChapter3 = [];

audioLoader.loadAsync("/assets/records/3-1.mp3").then((audioBuffer) => {
  buffersChapter3[0] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/3-2.mp3").then((audioBuffer) => {
  buffersChapter3[1] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/3-3.mp3").then((audioBuffer) => {
  buffersChapter3[2] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/3-4.mp3").then((audioBuffer) => {
  buffersChapter3[3] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/3-5.mp3").then((audioBuffer) => {
  buffersChapter3[4] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/3-6.mp3").then((audioBuffer) => {
  buffersChapter3[5] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/3-7.mp3").then((audioBuffer) => {
  buffersChapter3[6] = audioBuffer;
});

const buffersChapter4 = [];

audioLoader.loadAsync("/assets/records/4-1.mp3").then((audioBuffer) => {
  buffersChapter4[0] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/4-2.mp3").then((audioBuffer) => {
  buffersChapter4[1] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/4-3.mp3").then((audioBuffer) => {
  buffersChapter4[2] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/4-4.mp3").then((audioBuffer) => {
  buffersChapter4[3] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/4-5.mp3").then((audioBuffer) => {
  buffersChapter4[4] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/4-6.mp3").then((audioBuffer) => {
  buffersChapter4[5] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/4-7.mp3").then((audioBuffer) => {
  buffersChapter4[6] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/4-8.mp3").then((audioBuffer) => {
  buffersChapter4[7] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/4-9.mp3").then((audioBuffer) => {
  buffersChapter4[8] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/4-10.mp3").then((audioBuffer) => {
  buffersChapter4[9] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/4-11.mp3").then((audioBuffer) => {
  buffersChapter4[10] = audioBuffer;
});

const buffersChapter5 = [];

audioLoader.loadAsync("/assets/records/4-12.mp3").then((audioBuffer) => {
  buffersChapter5[0] = audioBuffer;
});
audioLoader.loadAsync("/assets/records/4-13.mp3").then((audioBuffer) => {
  buffersChapter5[1] = audioBuffer;
});

records.push(
  buffersChapter1,
  buffersChapter2,
  buffersChapter3,
  buffersChapter4,
  buffersChapter5
);

console.log(records);

export { texturesMap, modelsMap, records };
