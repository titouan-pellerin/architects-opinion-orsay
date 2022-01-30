#include <begin_vertex>
vUv = uv;

float noise = cnoise(transformed.xy * 100. + (uTime * 0.25)) * 0.0005;
float noise2 = cnoise(transformed.xy * 200. + (uTime * 0.25)) * 0.00025;
vNoise = noise;
vNoise2 = noise2;

transformed.z += noise;
transformed.z += noise2;
