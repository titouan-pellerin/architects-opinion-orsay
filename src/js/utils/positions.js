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
  new Vector2(0.0897, -2.202),
];

const treesPositions1 = [
  new Vector2(-4.28592323879118, -17.9521774481003),
  new Vector2(-7.64360188178706, -17.9446974238571),
  new Vector2(-8.85002493998005, -11.230281827099),
  new Vector2(-5.46469229526846, -11.2663688895196),
  new Vector2(-11.3283191948739, -14.5999683717662),
  new Vector2(-8.00292994511264, -14.5999683717662),
  new Vector2(-4.69510938596048, -14.5999683717662),
  new Vector2(-10.9909876559954, -17.9335678540127),
  new Vector2(-3.22889771942985, -24.6194364877795),
  new Vector2(-6.48692018778546, -24.6194364877795),
  new Vector2(-10.8271491229886, -21.2398313322154),
  new Vector2(-7.5280511303616, -21.2547913807042),
  new Vector2(-4.16894507759764, -21.258440926303),
  new Vector2(-9.79327570883014, -24.6194364877795),
  new Vector2(-0.51476371594391, -31.3418184652733),
  new Vector2(-3.86673006694592, -31.3418184652733),
  new Vector2(-3.99001909265164, -34.8249920454833),
  new Vector2(-8.74855201443265, -27.9392673988184),
  new Vector2(-5.42923006694592, -27.9392673988184),
  new Vector2(-2.14511846405114, -27.9392673988184),
  new Vector2(-7.18605201443268, -31.3418184652733),
  new Vector2(-0.65010552101221, -34.8249920454833),
  new Vector2(7.62817265484725, -41.5591759351145),
  new Vector2(4.25440836787631, -41.5591759351145),
  new Vector2(6.64322815064791, -38.1920839902989),
  new Vector2(3.32521344476505, -38.1920839902989),
  new Vector2(0, -38.1920839902989),
  new Vector2(2.69190836787628, -34.8249920454833),
  new Vector2(0.91239447898776, -41.5591759351145),
  new Vector2(18.0833234463818, -48.3418165227903),
  new Vector2(7.10828392365666, -18.3718266799815),
  new Vector2(6.99390483869144, -15.0208539735133),
  new Vector2(6.64322815064787, -11.6698812670449),
  new Vector2(14.9583234463819, -21.6802184176572),
  new Vector2(18.0833234463818, -31.6850400249166),
  new Vector2(17.4215235611257, -28.4216064625383),
  new Vector2(10.3095954565503, -15.0208539735132),
  new Vector2(14.1003359937883, -28.4216064625383),
  new Vector2(13.6435978026668, -25.0115820161227),
  new Vector2(16.9558724659907, -25.0509124400963),
  new Vector2(11.5820257985149, -21.6802184176572),
  new Vector2(13.7571987388867, -18.3718266799815),
  new Vector2(32.1618857697899, -48.3741427204563),
  new Vector2(32.0319327469178, -44.9644425283708),
  new Vector2(30.73010472404, -41.6597039662804),
  new Vector2(35.41760472404, -48.3741427204563),
  new Vector2(35.4176047240401, -44.9644425283708),
  new Vector2(34.1063302142345, -41.6597039662804),
  new Vector2(28.77697972404, -48.3418165227903),
  new Vector2(28.647026701168, -44.9644425283708),
  new Vector2(27.3594960639116, -41.6597039662804),
  new Vector2(28.1070450835159, -38.3830943015568),
  new Vector2(24.8610279266586, -38.3830943015568),
  new Vector2(24.8610279266589, -35.0130408705979),
  new Vector2(31.3775720443005, -38.3830943015568),
  new Vector2(28.1744470443016, -35.0130408705979),
  new Vector2(24.6601208320048, -31.642987439639),
  new Vector2(21.5351208320044, -35.0130408705979),
  new Vector2(21.3227025313528, -31.6850400249166),
  new Vector2(13.6435978026668, -15.0208539735133),
  new Vector2(10.2332839236567, -25.0115820161227),
  new Vector2(8.20572815064796, -21.6917043480521),
  new Vector2(10.4042187176958, -18.3718266799815),
  new Vector2(9.91324449051941, -11.669881267045),
  new Vector2(20.7387485834658, -28.4216064625383),
  new Vector2(13.2098852756428, -11.6698812670449),
  new Vector2(13.9517787512602, -48.2412884916243),
  new Vector2(14.7339859022197, -44.92626787993),
  new Vector2(11.4111658346785, -44.9002322133708),
  new Vector2(8.07326155579917, -44.900232213368),
  new Vector2(12.0198199609546, -4.9666973270121),
  new Vector2(14.6178591766442, -8.32454046426676),
  new Vector2(11.3055845133204, -8.32454046426676),
  new Vector2(-11.1279299451127, -7.86059528243183),
  new Vector2(-11.2211351699102, -4.4909087377647),
  new Vector2(-7.71623320912622, -7.86059528243189),
  new Vector2(-12.1606776535714, -11.230281827099),
  new Vector2(10.8930793697653, -41.5591759351145),
  new Vector2(10.6444364827212, -48.2412884916243),
];

const treesPositions2 = [
  new Vector2(0.09260053620327, 43.3845665837964),
  new Vector2(7.27377148609207, 43.5822316958479),
  new Vector2(7.27377148609207, 47.081256870382),
  new Vector2(32.2775293388815, 49.3794199190292),
  new Vector2(37.5600946715224, 38.832544919029),
  new Vector2(36.0004171418211, 21.3209310426578),
  new Vector2(32.5168993770262, 21.3209310426578),
  new Vector2(29.0362040825244, 17.9455999766162),
  new Vector2(29.0362040825244, 21.3209310426578),
  new Vector2(25.5555087880269, 15.699506226615),
  new Vector2(25.5555087880282, 19.1501983484557),
  new Vector2(-9.63201908991209, -11.7824415052468),
  new Vector2(-9.92773508389462, -8.44675137227),
  new Vector2(10.0583531527321, -18.7410774448651),
  new Vector2(13.4161962899896, -15.2617594750595),
  new Vector2(15.7674515357886, -29.1355377137548),
  new Vector2(12.3377649174416, -29.1355377137549),
  new Vector2(29.2706675659023, -35.9835268924385),
  new Vector2(25.9128244286502, -35.9835268924357),
  new Vector2(25.9128244286502, -32.5862298355943),
  new Vector2(22.530471487471, -32.5862298355944),
  new Vector2(33.4005695266911, -48.4375000000014),
  new Vector2(29.9937067815961, -48.4375000000014),
  new Vector2(26.5623342325739, -48.4375000000014),
  new Vector2(33.3883146247273, -46.1804767933316),
  new Vector2(29.9814518796325, -46.1804767933316),
  new Vector2(26.5500793306103, -46.1804767933316),
  new Vector2(32.456942075703, -42.7814934930339),
  new Vector2(29.050079330608, -42.7814934930339),
  new Vector2(25.6187067815858, -42.7814934930339),
  new Vector2(31.4030205070765, -39.3825101927362),
  new Vector2(27.9961577619815, -39.3825101927362),
  new Vector2(24.5647852129593, -39.3825101927362),
  new Vector2(22.5304714874709, -35.9835268924357),
  new Vector2(25.9128244286502, -29.1355377137578),
  new Vector2(22.5304714874709, -29.1997454878057),
  new Vector2(19.1971381541407, -29.1997454878086),
  new Vector2(19.1971381541408, -32.5862298355943),
  new Vector2(16.8293889711322, -25.6528421507497),
  new Vector2(13.4161962899896, -25.6528421507468),
  new Vector2(10.0583531527321, -25.6528421507497),
  new Vector2(16.8293889711322, -18.7410774448651),
  new Vector2(13.4161962899896, -18.7410774448679),
  new Vector2(16.8293889711322, -22.3098302217423),
  new Vector2(13.4161962899896, -22.2459794056491),
  new Vector2(10.0583531527321, -22.245979405649),
  new Vector2(10.6465884468491, -11.7824415052511),
  new Vector2(10.0583531527321, -15.2361754840811),
  new Vector2(6.70051001548018, -15.2361754840811),
  new Vector2(3.2446276625378, -15.1136264644733),
  new Vector2(7.28874530959735, -11.782441505251),
  new Vector2(3.97992178018376, -11.7824415052485),
  new Vector2(0.22511733935178, -8.43446625161878),
  new Vector2(0.59756883900947, -11.7824415052453),
  new Vector2(-0.18674488647999, -15.1136264644791),
  new Vector2(-3.49965338321287, -15.1136264644734),
  new Vector2(-2.84605861197066, -11.7578712639514),
  new Vector2(-3.08662754712824, -8.43446625162159),
  new Vector2(-6.83502920020373, -15.1136264644762),
  new Vector2(-6.19777429824354, -11.7824415052453),
  new Vector2(-6.49349029222604, -8.43446625162159),
  new Vector2(-4.05208404222607, -5.12785153368752),
  new Vector2(-7.44879819663421, -5.12785153368468),
  new Vector2(-10.8066413338917, -5.12785153368755),
  new Vector2(-4.41015695889178, -1.77428061964804),
  new Vector2(-7.84440175056034, -1.77428061964804),
  new Vector2(-11.2298184172289, -1.77428061964804),
  new Vector2(-9.92773508389462, 1.55328698780298),
  new Vector2(-9.21700149098113, 4.82363770435936),
  new Vector2(-3.08662754712827, 1.55328698780295),
  new Vector2(-6.49349029222606, 1.57062252553143),
  new Vector2(-5.89668899098073, 4.82363770435706),
  new Vector2(-5.89668899098073, 8.14253754293818),
  new Vector2(-2.41361607431595, 5.07966806200621),
  new Vector2(-2.4136160743154, 8.39856790058775),
  new Vector2(-2.4136160743154, 11.7174677391688),
  new Vector2(1.13998635623883, 7.40597881318763),
  new Vector2(1.13998635623883, 10.7248786517687),
  new Vector2(1.13998635623883, 14.0437784903497),
  new Vector2(4.64488831702283, 10.2351847403497),
  new Vector2(4.64488831702283, 13.5540845789308),
  new Vector2(4.64488831702283, 16.8729844175118),
  new Vector2(8.05175106212346, 12.2873786517687),
  new Vector2(8.05175106212346, 15.6062784903497),
  new Vector2(8.05175106212346, 18.9251783289308),
  new Vector2(11.4831236111399, 14.0437784903497),
  new Vector2(11.4831236111399, 17.3626783289308),
  new Vector2(11.4831236111399, 20.6815781675118),
  new Vector2(14.9010923611399, 13.5540845789308),
  new Vector2(14.9010923611399, 16.8729844175118),
  new Vector2(14.9010923611399, 20.1918842560929),
  new Vector2(18.4818215278028, 13.5540845789308),
  new Vector2(18.4818215278028, 16.8729844175118),
  new Vector2(18.4818215278028, 20.1918842560929),
  new Vector2(22.1049879546968, 15.2562117043203),
  new Vector2(22.1049879546981, 18.5751115429026),
  new Vector2(22.1049879546968, 21.8940113814824),
  new Vector2(25.5555087880282, 22.5255294144972),
  new Vector2(36.4235942251582, 24.8953172729898),
  new Vector2(32.9428989306564, 24.8953172729898),
  new Vector2(29.4622036361602, 24.8953172729898),
  new Vector2(37.1071879751582, 28.4697035033219),
  new Vector2(33.6264926806564, 28.4697035033219),
  new Vector2(30.1457973861602, 28.4697035033219),
  new Vector2(37.5629171418211, 31.9100571739284),
  new Vector2(34.0822218473193, 31.9100571739284),
  new Vector2(30.6015265528231, 31.9100571739284),
  new Vector2(37.5600946715224, 35.316919919029),
  new Vector2(34.0793993770205, 35.316919919029),
  new Vector2(30.5987040825244, 35.316919919029),
  new Vector2(34.0822218473249, 38.832544919029),
  new Vector2(32.2775293388815, 42.348169919029),
  new Vector2(30.5987040825244, 38.832544919029),
  new Vector2(28.794011574081, 42.348169919029),
  new Vector2(32.2775293388815, 45.863794919029),
  new Vector2(28.794011574081, 49.3794199190292),
  new Vector2(28.8428429155942, 45.863794919029),
  new Vector2(35.755402163079, 42.348169919029),
  new Vector2(35.755402163079, 45.863794919029),
  new Vector2(35.6433106121699, 49.3794199190292),
  new Vector2(14.4372619797252, 49.2642890743696),
  new Vector2(14.4372619797252, 45.7486640743696),
  new Vector2(10.8066853913954, 49.2642890743696),
  new Vector2(10.8555167329087, 45.7486640743696),
  new Vector2(0.09260053620327, 29.1623827182718),
  new Vector2(0.09260053620327, 32.6614078928003),
  new Vector2(3.63818514828722, 47.9106919473963),
  new Vector2(3.63435466964575, 44.3950669473963),
  new Vector2(3.63243943032785, 30.7553158094606),
  new Vector2(3.63626990896933, 34.151668814826),
  new Vector2(3.63435466964575, 37.5480218201915),
  new Vector2(3.63818514828722, 40.9443748255569),
  new Vector2(0.09260053620327, 39.8101803534644),
  new Vector2(0.09260053620327, 36.2357941231323),
  new Vector2(-6.52243335453022, 23.8065781675118),
  new Vector2(-6.90489887012404, 27.9051864283304),
  new Vector2(-11.8511483380671, -32.2605377137534),
  new Vector2(-11.8511483380672, -35.7112298355958),
  new Vector2(-15.3667733380673, -33.8230377137535),
  new Vector2(-15.3667733380672, -37.2737298355986),
  new Vector2(-8.23801298965347, -35.3855377137535),
  new Vector2(1.88453602995495, -43.5246670554818),
  new Vector2(15.2668889711322, -45.2035886241106),
  new Vector2(15.2668889711322, -48.4375),
  new Vector2(11.9090458338746, -45.2035886241106),
  new Vector2(11.9090458338747, -41.8457454868559),
  new Vector2(8.57571250054434, -43.2673141143056),
  new Vector2(8.5757125005444, -39.8901514042251),
  new Vector2(5.21786936328681, -42.8629023496001),
  new Vector2(5.21786936328681, -39.3825101927376),
  new Vector2(1.88453602995509, -40.1423141143056),
  new Vector2(-1.49781691122257, -44.0516278397951),
  new Vector2(-4.85566004847726, -43.2673141143056),
  new Vector2(-1.49781691122257, -40.5712356829326),
  new Vector2(-1.49781691122257, -47.4339807809713),
  new Vector2(11.9090458338746, -48.4375),
  new Vector2(8.56345759858073, -46.6444768243861),
  new Vector2(5.21786936328681, -46.3432945064625),
  new Vector2(1.88453602995509, -47.0234415652868),
  new Vector2(-4.85566004847726, -46.6444768243861),
  new Vector2(-8.2380129896535, -42.2869219574437),
  new Vector2(-4.85566004847726, -39.8901514042251),
  new Vector2(-8.2380129896535, -38.8362298355986),
  new Vector2(-11.8023931638618, -39.2065661081205),
  new Vector2(-15.3667733380672, -23.4714752137535),
  new Vector2(-15.3667733380672, -26.9221673355958),
  new Vector2(-15.3667733380671, -30.4175036081204),
  new Vector2(-18.7846691372727, -18.8591380999014),
  new Vector2(-18.7846691372727, -22.3098302217437),
  new Vector2(-18.8499192055247, -29.3005027667903),
  new Vector2(-18.8499192055247, -25.8051664942684),
  new Vector2(-21.7276829152496, -15.3861239027151),
  new Vector2(-22.2486621501702, -18.8368160245602),
  new Vector2(-22.2758983124663, -22.3321522970849),
  new Vector2(-28.0809468894489, 15.9323895791431),
  new Vector2(-28.080946889449, 12.4816974573005),
  new Vector2(-28.5257524108772, -11.9186902243655),
  new Vector2(-28.5257524108772, -15.3861239027151),
  new Vector2(-25.7370509878626, -18.8591380999014),
  new Vector2(-30.3170105808078, -8.42335395183227),
  new Vector2(-30.3170105808078, -4.97266182998999),
  new Vector2(-30.8235465285207, -1.39361777491446),
  new Vector2(-30.6601478357123, 2.04033279041482),
  new Vector2(-30.0882524108772, 5.47428335574409),
  new Vector2(-28.1461969577009, 8.98636118477613),
  new Vector2(-24.5219191116718, 15.8877454284607),
  new Vector2(-24.5219191116717, 12.4370533066184),
  new Vector2(-24.5871691799238, 8.9417170340937),
  new Vector2(-26.8438218211941, -4.97266182998999),
  new Vector2(-26.8438218211941, -8.42335395183085),
  new Vector2(-22.2758983124662, -25.8274885696067),
  new Vector2(-25.1186343553229, -15.3414797520213),
  new Vector2(-25.1186343553229, -11.8963681490186),
  new Vector2(-23.3174190775457, -5.00056442417339),
  new Vector2(-23.3174190775457, -8.45125654601446),
  new Vector2(-21.7549190775458, -11.9186902243655),
  new Vector2(-26.5617037656398, 5.50218594992771),
  new Vector2(-27.2995509878626, 2.04033279041342),
  new Vector2(-27.3648010561146, -1.45500348211552),
  new Vector2(-23.0353010219915, 5.47428335574409),
  new Vector2(-23.7731482442142, 2.01243019623008),
  new Vector2(-23.8383983124663, -1.4829060762992),
  new Vector2(-21.0606934854809, 19.3929691319568),
  new Vector2(-20.9954434172289, 15.9100675037962),
  new Vector2(-20.9954434172289, 12.4593753819568),
  new Vector2(-21.0606934854809, 8.96403910942922),
  new Vector2(-17.4798184172289, 21.2811612537962),
  new Vector2(-17.4798184172289, 17.8304691319568),
  new Vector2(-17.5450684854809, 14.3351328594292),
  new Vector2(-13.9641934172289, 25.4060090926089),
  new Vector2(-13.8989433489765, 21.5409020207523),
  new Vector2(-13.9641934172289, 18.0455657482241),
  new Vector2(-10.3833181746268, 28.3545726586624),
  new Vector2(-3.36122949736364, 33.6091340926089),
  new Vector2(-3.36505997600511, 30.0935090926089),
  new Vector2(-3.36122949736364, 26.6428169707694),
  new Vector2(-6.90489887012404, 31.4042116028645),
  new Vector2(-10.3833181746268, 24.903880536823),
  new Vector2(-10.3833181746268, 20.9941293142776),
  new Vector2(17.8030432530136, 49.2642890743696),
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
  new Vector2(24.2739337549552, -42.612671422944),
  new Vector2(10.0703805900991, -36.3874920454833),
  new Vector2(8.50788059009936, -27.3271774481002),
  new Vector2(-1.66639771942985, -23.3878844089304),
  new Vector2(3.20777063431024, -14.1225378162118),
  new Vector2(14.5441854495403, -41.5591759351145),
  new Vector2(1.91806208352862, -30.2498765770849),
  new Vector2(26.4389664346937, -46.4264144972049),
  new Vector2(20.2387742093265, -37.0016339869295),
  new Vector2(5.81690836787628, -34.912512839432),
  new Vector2(14.2215451889057, -31.8123765770849),
  new Vector2(4.7702706343102, -21.5911763168862),
  new Vector2(-1.58922305517419, -17.7249683717662),
  new Vector2(-4.16894507759764, -7.9327694072731),
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
  new Vector2(17.7428591766443, -33.8766339869295),
  new Vector2(10.7002312011729, -30.4521774481003),
  new Vector2(18.9846892420065, -45.4335793791273),
  new Vector2(-0.02672305517302, -26.5070541730922),
  new Vector2(11.4111658346815, -39.5124920454833),
  new Vector2(3.82038059009918, -18.2712986488155),
  new Vector2(22.322107542658, -39.5124920454833),
  new Vector2(6.94538059009972, -7.86059528243152),
  new Vector2(-2.72342323879113, -13.131853235879),
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
  new Vector2(0.1739, -0.6917),
  new Vector2(-0.0214, -1.314),
  new Vector2(-0.0957, -1.8269),
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
positions.set("artworksPositions", artworksPositions);

export { positions };
