#define PI 3.1415926535897932384626433832795
// #include ../utils/noise2d;
#include ../utils/noise3d;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform vec3 uColor;
uniform float uTime;

vec2 rotate(vec2 uv, float rotation, vec2 mid) {
  return vec2(cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x, cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y);
}

void main() {
  float time = uTime * 0.5;
  float strength = length(vUv);
  float strength3 = 1.0 - pow(1.0 - distance(vUv, vec2(0.5)), 2.);
  float line = mod(vUv.y * 10. + time, 1.0);
  float strengthCross = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

  float noise = cnoise(vec4(vec3(vUv, strength), time));
  float noise2 = cnoise(vec4(vec3(vUv, line), 0.5));
  float smallNoise = cnoise(vec4(vec3((vUv * 2.), strengthCross), time));

  float test = mix(smallNoise, noise, strength3);

  gl_FragColor = vec4(abs(strength3));
  gl_FragColor = vec4(vPosition, 1.0);
}