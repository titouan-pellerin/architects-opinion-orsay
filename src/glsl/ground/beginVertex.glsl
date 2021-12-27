#include <begin_vertex>
vPosition = transformed;
// float bigNoise = cnoise(vec4(vec3(transformed * 50.), uTime * 0.1)) * 0.0035;
float bigNoise = cnoise(vec4(vec3(transformed * 50.), 0.5)) * 0.0045;

// transformed.zy += bigNoise;
transformed.z += bigNoise;
