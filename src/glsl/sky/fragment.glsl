// #include ../utils/noise3d;
#include ../utils/noise2d;
#include ../utils/smoothNoise;

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
  float smallNoise = cnoise(vec2(vUv * uSmallNoise + time * .4));
  float bigNoise = cnoise(vec2(vUv * uBigNoise + time * .4));
  float mixNoise = smoothstep(0.1, 0.9, cnoise(vec2(vUv * 50. + time * .4)));

  // Stroke
  float stroke = cos((vUv.x + vUv.y) * uStroke);
  stroke += (bigNoise * 2.0 - 1.0) + (smallNoise * 2.0 - 1.0);

  // Render
  vec4 render = mix(vec4(mixNoise), vec4(uColor, 1.0) * vec4(stroke), uColor.z);

  gl_FragColor = render;
}
