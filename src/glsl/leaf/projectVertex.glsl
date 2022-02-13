#include <project_vertex>

vUv = uv;
vRandomScale = aScale;
vPos = position;

vec3 pos = position;

float offset = aOffset * aScale * 3.;

float time = - uTime * 0.04 * aSpeedFactor;

float loop = mod(time - aOffset * maxDuration, maxDuration) / maxDuration;
vLoop = loop;
vec3 particlePos = pos + aPositions;

particlePos.y = loop * ((particlePos.y + sin(time - aOffset * aScale)) + (offset)) - 50.;

vec3 rotatedPositions = position;

float rZ = rotatedPositions.x * cos((abs(uTime * 0.5)) - (aOffset * 5.)) + rotatedPositions.y * sin((abs(uTime * 0.5)) - (aOffset * 5.));

particlePos.x -= ((sin(position.y - (uTime * aSpeedFactor)) * 0.2));
particlePos.z -= (sin(position.x - (uTime * aSpeedFactor)) * 0.2);
particlePos.y -= rZ;

vec4 mv = modelViewMatrix * vec4(particlePos, 1.);

gl_Position = projectionMatrix * mv;
