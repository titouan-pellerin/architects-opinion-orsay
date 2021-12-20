#include ../utils/noise3d;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uTime;

void main() {
    vUv = uv;
    vNormal = normal;
    vPosition = position;
    float bigNoise = cnoise(vec4(vec3(vPosition * 50.), 0.5)) * 0.0045;

    vPosition.zy += bigNoise;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vPosition, 1.0);
}
