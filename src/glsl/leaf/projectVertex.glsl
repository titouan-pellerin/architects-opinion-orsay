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

float rX = rotatedPositions.x * cos((uTime * 2.) - (aOffset * 5.)) - rotatedPositions.y * sin((uTime * 2.) - (aOffset * 5.));
float rY = rotatedPositions.y * cos((uTime * 2.) - (aOffset * 5.)) + rotatedPositions.x * sin((uTime * 2.) - (aOffset * 5.));
float rZ = rotatedPositions.x * cos((uTime * 2.) - (aOffset * 5.)) + rotatedPositions.y * sin((uTime * 2.) - (aOffset * 5.));

particlePos.x -= ((sin(position.y - (uTime * aSpeedFactor)) * 0.75));
particlePos.z -= (sin(position.x - (uTime * aSpeedFactor)) * 0.75) + rY;
particlePos.y -= rZ;

vec4 mv = modelViewMatrix * vec4(particlePos, 1.);

gl_Position = projectionMatrix * mv;
