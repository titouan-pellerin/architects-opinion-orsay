#include <begin_vertex>
vUv = uv;

vec4 curveCoords = texture2D(uTexture, vUv).rgba;
vCurveCoords = curveCoords;

float elevation = mix(1., .01, curveCoords.r * curveCoords.a);

float riverOffset = mix(0., .008, curveCoords.g * curveCoords.a);
riverOffset *= mix(1., .8, (curveCoords.r + curveCoords.g) * .5 * curveCoords.a);

float riverElevation = mix(1., 0.1, curveCoords.g * curveCoords.a);

float smallNoise = cnoise(vec2(transformed.xy * 200.)) * 0.0008;
vSmallNoise = smallNoise;

transformed.z *= elevation * riverElevation;
transformed.z += smallNoise - riverOffset;
