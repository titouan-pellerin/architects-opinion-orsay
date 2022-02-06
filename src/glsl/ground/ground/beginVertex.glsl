#include <begin_vertex>
vUv = uv;

vec3 curveCoords = texture2D(uTexture, vUv).rgb;

float elevation = mix(1., .01, curveCoords.r);

float riverOffset = mix(0., .008, curveCoords.g);
riverOffset *= mix(1., .3, (curveCoords.r + curveCoords.g) * .5);

float riverElevation = mix(1., 0.1, curveCoords.g);

float smallNoise = cnoise(vec2(transformed.xy * 200.)) * 0.0008;
vSmallNoise = smallNoise;

transformed.z *= elevation * riverElevation;
transformed.z += smallNoise - riverOffset;
