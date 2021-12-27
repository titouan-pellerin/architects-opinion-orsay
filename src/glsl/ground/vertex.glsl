#include ../utils/noise3d;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vCurveCoords;

uniform float uTime;
uniform sampler2D uTexture;

void main() {

    vUv = uv;
    vNormal = normal;
    vPosition = position;
    vCurveCoords = texture2D(uTexture, vUv).xyz;
    // vCurveCoords = curveCoords;

    float bigNoise = cnoise(vec4(vec3(vPosition * 50.), 0.5)) * 0.0045;

    // if(curveCoords != vec3(1.))
    // vPosition.zy += bigNoise;
    vPosition.z += bigNoise;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vPosition, 1.0);
}
