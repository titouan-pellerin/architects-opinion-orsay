import { Vector2 } from "three";

const positions = new Map();

const curvePoints = [
  new Vector2(0, 0),
  new Vector2(0.0061, -0.1362),
  new Vector2(0.0406, -0.2747),
  new Vector2(0.2249, -0.461),
  new Vector2(0.1575, -0.6614),
  new Vector2(-0.0487, -0.8167),
  new Vector2(-0.1745, -0.9769),
  new Vector2(-0.1422, -1.1461),
  new Vector2(0, -1.2844),
  new Vector2(0.1859, -1.4058),
  new Vector2(0.1923, -1.608),
  new Vector2(0.0503, -1.6992),
  new Vector2(-0.1206, -1.8018),
  new Vector2(-0.176, -1.9734),
  new Vector2(-0.0597, -2.1258),
  new Vector2(0.0897, -2.202),
];

const checkpoints = [
  new Vector2(0.1729, -0.6616),
  new Vector2(-0.0214, -1.2682),
  new Vector2(-0.0957, -1.7837),
];

const treesPositions1 = [
  new Vector2(-5.17349498325927, -8.59429057905172),
  new Vector2(21.5875836120404, -47.5908906031464),
  new Vector2(17.0585164977297, -47.5908906031464),
  new Vector2(13.4345558417862, -43.47509523962),
  new Vector2(20.6824771536673, -45.3907409317367),
  new Vector2(17.5574771536673, -42.6191961486211),
  new Vector2(29.6434124337623, -37.4627619979947),
  new Vector2(8.24623745820073, -19.5317905790489),
  new Vector2(12.1938443901513, -19.5317905790489),
  new Vector2(9.33406342622337, -12.9938336120404),
  new Vector2(14.7313663231898, -5.82889014881115),
  new Vector2(-8.76498786757622, -4.26639014881118),
  new Vector2(13.4345558417862, -10.9061454849524),
  new Vector2(-7.66898075189314, -8.83152173913115),
  new Vector2(-6.10648075189317, -12.875218032002),
  new Vector2(-4.80354659390798, -17.1561454849524),
  new Vector2(-4.27466555182718, -22.4028010033436),
  new Vector2(10.6313443901513, -4.26639014881115),
  new Vector2(9.74497715366738, -8.28389888383467),
  new Vector2(14.9970558417862, -26.5463525052979),
  new Vector2(12.8699771536674, -23.4213525052979),
  new Vector2(10.0438663231899, -17.1561454849524),
  new Vector2(23.1500836120403, -30.5967809364546),
  new Vector2(13.1688663231898, -28.1088525052979),
  new Vector2(15.9949771536673, -30.1442422811107),
  new Vector2(20.0607821290873, -32.1592809364546),
  new Vector2(23.8074771536673, -34.2245343353369),
  new Vector2(26.9324771536674, -34.6467391304344),
  new Vector2(27.4424511157235, -37.4627619979947),
  new Vector2(31.2059124337623, -39.9969495475034),
  new Vector2(36.0265797378531, -45.3907409317367),
  new Vector2(18.4982821290873, -29.0342809364546),
  new Vector2(28.4949771536674, -30.5967809364546),
  new Vector2(33.3330425835982, -34.6467391304344),
  new Vector2(37.5890797378531, -35.9002619979947),
  new Vector2(40.2464126655446, -40.35009523962),
  new Vector2(42.5149254013718, -43.8282409317367),
  new Vector2(42.9795869007194, -48.16259523962),
  new Vector2(13.4345558417862, -48.16259523962),
  new Vector2(9.74497715366734, -45.03759523962),
  new Vector2(6.20906342619494, -41.91259523962),
  new Vector2(1.97533444816141, -39.3342391304344),
  new Vector2(11.3074771536674, -0.20499818928954),
  new Vector2(-12.3564807518932, -4.26639014881115),
  new Vector2(-12.3564807518931, -8.83152173913115),
  new Vector2(-11.5680798743, -12.8752180320021),
  new Vector2(-9.49104659390798, -16.4067905790489),
  new Vector2(-9.23148075189335, -20.8403010033437),
  new Vector2(20.0607821290873, -24.3467809364375),
  new Vector2(-7.928546593908, -24.9838525052979),
  new Vector2(-6.73599498325929, -29.6713525052979),
  new Vector2(25.3699771536616, -26.5463525052979),
  new Vector2(-2.71216555182729, -35.2842809364546),
  new Vector2(-2.98148075189314, -31.2025307818146),
  new Vector2(1.97533444816146, -35.2842809364546),
  new Vector2(5.94384439015128, -37.7717391304344),
  new Vector2(10.0438663231898, -39.9969495475034),
  new Vector2(-2.71216555182721, -26.5463525052979),
  new Vector2(1.07650501673785, -31.2025307818146),
  new Vector2(9.33406342621765, -22.7842809364375),
  new Vector2(10.8965634261949, -25.9092809364375),
  new Vector2(37.5890797378531, -48.16259523962),
  new Vector2(38.6839126655446, -45.7441961486211),
  new Vector2(37.1214126655446, -42.6191961486211),
  new Vector2(33.9964126655446, -39.3342391304344),
  new Vector2(34.8955425835981, -41.91259523962),
  new Vector2(-1.14966555182996, -23.9820594189666),
  new Vector2(7.77156342622334, -15.5936454849524),
  new Vector2(24.7125836120347, -48.16259523962),
  new Vector2(16.9357821290874, -20.2963525052979),
  new Vector2(-2.04849498326215, -19.5317905790489),
  new Vector2(7.771563426212, -10.9061454849524),
  new Vector2(14.7313663231899, -15.2189680319992),
  new Vector2(-2.98148075189317, -14.437718032002),
  new Vector2(7.50634439015082, -7.26902173913153),
  new Vector2(2.63900501673786, -43.8282409317367),
];

const treesPositions2 = [
  new Vector2(-10.9849320598472, 21.6669033106086),
  new Vector2(-16.7243376721046, 20.8832266283139),
  new Vector2(20.9109239099291, 23.2294033106086),
  new Vector2(-18.2868376721046, 16.2762249677769),
  new Vector2(-20.8873316711702, 18.5419033106086),
  new Vector2(-8.33071965380441, 16.9794033106086),
  new Vector2(-14.6090256624856, 16.2762249677775),
  new Vector2(-18.2868376721046, 11.66922330724),
  new Vector2(-3.64321965380441, 38.8915701612235),
  new Vector2(0.4762684601929, 38.8915701612233),
  new Vector2(4.38706343870194, 38.8915701612235),
  new Vector2(-10.9849320598471, 34.2040701612234),
  new Vector2(-23.1776399418664, 30.0476054470096),
  new Vector2(-19.3248316711703, 31.6101054470094),
  new Vector2(-15.1618376721046, 34.2040701612235),
  new Vector2(-37.1213680410733, 13.2317233072399),
  new Vector2(32.6102215869128, 38.8915701612233),
  new Vector2(-32.7606211800003, 13.23172330724),
  new Vector2(-35.8856211800003, 19.3207266283138),
  new Vector2(-32.7606211800003, 16.9794033106086),
  new Vector2(-32.7606211800003, 21.6669033106086),
  new Vector2(-35.5588680410733, 23.2294033106086),
  new Vector2(-35.5588680410734, 27.1332266283135),
  new Vector2(-31.1981211800003, 24.7919033106086),
  new Vector2(-31.1981211800003, 29.4794033106086),
  new Vector2(-28.0731211800003, 27.1332266283139),
  new Vector2(-27.1373316711703, 31.6101054470094),
  new Vector2(-22.4498316711703, 34.7351054470094),
  new Vector2(-18.2868376721046, 37.854777998075),
  new Vector2(-14.1099320598471, 38.8915701612234),
  new Vector2(-9.4224320598471, 38.8915701612234),
  new Vector2(-6.76821965380441, 35.7665701612235),
  new Vector2(4.7418776170332, 42.0472869980016),
  new Vector2(-2.08071965380441, 36.2976054470096),
  new Vector2(16.223423909929, 24.0082266283139),
  new Vector2(26.3870173736051, 27.1332266283139),
  new Vector2(34.7193444061701, 31.0419033106088),
  new Vector2(30.4806103070177, 31.6101054470097),
  new Vector2(36.2818444061702, 34.7351054470097),
  new Vector2(33.6056103070179, 40.9797779980748),
  new Vector2(36.2818444061701, 44.0994505491405),
  new Vector2(37.8443444061702, 47.7904709725293),
  new Vector2(-6.25, 24.0082266283139),
  new Vector2(-3.125, 20.8832266283138),
  new Vector2(1.26206343870194, 22.4457266283139),
  new Vector2(-1.5625, 25.5707266283139),
  new Vector2(2.03876846019284, 25.5707266283137),
  new Vector2(6.3043776170332, 22.445726628314),
  new Vector2(10.9918776170332, 23.2294033106086),
  new Vector2(7.8668776170332, 26.3544033106086),
  new Vector2(12.5543776170322, 27.1332266283127),
  new Vector2(17.7391137469385, 27.133226628314),
  new Vector2(22.4734239099291, 27.9169033106086),
  new Vector2(9.42937761703332, 39.4172779980751),
  new Vector2(26.3870173736053, 31.6101054470096),
  new Vector2(16.2234239099291, 47.7904709725295),
  new Vector2(16.1766137469387, 43.6097869980017),
  new Vector2(11.4891137469385, 44.0994505491403),
  new Vector2(13.0516137469385, 40.4540701612235),
  new Vector2(6.76394110356556, 36.2976054470096),
  new Vector2(17.7859239099291, 39.417277998075),
  new Vector2(30.4806103070179, 35.7665701612234),
  new Vector2(20.1370173736052, 43.6097869980016),
  new Vector2(32.0431103070176, 44.0994505491405),
  new Vector2(21.6995173736053, 48.4375403355215),
  new Vector2(33.6056103070179, 47.7904709725295),
];

const treesPositions3 = [
  new Vector2(-10.9849320598472, 21.6669033106086),
  new Vector2(-16.7243376721046, 20.8832266283139),
  new Vector2(20.9109239099291, 23.2294033106086),
  new Vector2(-18.2868376721046, 16.2762249677769),
  new Vector2(-20.8873316711702, 18.5419033106086),
  new Vector2(-8.33071965380441, 16.9794033106086),
  new Vector2(-14.6090256624856, 16.2762249677775),
  new Vector2(-18.2868376721046, 11.66922330724),
  new Vector2(-3.64321965380441, 38.8915701612235),
  new Vector2(0.4762684601929, 38.8915701612233),
  new Vector2(4.38706343870194, 38.8915701612235),
  new Vector2(-10.9849320598471, 34.2040701612234),
  new Vector2(-23.1776399418664, 30.0476054470096),
  new Vector2(-19.3248316711703, 31.6101054470094),
  new Vector2(-15.1618376721046, 34.2040701612235),
  new Vector2(-37.1213680410733, 13.2317233072399),
  new Vector2(32.6102215869128, 38.8915701612233),
  new Vector2(-32.7606211800003, 13.23172330724),
  new Vector2(-35.8856211800003, 19.3207266283138),
  new Vector2(-32.7606211800003, 16.9794033106086),
  new Vector2(-32.7606211800003, 21.6669033106086),
  new Vector2(-35.5588680410733, 23.2294033106086),
  new Vector2(-35.5588680410734, 27.1332266283135),
  new Vector2(-31.1981211800003, 24.7919033106086),
  new Vector2(-31.1981211800003, 29.4794033106086),
  new Vector2(-28.0731211800003, 27.1332266283139),
  new Vector2(-27.1373316711703, 31.6101054470094),
  new Vector2(-22.4498316711703, 34.7351054470094),
  new Vector2(-18.2868376721046, 37.854777998075),
  new Vector2(-14.1099320598471, 38.8915701612234),
  new Vector2(-9.4224320598471, 38.8915701612234),
  new Vector2(-6.76821965380441, 35.7665701612235),
  new Vector2(4.7418776170332, 42.0472869980016),
  new Vector2(-2.08071965380441, 36.2976054470096),
  new Vector2(16.223423909929, 24.0082266283139),
  new Vector2(26.3870173736051, 27.1332266283139),
  new Vector2(34.7193444061701, 31.0419033106088),
  new Vector2(30.4806103070177, 31.6101054470097),
  new Vector2(36.2818444061702, 34.7351054470097),
  new Vector2(33.6056103070179, 40.9797779980748),
  new Vector2(36.2818444061701, 44.0994505491405),
  new Vector2(37.8443444061702, 47.7904709725293),
  new Vector2(-6.25, 24.0082266283139),
  new Vector2(-3.125, 20.8832266283138),
  new Vector2(1.26206343870194, 22.4457266283139),
  new Vector2(-1.5625, 25.5707266283139),
  new Vector2(2.03876846019284, 25.5707266283137),
  new Vector2(6.3043776170332, 22.445726628314),
  new Vector2(10.9918776170332, 23.2294033106086),
  new Vector2(7.8668776170332, 26.3544033106086),
  new Vector2(12.5543776170322, 27.1332266283127),
  new Vector2(17.7391137469385, 27.133226628314),
  new Vector2(22.4734239099291, 27.9169033106086),
  new Vector2(9.42937761703332, 39.4172779980751),
  new Vector2(26.3870173736053, 31.6101054470096),
  new Vector2(16.2234239099291, 47.7904709725295),
  new Vector2(16.1766137469387, 43.6097869980017),
  new Vector2(11.4891137469385, 44.0994505491403),
  new Vector2(13.0516137469385, 40.4540701612235),
  new Vector2(6.76394110356556, 36.2976054470096),
  new Vector2(17.7859239099291, 39.417277998075),
  new Vector2(30.4806103070179, 35.7665701612234),
  new Vector2(20.1370173736052, 43.6097869980016),
  new Vector2(32.0431103070176, 44.0994505491405),
  new Vector2(21.6995173736053, 48.4375403355215),
  new Vector2(33.6056103070179, 47.7904709725295),
];

const rocksPositions1 = [
  new Vector2(-5.67920666269686, -10.2913043320825),
  new Vector2(9.45283026026122, -21.2978517538886),
  new Vector2(6.32783026026114, -14.3107059738639),
  new Vector2(2.16196432080547, -20.6101848127645),
  new Vector2(-4.11670666269706, -21.2978517538888),
  new Vector2(6.32783026026175, -8.19884314370504),
];

const rocksPositions2 = [
  new Vector2(4.85578169527798, 31.8294411248303),
  new Vector2(11.7611645620741, 31.8294411248303),
  new Vector2(28.0303905240714, 40.379086904852),
  new Vector2(23.8645245846158, 34.0796080659514),
  new Vector2(17.5858536011104, 33.3919411248302),
  new Vector2(28.0303905240714, 46.4909497350106),
];

const rocksPositions3 = [
  new Vector2(-11.4134442667193, 21.0416878117484),
  new Vector2(-6.48797213335974, 25.1863537608584),
  new Vector2(10.1986645620741, 36.1733325997591),
  new Vector2(6.03279862261843, 29.8738537608587),
  new Vector2(0, 26.7488537608584),
  new Vector2(3.38296249392448, 34.6108325997591),
];

const woodLogsPositions1 = [
  new Vector2(-5.67920666269686, -10.2913043320825),
  new Vector2(5.65040434575506, 2.61551129253952),
  new Vector2(-2.55420666270822, -1.56245966448978),
  new Vector2(2.16196432080547, -20.6101848127645),
  new Vector2(-4.11670666269706, -21.2978517538888),
  new Vector2(2.5254043457432, -3.32486117386323),
];

const woodLogsPositions2 = [
  new Vector2(4.85578169527798, 31.8294411248303),
  new Vector2(11.7611645620741, 31.8294411248303),
  new Vector2(28.0303905240714, 40.379086904852),
  new Vector2(23.8645245846158, 34.0796080659514),
  new Vector2(17.5858536011104, 33.3919411248302),
  new Vector2(28.0303905240714, 46.4909497350106),
];

const woodLogsPositions3 = [
  new Vector2(-11.4134442667193, 21.0416878117484),
  new Vector2(-6.48797213335974, 25.1863537608584),
  new Vector2(10.1986645620741, 36.1733325997591),
  new Vector2(6.03279862261843, 29.8738537608587),
  new Vector2(0, 26.7488537608584),
  new Vector2(3.38296249392448, 34.6108325997591),
];

positions.set("curvePoints", curvePoints);
positions.set("checkpoints", checkpoints);
positions.set("treesPositions", [treesPositions1, treesPositions2, treesPositions3]);
positions.set("rocksPositions", [rocksPositions1, rocksPositions2, rocksPositions3]);
positions.set("woodLogsPositions", [
  woodLogsPositions1,
  woodLogsPositions2,
  woodLogsPositions3,
]);

export { positions };
