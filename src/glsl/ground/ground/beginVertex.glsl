#include <begin_vertex>
vUv = uv;

float elevation = 1.;
vec3 curveCoords = texture2D(uTexture, vUv).xyz;

if(curveCoords.r >= .7) elevation = 0.01;

// float bigNoise = cnoise(vec4(vec3(transformed * 50.), 0.5)) * 0.004;
// float smallNoise = cnoise(vec4(vec3(transformed * 200.), 0.5)) * 0.002;
// float bigNoise = cnoise(vec2(transformed.xy * 50.)) * elevation;
float smallNoise = cnoise(vec2(transformed.xy * 200.)) * 0.0008;

// transformed.z += bigNoise;
// transformed.z += bigNoise + smallNoise;
transformed.z *= elevation;
transformed.z += smallNoise;
