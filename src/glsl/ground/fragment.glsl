#include ../utils/noise3d;

varying vec2 vUv;

uniform float uTime;
uniform float uSpeed;
uniform float uStroke;
uniform float uSmallNoise;
uniform float uBigNoise;
uniform vec3 uColor;

void main() {
  float time = uTime * uSpeed;

  // Noise
  float smallNoise = cnoise(vec4(vec3(vUv * uSmallNoise, 0.5), time));
  float bigNoise = cnoise(vec4(vec3(vUv * uBigNoise, 0.5), time / 2.));
  float mixNoise = smoothstep(0.1, 0.9, cnoise(vec4(vec3(vUv * 50., 0.5), time)));

  // Stroke
  float stroke = cos((vUv.x + vUv.y) * uStroke);
  stroke += (bigNoise * 2.0 - 1.0) + (smallNoise * 2.0 - 1.0);

  // Render
  vec4 render = mix(vec4(mixNoise), vec4(uColor, 1.0) * vec4(stroke), uColor.z);

  gl_FragColor = render;
}
