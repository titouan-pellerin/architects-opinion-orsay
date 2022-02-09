#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uAlpha;
uniform vec3 uColor;
uniform vec3 uResolution;

varying float vLoop;
varying float vRandomScale;
varying vec2 vUv;
varying vec3 vPos;
varying float vResetPos;

void main() {
    vec2 uv = vUv;

    vec2 res = gl_FragCoord.xy / uResolution.xy;
    res /= uResolution.z;

    float strength = .5 * (vRandomScale * .5) / distance(uv, vec2(.5));

    vec3 particle = vec3(uColor);
    particle *= strength;
    particle *= smoothstep(1., 10., particle);

    // float alpha = smoothstep(1., .75, vLoop) * smoothstep(.0, .25, vLoop) * float(vPos + vec3(uAlpha));
    // alpha *= vRandomScale * 5.;

    gl_FragColor = vec4(particle, 1.0);
}