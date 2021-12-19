#include ../utils/noise3d;

varying vec2 vUv;

uniform vec3 uColor;
uniform vec3 uColor2;
uniform float uTime;

void main() {
  // Stroke
  float stroke = cos((vUv.x + vUv.y) * 1.15);

  // Render
  vec4 render = mix(vec4(uColor, 1.0), vec4(uColor2, 1.0), stroke );

  gl_FragColor = vec4(render);
}
