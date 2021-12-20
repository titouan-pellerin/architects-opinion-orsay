// uniform sampler2D tDiffuse;
uniform sampler2D tDiffuse;
varying vec2 vUv;
uniform float uTime;
uniform vec3 uNoiseColor;
uniform float uNoiseIntensity;
uniform vec3 uCornerColor;
uniform float uCornerIntensity;
uniform float uCornerSize;

float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }


void main()
{
    // Noise
    float noise = hash(vUv + sin(uTime));
    vec4 noiseColor = vec4(uNoiseColor + (noise * uNoiseIntensity), 1.0);

    // Corner
    float corner = pow(1.0 - distance(vUv, vec2(0.5)), uCornerSize);
    vec4 cornerColor = vec4(corner + uCornerIntensity) + vec4(uCornerColor, 1.0);

    // Render
    vec4 render = (texture2D(tDiffuse, vUv)) * noiseColor * cornerColor;

    gl_FragColor = render;
}