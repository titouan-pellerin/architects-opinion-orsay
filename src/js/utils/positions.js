import { Vector2, Vector3 } from "three";

const positions = new Map();

const curvePoints = [
  new Vector2(0, 25),
  new Vector2(0, 8.7563),
  new Vector2(4.6441, -3.7535),
  new Vector2(3.8506, -19.5973),
  new Vector2(-6.3373, -30.4963),
  new Vector2(-9.1795, -40.5733),
  new Vector2(-7.1124, -48.3248),
  new Vector2(-2.2031, -56.2055),
  new Vector2(6.2361, -67.7037),
  new Vector2(13.5584, -93.6713),
  new Vector2(4.7733, -109.6912),
  new Vector2(-7.1124, -120.9632),
  new Vector2(-9.6172, -134.5284),
  new Vector2(-8.2607, -147.1246),
  new Vector2(0.8329, -161.0774),
  new Vector2(4.6118, -192.1805),
];

const treesPositions1 = [
  new Vector2(-3.93740434726622, 4.79599917473483),
  new Vector2(-10.0740578869406, -18.8947754362516),
  new Vector2(-9.19391779285803, -22.4108093328951),
  new Vector2(-2.37489956693084, -9.25581751284313),
  new Vector2(-2.3748995669308, 0.89510039161597),
  new Vector2(-2.87890272079209, -5.35491872972357),
  new Vector2(-14.450431238437, -13.3729836849057),
  new Vector2(-13.59791397457, -16.9404074315267),
  new Vector2(-12.8879264581087, -23.4374750519038),
  new Vector2(-13.59791397457, -20.457280216587),
  new Vector2(-12.8879264581016, 5.39087859726816),
  new Vector2(-11.3000402357614, 3.12502972636249),
  new Vector2(-9.73753545542592, -0.25182226451504),
  new Vector2(-9.19391779744386, -3.79241394938815),
  new Vector2(-9.73753545542593, -7.30536812128549),
  new Vector2(-13.2974523308562, -1.44329361116748),
  new Vector2(-13.2974523308562, -5.03925315689032),
  new Vector2(-13.2974523308562, -8.47992829039442),
  new Vector2(-12.0354091942346, -11.810478904566),
  new Vector2(-10.0740578869406, -15.3779026511913),
  new Vector2(-8.51155310660517, -10.8183222931814),
  new Vector2(-0.39369950233661, -3.00579839150286),
  new Vector2(-5.49990912760165, -22.6895473789241),
  new Vector2(-6.43522510648465, -18.8947754362516),
  new Vector2(-6.43522510648468, -14.4164449329892),
  new Vector2(0.75010999374849, -6.91742351005903),
  new Vector2(-3.93740435253412, 8.03829489849205),
  new Vector2(-5.49990913286964, 16.4814018680459),
  new Vector2(-5.11259671109347, 12.4986450117091),
  new Vector2(5.102343619484, 20.82109559139),
  new Vector2(5.10234361948387, 16.4814018676736),
  new Vector2(4.70309316100378, 11.6242800763444),
  new Vector2(15.296691511807, 1.56252494809617),
  new Vector2(14.9330857953772, -1.81432704297031),
  new Vector2(16.8591962921425, -5.03925315689461),
  new Vector2(17.5053282968038, -9.25581751284592),
  new Vector2(18.7033851612114, -12.8539401526538),
  new Vector2(18.7033851612114, -16.3817431570606),
  new Vector2(18.4217010724779, -19.9678392305529),
  new Vector2(17.140880380876, -23.0928487912237),
  new Vector2(12.1716819511362, 6.73288223717912),
  new Vector2(11.8080762347064, 3.12502972843171),
  new Vector2(13.3705810150416, -6.83875718740982),
  new Vector2(12.6939205437452, -3.9725674975728),
  new Vector2(11.1314157634097, -0.251822262635),
  new Vector2(8.59425026812622, 5.17037745684371),
  new Vector2(9.25241361943825, 16.4814018680457),
  new Vector2(9.25241361943872, 12.4986450129941),
  new Vector2(7.68990883910314, 8.51588815794182),
  new Vector2(5.10234361947818, 6.47579011815647),
  new Vector2(13.7341867314717, -22.4108093328951),
  new Vector2(14.9330857953771, -18.5029122118621),
  new Vector2(15.2966915118071, -14.4164449329893),
  new Vector2(14.0158708202052, -9.96376674808061),
  new Vector2(10.1567550484617, -7.69331273251054),
  new Vector2(9.25240883910315, -3.79241394939235),
  new Vector2(7.68990405876757, 1.82486675574291),
  new Vector2(-7.0624139106841, 8.51588815793877),
  new Vector2(-9.19391779744388, 11.6242800750911),
];
const treesPositions2 = [
  new Vector2(-10.3867342824387, -21.6141110593398),
  new Vector2(-3.1250095606694, -7.84184072835927),
  new Vector2(6.29677087303826, 2.09426904629589),
  new Vector2(14.2381831930405, 19.0171300057043),
];

const treesPositions3 = [
  new Vector2(34.0206943646479, 48.3309836697686),
  new Vector2(26.3144310114001, 24.2734883603475),
  new Vector2(26.3144310114001, 27.724180482187),
  new Vector2(0.64186492934085, -9.96750253514593),
  new Vector2(-6.1361170967956, -4.38465389533462),
  new Vector2(20.7683074334282, -9.96750253514585),
  new Vector2(14.0893858648042, -7.86568095842448),
  new Vector2(25.2813561077233, -23.488625208931),
  new Vector2(25.4469997692582, -20.1556748412784),
  new Vector2(22.1563561077231, -20.1556748412784),
  new Vector2(28.5719997692581, -30.2174379369987),
  new Vector2(25.2813561077233, -30.2174379370015),
  new Vector2(25.2813561077233, -26.839069258348),
  new Vector2(25.2813561077233, -33.6164212372964),
  new Vector2(28.5719997692582, -26.8184546366982),
  new Vector2(28.5719997692582, -23.4886252089311),
  new Vector2(28.7435683967089, -20.1556748412756),
  new Vector2(28.5719997692588, -16.7635051891364),
  new Vector2(25.2813561077233, -16.7635051891367),
  new Vector2(22.0338070881154, -16.7635051891338),
  new Vector2(27.306500114571, -9.96750253514308),
  new Vector2(24.0374037739968, -9.96750253514592),
  new Vector2(28.8325176784611, -13.3413238165829),
  new Vector2(25.4193249973185, -13.3413238165801),
  new Vector2(22.0614818600609, -13.3413238165801),
  new Vector2(24.0374037739968, -6.64233913645661),
  new Vector2(17.4717388059719, -8.20483913644949),
  new Vector2(20.7683074334282, -6.64233913645518),
  new Vector2(17.4288466491175, -4.91439795999097),
  new Vector2(27.3065001145711, -6.64233913645661),
  new Vector2(14.089385864807, -4.5856639811504),
  new Vector2(-0.90506848933479, 2.26998357084134),
  new Vector2(4.01673532645449, -2.08073232670121),
  new Vector2(10.7560525314682, -4.74068095842597),
  new Vector2(10.7560525314682, -8.03939795998903),
  new Vector2(7.35211114343826, -8.03939795998937),
  new Vector2(7.35211114343821, -4.74068095842642),
  new Vector2(0.65743151066611, -3.35189795999327),
  new Vector2(4.01673532645075, -8.62827298272319),
  new Vector2(-2.74712608372738, -7.71066398114897),
  new Vector2(0.64186492934084, -6.64233913645091),
  new Vector2(4.01673532645077, -5.3454679027169),
  new Vector2(-2.74712608372737, -4.38465389533464),
  new Vector2(-2.75883845096132, -1.06060940202045),
  new Vector2(-6.15555260537235, -1.06060940202048),
  new Vector2(-9.51339574262988, -1.06060940202045),
  new Vector2(-4.2132144722022, 2.26998357083896),
  new Vector2(-7.64745926387036, 2.26998357083944),
  new Vector2(-11.3298762758518, 2.29587634169093),
  new Vector2(-11.8936975074746, 5.62646931456356),
  new Vector2(-1.86545378796839, 5.86673336209174),
  new Vector2(-5.07421707637263, 5.60057654369075),
  new Vector2(-8.48107982146757, 5.61791208141358),
  new Vector2(1.58325841382376, 5.61791208141362),
  new Vector2(-8.20487627608241, 8.99173336284155),
  new Vector2(-11.5044246671147, 8.9917333628421),
  new Vector2(-4.99045378796836, 9.57996865696487),
  new Vector2(2.72587830543357, 22.3966171277142),
  new Vector2(1.44557179399953, 8.99173336284775),
  new Vector2(9.02790941655098, 19.035518894583),
  new Vector2(5.71027767635428, 19.035518894583),
  new Vector2(2.35243453910243, 19.035518894583),
  new Vector2(9.02790941655098, 15.6875903840046),
  new Vector2(8.11223846067151, 12.3396618734262),
  new Vector2(5.71027767635428, 15.6875903840046),
  new Vector2(4.75439532341397, 12.3396618734262),
  new Vector2(2.352434539101, 15.6875903840046),
  new Vector2(1.44557179399953, 12.3396618734262),
  new Vector2(-1.77244099698441, 10.2443176011889),
  new Vector2(4.75439532341397, 8.99173336284775),
  new Vector2(8.11223846067151, 8.99173336284775),
  new Vector2(5.97031137733097, 23.8084338323688),
  new Vector2(9.28730484138214, 25.6350813920903),
  new Vector2(9.28730484138214, 22.3966171277141),
  new Vector2(12.6369780440029, 20.7206528633379),
  new Vector2(12.6369780440029, 23.9591171277141),
  new Vector2(12.6369780440029, 27.1975813920903),
  new Vector2(16.0111610505339, 22.3161815535093),
  new Vector2(16.0111610505339, 25.635081392096),
  new Vector2(16.0111610505339, 28.9539812306714),
  new Vector2(19.4291298005382, 24.3061531153942),
  new Vector2(19.4291298005396, 27.6250529539709),
  new Vector2(19.4291298005396, 30.9439527925576),
  new Vector2(30.3782036142336, 34.5516271189438),
  new Vector2(27.0593037756581, 34.5516282035445),
  new Vector2(23.7404039370715, 34.5516292881425),
  new Vector2(22.9083730603293, 24.3676001157155),
  new Vector2(22.9083730603293, 27.6864999542909),
  new Vector2(22.9083730603293, 31.0053997928776),
  new Vector2(26.3144310114001, 31.0995115482342),
  new Vector2(32.4610168349523, 37.9664286842058),
  new Vector2(28.9803215404504, 37.9664286842058),
  new Vector2(25.4996262459542, 37.9664286842058),
  new Vector2(33.3842672765115, 41.430155302578),
  new Vector2(29.9035719820097, 41.430155302578),
  new Vector2(26.4228766875135, 41.430155302578),
  new Vector2(34.0206943646479, 44.8153586697686),
  new Vector2(30.539999070146, 44.8153586697686),
  new Vector2(27.0593037756498, 44.8153586697686),
  new Vector2(30.5428215404504, 48.3309836697686),
  new Vector2(27.0593037756498, 48.3309836697686),
  new Vector2(10.0739086152089, 40.1123513875575),
  new Vector2(10.0739086152089, 43.611376562086),
  new Vector2(13.6137475093335, 41.7052844787406),
  new Vector2(14.5255936255353, 45.1016374841117),
  new Vector2(14.5236783862117, 48.4979904894715),
  new Vector2(6.61624810300054, 48.0747277618946),
  new Vector2(10.0739086152089, 47.185762792418),
  new Vector2(3.27521192800191, 35.7595561738151),
  new Vector2(3.27521192800191, 39.258581348355),
  new Vector2(-11.647097631618, -22.3414415690058),
  new Vector2(-8.33827410220636, -22.3554297432429),
  new Vector2(-5.02848403540668, -22.3554297432429),
  new Vector2(-8.33827410220637, -25.7449852781406),
  new Vector2(-1.73299201770473, -28.3840755765936),
  new Vector2(4.92034313725751, -38.174976311916),
  new Vector2(4.92034313725751, -34.8420259442605),
  new Vector2(8.27818627451503, -39.5237814589592),
  new Vector2(8.27818627451509, -36.141428517783),
  new Vector2(11.6850490196099, -39.3767226354299),
  new Vector2(11.68504901961, -35.9943696942537),
  new Vector2(15.067401960789, -38.6904481256266),
  new Vector2(15.0674019607891, -35.3080951844504),
  new Vector2(21.9056372549061, -37.0154045375955),
  new Vector2(21.9056372549061, -33.5958066156508),
  new Vector2(21.9056372549061, -30.2134536744745),
  new Vector2(21.9056372549061, -23.4886252089325),
  new Vector2(21.9056372549063, -26.8390692583495),
  new Vector2(18.4987745098113, -37.5568696942594),
  new Vector2(18.4987745098112, -34.1745167530831),
  new Vector2(18.4987745098113, -30.8001323369581),
  new Vector2(15.067401960789, -31.9257422432742),
  new Vector2(11.68504901961, -32.6120167530775),
  new Vector2(8.27818627451509, -32.7590755766067),
  new Vector2(4.92034313725751, -31.509075576605),
  new Vector2(1.48897058823533, -37.2339558663811),
  new Vector2(1.5625, -33.9251323369694),
  new Vector2(-1.73299201770473, -31.7170259442491),
  new Vector2(1.5625, -30.6163088075579),
  new Vector2(1.5625, -27.3074852781463),
  new Vector2(-5.02848403540665, -29.0538088075522),
  new Vector2(-5.02848403540668, -25.7449852781406),
  new Vector2(-1.67821548132849, -25.0511252089382),
  new Vector2(-1.6782154813287, -21.7181748412828),
  new Vector2(-17.7122528603746, -18.9658742083452),
  new Vector2(-14.2563705074338, -18.9379716141673),
  new Vector2(-10.7831817478199, -18.9379716141616),
  new Vector2(-7.25677900417191, -18.9658742083454),
  new Vector2(-18.7906842329227, -15.5065990651451),
  new Vector2(-15.3174954733089, -15.5065990651394),
  new Vector2(-15.0999162590722, -22.3414415690115),
  new Vector2(-11.7910927296606, -15.534501659323),
  new Vector2(-22.5667258995912, -12.040538341418),
  new Vector2(-19.0935371399773, -12.0405383414122),
  new Vector2(-15.567134396329, -12.0684409355958),
  new Vector2(-25.5507945270409, -8.60238021187457),
  new Vector2(-22.0776057674273, -8.60238021186905),
  new Vector2(-18.5512030237789, -8.63028280605251),
  new Vector2(-27.6290216512223, -5.19212467651469),
  new Vector2(-24.1558328916084, -5.19212467650883),
  new Vector2(-20.6294301479604, -5.22002727069288),
  new Vector2(-29.050590278672, -1.80977173533849),
  new Vector2(-25.5774015190582, -1.8097717353328),
  new Vector2(-22.0509987754099, -1.83767432951641),
  new Vector2(-29.9946006953377, 1.72462816907455),
  new Vector2(-26.521411935724, 1.72462816908),
  new Vector2(-22.9950091920756, 1.69672557489666),
  new Vector2(-30.2388233596645, 5.23112547930396),
  new Vector2(-26.7656346000508, 5.23112547930938),
  new Vector2(-23.2392318564024, 5.20322288512601),
  new Vector2(-30.2122163676472, 8.70972019534975),
  new Vector2(-26.7390276080336, 8.70972019535512),
  new Vector2(-23.2126248643852, 8.68181760117179),
  new Vector2(-29.3318147476299, 12.1604123172119),
  new Vector2(-28.0573049437066, 15.5832018448905),
  new Vector2(-24.5841161840929, 15.5832018448905),
  new Vector2(-25.8586259880161, 12.1604123172176),
  new Vector2(-21.0577134404446, 15.5552992507069),
  new Vector2(-22.3322232443678, 12.132509723034),
  new Vector2(-28.616717491019, 22.3846527155843),
  new Vector2(-28.0573049437066, 18.9339605937448),
  new Vector2(-28.9271111797433, 25.7934693949778),
  new Vector2(-28.3716103286281, 32.718782462905),
  new Vector2(-28.3716103286281, 29.2680903410655),
  new Vector2(-28.4368603968801, 36.1455457604791),
  new Vector2(-21.6831237410162, 22.3966171277141),
  new Vector2(-21.1237111937038, 18.9459250058746),
  new Vector2(-21.9935174297405, 25.8054338071076),
  new Vector2(-25.1336445743505, 22.3966171277141),
  new Vector2(-24.5742320270381, 18.9459250058746),
  new Vector2(-25.4440382630747, 25.8054338071076),
  new Vector2(-24.8885374119596, 32.718782462905),
  new Vector2(-24.8885374119595, 29.2680903410655),
  new Vector2(-24.9537874802115, 36.1455457604791),
  new Vector2(-21.4380165786255, 32.7068180507744),
  new Vector2(-21.4380165786253, 29.2561259289357),
  new Vector2(-21.5032666468773, 36.1335813483494),
  new Vector2(-17.9115408841824, 35.5061259289357),
  new Vector2(-17.9115408841824, 32.0554338070963),
  new Vector2(-17.9767909524344, 38.9328892265098),
  new Vector2(-14.3850651897395, 37.3823536386453),
  new Vector2(-14.3850651897395, 33.9316615168059),
  new Vector2(-14.4503152579915, 40.8091169362194),
  new Vector2(-10.8805826873549, 37.7200101726146),
  new Vector2(-10.8805826873549, 34.2693180507752),
  new Vector2(-10.9458327556069, 41.1467734701887),
  new Vector2(-7.33233265322895, 37.5451996995594),
  new Vector2(-7.33233265322895, 34.0945075777199),
  new Vector2(-7.39758272148094, 40.9719629971335),
  new Vector2(-3.78408261910295, 37.5332352874295),
  new Vector2(-3.78408261910295, 34.0825431655901),
  new Vector2(-3.84933268735494, 40.9599985850036),
  new Vector2(-0.23583241062681, 40.5432728812571),
  new Vector2(6.62007858164202, 44.5591027618946),
  new Vector2(6.61624810300163, 41.0434777618964),
  new Vector2(6.62007858164208, 37.5927856400552),
  new Vector2(3.27521192800191, 42.7576065228836),
  new Vector2(-0.23583241062681, 37.0925807594176),
  new Vector2(-0.30108247887878, 33.5972444868844),
];

const rocksPositions1 = [
  new Vector2(-4.71865434726602, 7.51413223718804),
  new Vector2(-0.39369950232807, 0.30881062504021),
  new Vector2(2.06258866505212, -4.25800315689031),
  new Vector2(9.56891098307437, -1.81432704297034),
  new Vector2(-2.87890272079635, -1.81432704296896),
  new Vector2(5.37447420087173, 3.90627972843734),
  new Vector2(-5.49990434726622, 2.3437749480934),
  new Vector2(6.63029111254048, 10.843030075094),
  new Vector2(8.97404111254043, -6.349250422133),
];

const rocksPositions2 = [
  new Vector2(17.3299515357883, -44.3439934930325),
  new Vector2(23.7835352129593, -48.2069768243861),
  new Vector2(23.0022852129594, -43.2673141143056),
  new Vector2(13.4161962899893, -32.2605377137535),
  new Vector2(12.3377649174415, -39.0087356829326),
  new Vector2(1.1255508651516, -35.7112298355958),
  new Vector2(7.28874530959729, -21.9089752137535),
  new Vector2(7.66928554652394, -28.8550036081204),
  new Vector2(-2.84605861165517, -18.741077444875),
  new Vector2(-10.5138184854809, -25.2192289942684),
  new Vector2(-14.3548184172289, -19.6993277553645),
  new Vector2(-20.1924190775458, -7.23086441770704),
  new Vector2(-15.1360682428788, -0.80725330659561),
  new Vector2(-13.5735682428788, 4.66149669340439),
  new Vector2(-15.5266934172289, 10.834767826634),
  new Vector2(-6.39308679824353, 12.886961738053),
  new Vector2(-10.1528524232464, 17.1468753819568),
  new Vector2(-2.36747915935496, 16.0119617380531),
  new Vector2(-2.84605861196782, -31.6866518924371),
  new Vector2(19.629410681182, -36.1213616643141),
  new Vector2(-8.95131848548088, -31.3828324479942),
  new Vector2(-10.9044434854809, -14.4172441973069),
  new Vector2(-20.9954434172289, -1.49406711397265),
  new Vector2(-2.71470138157787, 22.4103985698379),
  new Vector2(12.9561268452334, 25.2295726608965),
  new Vector2(2.06993943032785, 25.9686612537963),
  new Vector2(4.60551673290725, 21.2811612559391),
  new Vector2(17.8030432530136, 26.3426864283305),
  new Vector2(7.73051673290767, 35.201789074368),
  new Vector2(25.3886450566995, 27.599882718272),
  new Vector2(25.3886450566994, 35.0390286577009),
  new Vector2(12.9561268442728, 40.9443748255626),
  new Vector2(25.814644609528, 41.1384728337965),
  new Vector2(18.8155018443581, 47.081256871411),
];

const rocksPositions3 = [
  new Vector2(14.5281862745207, -13.9720016570947),
  new Vector2(1.23478109751153, -21.9261252089325),
  new Vector2(-6.93371742168551, 30.5164812306715),
  new Vector2(-13.3535927316728, 27.7241804821868),
  new Vector2(-19.3169246671147, 23.204525836536),
  new Vector2(-20.1206237410161, 8.70972019624787),
  new Vector2(-12.5083327556069, -10.0331851377149),
  new Vector2(5.49261079889332, -26.6136252081594),
  new Vector2(16.0906862745208, -27.9252254700282),
  new Vector2(18.1924019604026, -21.7181748422206),
  new Vector2(5.71027767635432, -11.1385051891347),
  new Vector2(-2.24621742168551, -18.593174841277),
  new Vector2(-5.6942790041717, -8.91553834140666),
  new Vector2(-17.5310371399774, -5.05394636559802),
  new Vector2(-14.6294246671146, 5.42087634169093),
  new Vector2(-18.5581237410162, 14.1250903840046),
  new Vector2(-17.7544246671147, 28.9539812306714),
  new Vector2(-5.41183268644545, 17.5956528618599),
  new Vector2(-0.30295378810757, 17.1177992507068),
  new Vector2(13.159981105332, 30.8186259289357),
  new Vector2(4.40781137733097, 26.1616804803623),
  new Vector2(6.31689532233401, 34.5830457637418),
  new Vector2(19.6269949942237, 35.1597444868844),
  new Vector2(16.0111610497382, 40.0623247122098),
  new Vector2(17.8666298005396, 46.9633663788727),
  new Vector2(24.181159786002, 48.6979166666683),
  new Vector2(-5.55555555555429, 12.890625),
];

const woodLogsPositions1 = [
  new Vector2(-2.09765272079639, 4.3891274568438),
  new Vector2(3.01373451690949, -7.13050042213295),
  new Vector2(3.79498451690949, 8.8950525771395),
  new Vector2(6.93697420087176, -0.78125),
];

const woodLogsPositions2 = [
  new Vector2(18.1901937096938, -48.4375),
  new Vector2(20.9679714874707, -39.6564934930354),
  new Vector2(8.49585315273202, -35.9835268924371),
  new Vector2(6.3696276625364, -18.4664797520213),
  new Vector2(-5.06215338282347, -25.3596673355958),
  new Vector2(-4.40855861197068, -35.9835268924371),
  new Vector2(-11.8511483380672, -26.9221673355958),
  new Vector2(-7.67391553598624, -18.4664797520215),
  new Vector2(-17.5450684854807, -14.1003694220329),
  new Vector2(-14.0294434854809, -7.45974442203308),
  new Vector2(-19.9103010219915, 3.91178335574409),
  new Vector2(-9.63201908991203, 9.56806189947196),
  new Vector2(-6.39308679824353, 18.7093753819568),
  new Vector2(0.75752084064499, 17.7683615766342),
  new Vector2(6.76318514828728, 30.093509092609),
  new Vector2(8.32568514828716, 23.6670726608962),
  new Vector2(24.3712798251579, 31.7949263292689),
  new Vector2(21.2462798251579, 25.9686612537962),
  new Vector2(8.83627148609207, 39.8101803534642),
  new Vector2(26.9511450566995, 37.5480218201915),
  new Vector2(16.9487561119924, 43.582231695848),
  new Vector2(25.1952838897692, 45.1447316958478),
];

const woodLogsPositions3 = [
  new Vector2(2.79728109751256, -25.4003899148132),
  new Vector2(12.2298855202246, -25.7449852781264),
  new Vector2(7.67054738562958, -30.1545259442434),
  new Vector2(18.4987745089416, -18.1523940789475),
  new Vector2(19.6497140522986, -12.7010051891343),
  new Vector2(11.4031862745145, -11.138505189135),
  new Vector2(0, -13.3413238165787),
  new Vector2(-8.49621742168549, -14.9038238165786),
  new Vector2(-9.50695960918324, -4.55977121029602),
  new Vector2(-19.8755165786253, 1.69672557489667),
  new Vector2(-10.78318174782, 16.015625),
  new Vector2(-14.4503152579915, 11.1424686569648),
  new Vector2(-14.0708327556069, 30.8305903410655),
  new Vector2(-17.5753152579915, 19.6431577834687),
  new Vector2(-2.03405443149058, 13.3693176011775),
  new Vector2(-0.30295378810763, 21.642025836536),
  new Vector2(-0.65908261910295, 30.3225813920903),
  new Vector2(9.67473846067156, 29.1875529539709),
  new Vector2(12.2500502284538, 36.2724985850036),
  new Vector2(23.3861528096669, 43.9341169362194),
];

const artworksPositions = [
  new Vector3(6.8777, -1.5, -25.6264),
  new Vector3(11.4383, -1.5, -24.0333),
  new Vector3(12.7515, -1.5, -20.0401),
  new Vector3(13.5835, -1.5, -15.6866),
  new Vector3(100, 1, 100),
  new Vector3(100, 1, 100),
  new Vector3(100, 1, 100),
  new Vector3(100, 1, 100),
  new Vector3(100, 1, 100),
  new Vector3(100, 1, 100),
  new Vector3(100, 1, 100),
  new Vector3(100, 1, 100),
  new Vector3(100, 1, 100),
  new Vector3(100, 1, 100),
  new Vector3(100, 1, 100),
  new Vector3(100, 1, 100),
  new Vector3(100, 1, 100),
];

positions.set("curvePoints", curvePoints);
positions.set("treesPositions", [treesPositions1, treesPositions2, treesPositions3]);
positions.set("rocksPositions", [rocksPositions1, rocksPositions2, rocksPositions3]);
positions.set("woodLogsPositions", [
  woodLogsPositions1,
  woodLogsPositions2,
  woodLogsPositions3,
]);
positions.set("artworksPositions", artworksPositions);

export { positions };
