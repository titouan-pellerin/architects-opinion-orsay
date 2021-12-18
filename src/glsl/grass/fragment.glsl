#include ../utils/noise3d;

varying vec2 vUv;

uniform vec3 uColor;
uniform vec3 uColor2;
uniform float uTime;

void main() {
  // Noise
  float smallNoise = cnoise(vec4(vec3(vUv, 0.5), uTime));
  float bigNoise = cnoise(vec4(vec3(vUv, 0.5), uTime / 2.));
  float mixNoise = smoothstep(0.1, 0.9, cnoise(vec4(vec3(vUv * 50., 0.5), uTime)));

  // // Stroke
  float stroke = cos((vUv.x + vUv.y) * 1.15);

  vec4 render = mix(vec4(uColor, 1.0), vec4(uColor2, 1.0), stroke );

  gl_FragColor = vec4(render);
  gl_FragColor = vec4(render);
}
