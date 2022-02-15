#include ../utils/noise2d;

#define PI 3.1415926535897932384626433832795

uniform sampler2D tDiffuse;
varying vec2 vUv;
uniform float uTime;
uniform float uCornerIntensity;
uniform float uCornerSize;
uniform vec2 uRes;
uniform vec3 uTintColor;
uniform vec3 uCornerColor;

uniform vec2 uBlurPos;
uniform float uBlurIntensity;
float random(vec3 scale, float seed) {
  return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
}
float hash(vec2 p) {
  return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x))));
}

vec2 rotate(vec2 uv, float rotation, vec2 mid) {
  return vec2(cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x, cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y);
}

void main() {

  vec2 rotateTest = rotate(uBlurPos, sin(uTime) + PI * 0.5, vec2(0., 0.)); 

    // Tint
  vec4 TintColor = vec4(uTintColor, 1.0);

    // Corner
  float corner = pow(1.0 - distance(vUv, vec2(0.5)), uCornerSize);
  vec4 cornerColor = vec4(corner + uCornerIntensity) + vec4(uCornerColor, 1.0);

  float noise = 1.0 - abs(cnoise(vUv * 10. + uTime * 0.35));
  // float noise = 1.0 - cnoise(vUv * 20.);
    // Part1, tint & corner
  // vec4 p1 = texture2D(tDiffuse, vUv) * cornerColor * TintColor * 0.5;
  vec4 p1 = texture2D(tDiffuse, vUv) * 0.5 * cornerColor;

    // Blur
  vec4 color = vec4(0.0);

  float total = 0.0;

  // vec2 toCenter = uBlurPos * abs(sin(uTime)) - vUv * uRes;
  vec2 toCenter = uBlurPos - vUv * uRes;

  float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);

  float percent;
  float weight;
  vec4 blur;

  for(float t = 0.0; t <= 40.0; t++) {
    percent = (t + offset) / 80.0;
    weight = 4.0 * (percent - percent * percent);
    blur = texture2D(tDiffuse, vUv + toCenter * percent * uBlurIntensity / uRes);
    // vec4 blur = vec4(1.);
    blur.rgb *= blur.a;
    color += blur * weight;
    total += weight;
  } 

    // Part2, adding some blur
  // vec4 p2 = ((color / total)) * 0.75;
  vec4 p2 = ((color / total)) * 0.75;

  vec2 texel = vec2(1. / uRes.x, 1. / uRes.y);

		// kernel definition (in glsl matrices are filled in column-major order)

  const mat3 Gx = mat3(-1, -2, -1, 0, 0, 0, 1, 2, 1); // x direction kernel
  const mat3 Gy = mat3(-1, 0, 1, -2, 0, 2, -1, 0, 1); // y direction kernel

		// fetch the 3x3 neighbourhood of a fragment

		// first column
  float tx0y0 = texture2D(tDiffuse, vUv + texel * vec2(-1, -1)).r;
  float tx0y1 = texture2D(tDiffuse, vUv + texel * vec2(-1, 0)).r;
  float tx0y2 = texture2D(tDiffuse, vUv + texel * vec2(-1, 1)).r;

		// second column
  float tx1y0 = texture2D(tDiffuse, vUv + texel * vec2(0, -1)).r;
  float tx1y1 = texture2D(tDiffuse, vUv + texel * vec2(0, 0)).r;
  float tx1y2 = texture2D(tDiffuse, vUv + texel * vec2(0, 1)).r;

		// third column
  float tx2y0 = texture2D(tDiffuse, vUv + texel * vec2(1, -1)).r;
  float tx2y1 = texture2D(tDiffuse, vUv + texel * vec2(1, 0)).r;
  float tx2y2 = texture2D(tDiffuse, vUv + texel * vec2(1, 1)).r;

		// gradient value in x direction
  float valueGx = Gx[0][0] * tx0y0 + Gx[1][0] * tx1y0 + Gx[2][0] * tx2y0 +
    Gx[0][1] * tx0y1 + Gx[1][1] * tx1y1 + Gx[2][1] * tx2y1 +
    Gx[0][2] * tx0y2 + Gx[1][2] * tx1y2 + Gx[2][2] * tx2y2;

		// gradient value in y direction
  float valueGy = Gy[0][0] * tx0y0 + Gy[1][0] * tx1y0 + Gy[2][0] * tx2y0 +
    Gy[0][1] * tx0y1 + Gy[1][1] * tx1y1 + Gy[2][1] * tx2y1 +
    Gy[0][2] * tx0y2 + Gy[1][2] * tx1y2 + Gy[2][2] * tx2y2;

		// magnitute of the total gradient
  float G = pow(abs(noise + 1.), sqrt((valueGx * valueGx * noise) + (valueGy * valueGy * noise)));

    // gl_FragColor = render;
  gl_FragColor = texture2D(tDiffuse, vUv);
  gl_FragColor = p2;
  gl_FragColor = (p1 + p2) * vec4(G);
}
