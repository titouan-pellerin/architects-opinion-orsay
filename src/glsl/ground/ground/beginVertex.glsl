#include <begin_vertex>
vUv = uv;

// float bigNoise = cnoise(vec4(vec3(transformed * 50.), 0.5)) * 0.004;
// float smallNoise = cnoise(vec4(vec3(transformed * 200.), 0.5)) * 0.002;
float bigNoise = cnoise(vec2(transformed.xy * 50.)) * 0.004;
// float smallNoise = cnoise(vec2(transformed.xy * 200.)) * 0.002;

transformed.z += bigNoise;
// transformed.z += bigNoise + smallNoise;