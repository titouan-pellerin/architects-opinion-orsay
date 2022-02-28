import { sRGBEncoding } from "three";
import { audioLoader, gltfLoader, textureLoader } from "./Loader";

const texturesMap = new Map();
const modelsMap = new Map();
const records = [];
const soundsMap = new Map();

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

const artwork1 = textureLoader.load("/assets/artworks/la-main-emile-galle.jpg");
artwork1.encoding = sRGBEncoding;

const artwork2 = textureLoader.load("/assets/artworks/presentoir-eugene-rousseau.jpg");
artwork2.encoding = sRGBEncoding;

const artwork3 = textureLoader.load(
  "/assets/artworks/la-reine-isabeau-de-baviere-henry-cros.jpg"
);
artwork3.encoding = sRGBEncoding;

const artwork4 = textureLoader.load("/assets/artworks/vase-albert-dammouse.jpg");
artwork4.encoding = sRGBEncoding;

const artwork5 = textureLoader.load(
  "/assets/artworks/the-peacock-garden-walter-crane.jpg"
);
artwork5.encoding = sRGBEncoding;

const artwork6 = textureLoader.load(
  "/assets/artworks/holland-park-carpet-william-morris.jpg"
);
artwork6.encoding = sRGBEncoding;

const artwork7 = textureLoader.load("/assets/artworks/maison-horta-victor-horta.jpg");
artwork7.encoding = sRGBEncoding;

const artwork8 = textureLoader.load(
  "/assets/artworks/banquette-de-fumoir-hector-guimard.jpg"
);
artwork8.encoding = sRGBEncoding;

const artwork9 = textureLoader.load(
  "/assets/artworks/castel-beranger-hector-guimard.jpg"
);
artwork9.encoding = sRGBEncoding;

const artwork10 = textureLoader.load(
  "/assets/artworks/la-libellule-de-la-station-dauphine.jpg"
);
artwork10.encoding = sRGBEncoding;

const artwork11 = textureLoader.load("/assets/artworks/hotel-tassel-victor-horta-1.jpg");
artwork11.encoding = sRGBEncoding;

const artwork12 = textureLoader.load("/assets/artworks/hotel-tassel-victor-horta-2.jpg");
artwork12.encoding = sRGBEncoding;

const artwork13 = textureLoader.load("/assets/artworks/pendentif-rene-lalique.jpg");
artwork13.encoding = sRGBEncoding;

const artwork14 = textureLoader.load("/assets/artworks/pavot-rene-lalique.jpg");
artwork14.encoding = sRGBEncoding;

const artwork15 = textureLoader.load("/assets/artworks/fauteuil-louis-majorelle.jpg");
artwork15.encoding = sRGBEncoding;

const artwork16 = textureLoader.load(
  "/assets/artworks/vol-de-mouettes-jacques-gruber.jpg"
);

const easter = location.hash.includes("bzh")
  ? textureLoader.load("/assets/artworks/gwenn-ha-du.jpg")
  : textureLoader.load("/assets/artworks/venom.jpg");
const easterName = location.hash.includes("bzh") ? "Drapeau Breton" : "Venomenomnom";
easter.encoding = sRGBEncoding;

const flowerPattern = textureLoader.load("/assets/flower/flower.jpg");
flowerPattern.encoding = sRGBEncoding;
flowerPattern.flipY = false;
texturesMap.set("flowerPattern", [flowerPattern]);

if (!location.hash.includes("bzh") && !location.hash.includes("enzo")) {
  texturesMap.set("artworksTextures", [
    {
      texture: artwork1,
      dimensions: [548, 850],
      author: "Emile Gallé - 1904",
      title: "La Main aux algues </br> et aux coquillages",
    },
    {
      texture: artwork2,
      dimensions: [850, 729],
      author: "Eugène Rousseau - 1884",
      title: "Présentoir",
    },
    {
      texture: artwork3,
      dimensions: [546, 850],
      author: "Henry Cros - 1875",
      title: "La reine Isabeau </br> de Bavière",
    },
    {
      texture: artwork4,
      dimensions: [638, 850],
      author: "Albert Dammouse - 1880",
      title: "Vase",
    },
    {
      texture: artwork5,
      dimensions: [1530, 2250],
      author: "Walter Crane - 1889",
      title: "The Peacock Garden",
    },
    {
      texture: artwork6,
      dimensions: [2500, 3185],
      author: "William Morris - 1883",
      title: "Holland Park carpet",
    },
    {
      texture: artwork7,
      dimensions: [2610, 3910],
      author: "Victor Horta </br> 1898-1901",
      title: "Horta Museum </br> (Maison Horta)",
    },
    {
      texture: artwork8,
      dimensions: [1118, 1280],
      author: "Hector Guimard - 1897",
      title: "Banquette de fumoir",
    },
    {
      texture: artwork9,
      dimensions: [3096, 3870],
      author: "Hector Guimard </br> 1895-1898",
      title: "Portail d'entrée </br> Castel Béranger",
    },
    {
      texture: artwork10,
      dimensions: [1497, 1899],
      author: "Hector Guimard - 1900",
      title: "Édicule, </br> dit La libellule",
    },
    {
      texture: artwork11,
      dimensions: [800, 1200],
      author: "Victor Horta </br> 1894-1905",
      title: "Hotel Tassel",
    },
    {
      texture: artwork12,
      dimensions: [1761, 2362],
      author: "Victor Horta </br> 1894-1905",
      title: "Hotel Tassel",
    },
    {
      texture: artwork13,
      dimensions: [579, 850],
      author: "René Lalique - 1904",
      title: "Pendentif",
    },
    {
      texture: artwork14,
      dimensions: [1024, 1280],
      author: "René Lalique - 1897",
      title: "Pavot",
    },
    {
      texture: artwork15,
      dimensions: [651, 850],
      author: "Louis Majorelle </br> 1898-1899",
      title: "Fauteuil",
    },
    {
      texture: artwork16,
      dimensions: [689, 768],
      author: "Jacques Gruber </br> 1905-1908",
      title: "Vol de mouettes",
    },
  ]);
} else {
  texturesMap.set("artworksTextures", [
    {
      texture: easter,
      dimensions: [1500, 1000],
      author: "",
      title: easterName,
    },
    {
      texture: easter,
      dimensions: [1500, 1000],
      author: "",
      title: easterName,
    },
    {
      texture: easter,
      dimensions: [1500, 1000],
      author: "",
      title: easterName,
    },
    {
      texture: easter,
      dimensions: [1500, 1000],
      author: "",
      title: easterName,
    },
    {
      texture: easter,
      dimensions: [1500, 1000],
      author: "",
      title: easterName,
    },
    {
      texture: easter,
      dimensions: [1500, 1000],
      author: "",
      title: easterName,
    },
    {
      texture: easter,
      dimensions: [1500, 1000],
      author: "",
      title: easterName,
    },
    {
      texture: easter,
      dimensions: [1500, 1000],
      author: "",
      title: easterName,
    },
    {
      texture: easter,
      dimensions: [1500, 1000],
      author: "",
      title: easterName,
    },
    {
      texture: easter,
      dimensions: [1500, 1000],
      author: "",
      title: easterName,
    },
    {
      texture: easter,
      dimensions: [1500, 1000],
      author: "",
      title: easterName,
    },
    {
      texture: easter,
      dimensions: [1500, 1000],
      author: "",
      title: easterName,
    },
    {
      texture: easter,
      dimensions: [1500, 1000],
      author: "",
      title: easterName,
    },
    {
      texture: easter,
      dimensions: [1500, 1000],
      author: "",
      title: easterName,
    },
    {
      texture: easter,
      dimensions: [1500, 1000],
      author: "",
      title: easterName,
    },
    {
      texture: easter,
      dimensions: [1500, 1000],
      author: "",
      title: easterName,
    },
  ]);
}

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

audioLoader.loadAsync("/assets/musics/music.mp3").then((audioBuffer) => {
  soundsMap.set("music", audioBuffer);
});

export { texturesMap, modelsMap, records, soundsMap };
