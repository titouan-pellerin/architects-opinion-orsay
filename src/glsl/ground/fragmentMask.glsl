varying vec3 vPosition;
uniform vec3 uColor;
uniform float uTime;

void main() {
  float strength = length(vPosition);

  vec3 render = mix(vec3(strength), uColor * 1.5, 0.5);
  gl_FragColor = vec4(vec3(strength), 1.0);
  gl_FragColor = vec4(render, 1.0);
}
