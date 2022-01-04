#include <begin_vertex>
float bigNoise = cnoise(vec4(vec3(transformed * 50.), 0.5)) * 0.004;
float smallNoise = cnoise(vec4(vec3(transformed * 200.), 0.5)) * 0.002;

transformed.z += bigNoise + smallNoise;