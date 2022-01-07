#include <begin_vertex>

vUv = uv;

float bigNoise = cnoise(vec4(vec3(transformed), 0.5)) * 0.4;

transformed.x += bigNoise;
transformed.zy += bigNoise * 0.25;
vNoise = vec4(bigNoise);
// transformed.y *= transformed.x;
