import { Vector2 } from "three";

const positions = new Map();

const curvePoints = [
  new Vector2(0, 0),
  new Vector2(0.0445, -0.2747),
  new Vector2(0.2835, -0.461),
  new Vector2(0.2161, -0.6614),
  new Vector2(-0.0487, -0.6995),
  new Vector2(-0.2479, -0.7998),
  new Vector2(-0.1705, -1.046),
  new Vector2(0.0412, -1.1652),
  new Vector2(0.233, -1.3202),
  new Vector2(0.2275, -1.608),
  new Vector2(0.0503, -1.6992),
  new Vector2(-0.1206, -1.8018),
  new Vector2(-0.176, -1.9734),
  new Vector2(-0.0597, -2.1258),
  new Vector2(0.0897, -2.202),
  new Vector2(0.2529, -2.2902),
  new Vector2(0.2004, -2.4494),
  new Vector2(-0.0763, -2.5436),
  new Vector2(-0.1894, -2.6928),
  new Vector2(-0.0708, -2.8278),
  new Vector2(0.1031, -2.8063),
  new Vector2(0.2447, -2.8646),
  new Vector2(0.3056, -3.0252),
  new Vector2(0.1562, -3.2577),
  new Vector2(-0.1262, -3.3296),
  new Vector2(-0.2258, -3.4514),
  new Vector2(-0.1151, -3.7448),
  new Vector2(0.0676, -3.8721),
  new Vector2(0, -4.1868),
];

const checkpoints = [
  new Vector2(-0.2208, -0.9675),
  new Vector2(0.2074, -1.6297),
  new Vector2(-0.1448, -2.7745),
];

const cubesPositions1 = [
  new Vector2(9.70944816055233, -32.2846989966649),
  new Vector2(2.12688127090814, -23.4584030100393),
  new Vector2(27.4770066889631, -44.1732859531754),
  new Vector2(0.5643812709053, -15.5884600679712),
  new Vector2(0.56438127090534, -8.5754598662248),
  new Vector2(17.41743311037, -37.2491638796106),
];

const cubesPositions2 = [
  new Vector2(-16.8441748320048, 26.4996069504492),
  new Vector2(-25.0397731926228, 15.504664008381),
  new Vector2(17.6588709328941, 32.6486884944073),
  new Vector2(27.0411734427512, -46.2791133936094),
  new Vector2(27.0411734427512, -37.3901570644733),
  new Vector2(21.4939688814126, -28.3479428675946),
  new Vector2(11.4088709328939, -22.3708860255869),
  new Vector2(3.125, -15.7807977126083),
  new Vector2(-13.7191748320078, -7.19835711896056),
  new Vector2(-21.9147731926228, 3.37643575535941),
  new Vector2(29.3064688814127, 46.5951544590838),
  new Vector2(1.5625, 31.0861884944076),
];

const cubesPositions3 = [
  new Vector2(-8.64603900537586, 21.6357962839312),
  new Vector2(-17.7043009298075, 8.41468277329795),
  new Vector2(15.6735599614024, 36.0102122760509),
  new Vector2(13.568634907665, -47.35430217915),
  new Vector2(24.3311036789294, -39.1289677309885),
  new Vector2(24.3311036789294, -27.234696692102),
  new Vector2(12.006134907665, -21.3030531951773),
  new Vector2(-2.63484912319427, -14.8109136048731),
  new Vector2(-12.5104515050168, -5.95213210702354),
  new Vector2(23.3173076923094, 43.9642558528419),
  new Vector2(1.94813582663187, 29.3473778278894),
];

const cubesPositions4 = [
  new Vector2(5.58297442572954, 19.2673494983354),
  new Vector2(22.8940217391256, 14.2976588628812),
  new Vector2(-18.1281354515079, 35.4619565217433),
  new Vector2(-22.4393812709081, -45.79180217915),
  new Vector2(-20.2184364548571, -38.0905100334331),
  new Vector2(-7.78059691642741, -31.2970317725643),
  new Vector2(10.744147157186, -28.797196692102),
  new Vector2(24.4565217391255, -16.3734136048731),
  new Vector2(30.6234582675188, 3.97679765886784),
  new Vector2(-4.67182274247762, 47.089255852842),
  new Vector2(-12.468096916427, 20.829849498336),
];

const cubesPositions5 = [
  new Vector2(-18.7123226034743, 37.4710072836592),
  new Vector2(3.95589464883552, -9.08758361202616),
  new Vector2(-4.19734912318859, 20.5685618729205),
];

positions.set("curvePoints", curvePoints);
positions.set("checkpoints", checkpoints);
positions.set("cubesPositions", [
  cubesPositions1,
  cubesPositions2,
  cubesPositions3,
  cubesPositions4,
  cubesPositions5,
]);

export { positions };
