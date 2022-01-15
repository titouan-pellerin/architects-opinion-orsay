#include <begin_vertex>

vUv = uv;

float bigNoise = cnoise(vec4(vec3(transformed), 0.5)) * 0.15;
transformed.xyz += bigNoise;