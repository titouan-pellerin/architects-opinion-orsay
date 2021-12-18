#define PI 3.1415926538

#include ../utils/noise2d;

varying vec2 vUv;
uniform float uTime;
uniform float uSpeed;
uniform float uDisplaceIntensity;

float N(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float smoothNoise(vec2 ip) {
    vec2 lv = fract(ip);
    vec2 id = floor(ip);

    lv = lv * lv * (3. - 2. * lv);

    float bl = N(id);
    float br = N(id + vec2(1, 0));
    float b = mix(bl, br, lv.x);

    float tl = N(id + vec2(0, 1));
    float tr = N(id + vec2(1, 1));
    float t = mix(tl, tr, lv.x);

    return mix(b, t, lv.y);
}

void main() {
    // Speed
    float time = uTime * uSpeed;

    vUv = uv;

    vec4 mvPosition = vec4(position, 1.0);
    mvPosition = instanceMatrix * mvPosition;

    float noise = smoothNoise(mvPosition.xz + vec2(0., time));

    float dispPower = 1. - cos(uv.y * PI * uDisplaceIntensity);

    float displacement = noise * dispPower;
    mvPosition.x -= displacement;

    gl_Position = projectionMatrix * modelViewMatrix * mvPosition;

}
