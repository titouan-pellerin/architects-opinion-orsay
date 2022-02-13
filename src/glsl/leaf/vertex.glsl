#define PI 3.1415926535897932384626433832795

uniform float uTime;

attribute vec3 aPositions;
attribute float aOffset;
attribute float aScale;
attribute float aSpeedFactor;

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

    float time = -uTime * .03 * aSpeedFactor;

    float loop = mod(time - aOffset * maxDuration, maxDuration) / maxDuration;
    vLoop = loop;
    vec3 particlePos = pos + aPositions;

    particlePos.y = loop * ((particlePos.y + sin(time + aOffset * aScale)) + (offset)) - 50.;

    vec3 rotatedPositions = position;

    float rZ = rotatedPositions.x * cos((abs(uTime * -aScale * 0.5)) - (aOffset * 5.)) + rotatedPositions.y * sin((abs(uTime * -aScale * 0.5)) - (aOffset * 5.));

    particlePos.x -= ((sin(position.y - (uTime * aSpeedFactor)) * 0.65));
    particlePos.z -= (sin(position.x - (uTime * aSpeedFactor)) * 0.65);
    particlePos.y += rZ;

    vec4 mv = modelViewMatrix * vec4(particlePos, 1.);

    gl_Position = projectionMatrix * mv;
}