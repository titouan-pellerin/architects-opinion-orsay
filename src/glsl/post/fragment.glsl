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

uniform sampler2D uNoiseTexture;

void main() {
    // Tint
  vec4 TintColor = vec4(uTintColor, 1.0);

    // Corner
  float corner = pow(1.0 - distance(vUv, vec2(0.5)), uCornerSize);
  vec4 cornerColor = vec4(corner + uCornerIntensity) + vec4(uCornerColor, 1.0);

    // Part1, tint & corner
  // vec4 p1 = texture2D(tDiffuse, vUv) * cornerColor * TintColor * 0.5;
  vec4 p1 = texture2D(tDiffuse, vUv) * cornerColor * .5;

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
  vec4 p2 = ((color / total)) * 0.5;

    // Textures
  float noiseTexture = texture2D(uNoiseTexture, 0.5 * (vUv + 1.0)).r;

    // Transition
  float temp = 0.8;
    // uProgress
  temp += ((10.0 * noiseTexture - 5.0) * 0.05) - .35;

  float distanceFromCenter = length(vUv - 0.5);
  temp = smoothstep(temp - 0.05, temp, distanceFromCenter);

  vec4 final = mix(p2, p1, temp);

  vec2 texel = vec2(1. / uRes.x, 1. / uRes.y) * 1.5;

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
  float G = pow(3.0, sqrt((valueGx * valueGx) + (valueGy * valueGy)));
  vec3 border = vec3(G);

    // gl_FragColor = render;
  gl_FragColor = final;
  gl_FragColor = texture2D(tDiffuse, vUv);
  gl_FragColor = p2;
  gl_FragColor = (p1 + p2) * vec4(vec3(border), 1.0);
}
