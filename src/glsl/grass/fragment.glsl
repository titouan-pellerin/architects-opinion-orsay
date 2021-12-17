#include ../utils/noise3d;

varying vec2 vUv;

uniform vec3 uColor;
uniform float uTime;

void main() {
  // Noise
  float smallNoise = cnoise(vec4(vec3(vUv, 0.5), uTime));
  float bigNoise = cnoise(vec4(vec3(vUv, 0.5), uTime / 2.));
  float mixNoise = smoothstep(0.1, 0.9, cnoise(vec4(vec3(vUv * 50., 0.5), uTime)));

  // // Stroke
  float stroke = cos((vUv.x + vUv.y) * 1.15);

  gl_FragColor = vec4(stroke);
}