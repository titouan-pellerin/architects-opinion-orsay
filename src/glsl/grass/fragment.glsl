#include ../utils/noise2d;

varying vec2 vUv;

uniform vec3 uColor;
uniform float uTime;

void main() {
  float clarity = vUv.y * 5.;

  float strength = length(1. - vUv.y);
  float strength2 = length(vUv.y);
  float strength3 = length(vUv.x);


  // Random position
  float noise = cnoise(vUv * 2.);

  float alpha;
  alpha -= noise;


  vec3 render = uColor;
  float test = mix(strength3, strength2, strength);
  render *= test;

  gl_FragColor = vec4(alpha, alpha, alpha, alpha);
  gl_FragColor = vec4(strength3, strength3, strength3, strength3);
  gl_FragColor = vec4(vec3(render) * clarity, strength3);
}