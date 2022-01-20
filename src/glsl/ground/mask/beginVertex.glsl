#include <begin_vertex>
vUv = uv;

// float elevation = 1.;
vec3 curveCoords = texture2D(uTexture, vUv).rgb;

float elevation = mix(1., .01, curveCoords.r);

float riverOffset = mix(0., .006, curveCoords.g);
riverOffset *= mix(2., .5, (curveCoords.r + curveCoords.g) * .5);
// riverOffset = mix(1., riverOffset, mix(curveCoords.r, curveCoords.g, .5));

float riverElevation = mix(1., 0.1, curveCoords.g);

float smallNoise = cnoise(vec2(transformed.xy * 200.)) * 0.0008;

transformed.z *= elevation * riverElevation;
transformed.z += smallNoise - riverOffset;
// transformed.z -= riverOffset;
