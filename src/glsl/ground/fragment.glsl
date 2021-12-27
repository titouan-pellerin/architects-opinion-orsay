#include ../utils/noise2d;

varying vec2 vUv;

uniform float uTime;
uniform float uSpeed;
uniform float uStroke;
uniform float uSmallNoise;
uniform float uBigNoise;
uniform vec3 uColor;
uniform sampler2D uTexture;

void main() {

  vec3 curveCoords = texture2D(uTexture, vUv).xyz;

  float time = uTime * uSpeed;

  float smallNoise = cnoise(vec2(vUv * uSmallNoise + time));
  float bigNoise = cnoise(vec2(vUv * uBigNoise + time * .5));
  float mixNoise = smoothstep(0.1, 0.9, cnoise(vec2(vUv * 50. + time)));

  // Stroke
  float stroke = cos((vUv.x + vUv.y) * uStroke);
  stroke += (bigNoise * 2.0 - 1.0) + (smallNoise * 2.0 - 1.0);

  // Render
  vec4 render = mix(vec4(mixNoise), vec4(uColor, 1.0) * vec4(stroke), uColor.z);

  // if(vUv.x >= .5 && vUv.x <= .6)
  //   render = vec4(1.);
  if(curveCoords.r >= .7 && curveCoords.g >= .7 && curveCoords.b >= .7)
    render = mix(vec4(curveCoords, 1.), render, 1. - curveCoords.r);

  gl_FragColor = render;
}
