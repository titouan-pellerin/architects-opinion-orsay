#include ../utils/noise2d;

#define PI 3.1415926535897932384626433832795

uniform float uTime;

attribute vec3 aPositions;
attribute float aOffset;
attribute float aScale;

varying float vLoop;
varying float vRandomScale;
varying vec2 vUv;
varying vec3 vPos;

const float maxDuration = 10.;

void main() {
    vUv = uv;
    vRandomScale = aScale;
    vPos = position;

    vec3 pos = position;

    float offset = aOffset * aScale * 3.;
    float noise = cnoise(uv);
    float time = -uTime * .04 + aOffset * 10.;

    vec3 particlePos = pos + aPositions;

    float loop = mod(time + aOffset * maxDuration, maxDuration) / maxDuration;
    vLoop = loop;

    particlePos.y = loop * ((particlePos.y + sin(time + aOffset * aScale)) + (offset)) - 50.;

    vec3 rotatedPositions = position;
    float rX = rotatedPositions.x * cos((abs(uTime * -aScale * 0.5) + noise) - (aOffset * 5.) + noise) - rotatedPositions.y * sin((abs(uTime * -aScale * 0.5) + noise) - (aOffset * 5.) + noise);
    float rY = rotatedPositions.y * cos((abs(uTime * -aScale * 0.5) + noise) - (aOffset * 5.) + noise) + rotatedPositions.x * sin((abs(uTime * -aScale * 0.5) + noise) - (aOffset * 5.) + noise);
    float rZ = rotatedPositions.x * cos((abs(uTime * -aScale * 0.5) + noise) - (aOffset * 5.) + noise) + rotatedPositions.y * sin((abs(uTime * -aScale * 0.5) + noise) - (aOffset * 5.) + noise);

    particlePos.x += ((sin(position.y + noise + (uTime * aScale * 0.3) + (offset * 10.)) * 0.5 + (rX)));
    particlePos.z -= (sin(position.x + noise + (uTime * aScale * 0.3) + (offset * 10.)) * 0.5 + (rY));
    particlePos.y += rZ;

    vec4 mv = modelViewMatrix * vec4(particlePos, 1.);

    gl_Position = projectionMatrix * mv;
}