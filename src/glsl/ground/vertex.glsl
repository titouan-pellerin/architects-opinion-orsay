#include ../utils/noise3d;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uTime;


void main() {
    vUv = uv;
    vNormal = normal;
    vPosition = position;
    vec3 newNormal = normal;
    vec3 newPosition = position;
    float bigNoise = cnoise(vec4(vec3(newPosition * 50.), uTime * 0.1)) * 0.005;

    newPosition.zy += bigNoise;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);
}
