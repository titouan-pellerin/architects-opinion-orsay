#include <begin_vertex>
vUv = uv;

float noise = cnoise(transformed.xy * 100. - (uTime * 0.25)) * 0.0002;
float noise2 = cnoise(transformed.xy * 200. - (uTime * 0.25)) * 0.0001;

float noise3 = cnoise(transformed.xy * 100. + (uTime * 0.25)) * 0.0002;
float noise4 = cnoise(transformed.xy * 200. + (uTime * 0.25)) * 0.0001;

vNoise = noise;
vNoise2 = noise2;
vNoise3 = noise3;
vNoise4 = noise4;

transformed.z += noise;
transformed.z += noise2;
transformed.z += noise3;
transformed.z += noise4;
