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

vec4 blur(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3333333333333333) * direction;
  color += texture2D(image, uv) * 0.29411764705882354;
  color += texture2D(image, uv + (off1 / resolution)) * 0.35294117647058826;
  color += texture2D(image, uv - (off1 / resolution)) * 0.35294117647058826;
  return color;
}

void main() {
  // Small blur
  vec4 smallBlur = blur(tDiffuse, vUv, uRes, vec2(0.5) * 2.5);

  // Corner
  float corner = pow(1.0 - distance(vUv, vec2(0.5)), uCornerSize);
  vec4 cornerColor = vec4(corner + uCornerIntensity) + vec4(uCornerColor, 1.0);

  // Part1
  vec4 p1 = ((texture2D(tDiffuse, vUv) * cornerColor));

  // Blur
  vec4 color = vec4(0.0);

  float total = 0.0;

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
  vec4 p2 = ((color / total));

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
  float G = pow(3., sqrt((valueGx + valueGy) * (valueGy + valueGx)));
  vec3 border = vec3(G);

  // gl_FragColor = render;
  gl_FragColor = texture2D(tDiffuse, vUv);
  gl_FragColor = p2;
  gl_FragColor = texture2D(tDiffuse, vUv) * vec4(vec3(border), 1.0);
  gl_FragColor = (((p2) * (vec4(vec3(border), 1.0))) + (smallBlur));
}