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
uniform sampler2D uTexture;

void main() {

  vec3 curveCoords = texture2D(uTexture, vUv).xyz;

  float time = uTime * uSpeed;

  // Noise
  // float smallNoise = cnoise(vec4(vec3(vUv * uSmallNoise, 0.5), time));
  // float smallNoise = smoothNoise(vec2(vUv * uSmallNoise + time));
  float smallNoise = cnoise(vec2(vUv * uSmallNoise + time));
  // float bigNoise = cnoise(vec4(vec3(vUv * uBigNoise, 0.5), time / 2.));
  // float bigNoise = smoothNoise(vec2(vUv * uBigNoise + time * .5));
  float bigNoise = cnoise(vec2(vUv * uBigNoise + time * .5));
  // float mixNoise = smoothstep(0.1, 0.9, cnoise(vec4(vec3(vUv * 50., 0.5), time)));
  // float mixNoise = smoothstep(0.1, 0.9, smoothNoise(vec2(vUv * 50. + time)));
  float mixNoise = smoothstep(0.1, 0.9, cnoise(vec2(vUv * 50. + time)));

  // Stroke
  float stroke = cos((vUv.x + vUv.y) * uStroke);
  stroke += (bigNoise * 2.0 - 1.0) + (smallNoise * 2.0 - 1.0);

  // Render
  vec4 render = mix(vec4(mixNoise), vec4(uColor, 1.0) * vec4(stroke), uColor.z);

  // if(vUv.x >= .5 && vUv.x <= .6)
  //   render = vec4(1.);
  if(curveCoords.r >= .7 && curveCoords.g >= .7 && curveCoords.b >= .7)
    render = vec4(curveCoords, 1.);
  // if(vCurvePos.x <= .5 && vCurvePos.x >= 5.)
  //   render = vec4(1.);
  gl_FragColor = render;
}
