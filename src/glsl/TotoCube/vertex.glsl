varying vec2 vUv;

#include ../utils/noise2d;

void main() {

    float noise = cnoise(vec2(1., 1.));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}
