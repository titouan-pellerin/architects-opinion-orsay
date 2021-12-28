uniform sampler2D tDiffuse;
varying vec2 vUv;
uniform float uTime;
uniform float uCornerIntensity;
uniform float uCornerSize;
uniform float uNoiseIntensity;
uniform vec2 uRes;
uniform vec3 uNoiseColor;
uniform vec3 uCornerColor;

uniform vec2 uBlurPos;
uniform float uBlurIntensity;
float random(vec3 scale, float seed) {
    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
}
float hash(vec2 p) {
    return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x))));
}

void main() {
    // Noise
    float noise = hash(vUv + sin(uTime) * 20.);
    vec4 noiseColor = vec4(uNoiseColor + (noise * uNoiseIntensity), 1.0);
    // vec4 noiseColor = vec4(uNoiseColor + (noise * uNoiseIntensity), 1.0);

    // Corner
    float corner = pow(1.0 - distance(vUv, vec2(0.5)), uCornerSize);
    vec4 cornerColor = vec4(corner + uCornerIntensity) + vec4(uCornerColor, 1.0);

    // Part1, noise & corner
    // vec4 p1 = texture2D(tDiffuse, vUv) * cornerColor;
    vec4 p1 = texture2D(tDiffuse, vUv) * cornerColor * noiseColor;

    // Blur
    vec4 color = vec4(0.0);

    float total = 0.0;

    vec2 toCenter = uBlurPos - vUv * uRes;

    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);

    for(float t = 0.0; t <= 40.0; t++) {
        float percent = (t + offset) / 80.0;
        float weight = 4.0 * (percent - percent * percent);
        vec4 blur = texture2D(tDiffuse, vUv + toCenter * percent * uBlurIntensity / uRes);
        blur.rgb *= blur.a;
        color += blur * weight;
        total += weight;
    }

    // Part2, adding some blur
    vec4 p2 = (color / total) * 0.4;

	// float grassPattern = .8 - (smoothstep(0.8,1., abs(vUv.x - 0.5) + vUv.y * 1.5));

    // gl_FragColor = render;
    gl_FragColor = p1 + p2;
    // gl_FragColor.rgb /= gl_FragColor.a;
    // gl_FragColor = p1;
    // gl_FragColor = vec4(grassPattern);
}