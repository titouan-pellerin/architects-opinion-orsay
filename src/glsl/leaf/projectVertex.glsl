#include <project_vertex>

vUv = uv;
vRandomScale = aScale;
vPos = position;
vColor = aColor;

vec3 pos = position;

float offset = aOffset * aScale * 3.;

float time = - uTime * 0.4;
float noise = cnoise(pos.yz) * 40.;

float loop = mod(time - (aOffset) * maxDuration, maxDuration) / maxDuration;
vLoop = loop;
vec3 particlePos = pos + aPositions;

// particlePos.y = loop * ((particlePos.y + sin(time - aOffset * aScale)) + (offset)) - 50.;

particlePos.y += (loop * (15.0));
// particlePos.y += loop * (particlePos.y + (0.) + (offset * .01));

vec3 rotatedPositions = position;

float rY = rotatedPositions.y * cos((uTime * 2.0 + noise) - (aOffset)) + rotatedPositions.x * sin((uTime * 2.0 + noise) - (aOffset));
float rZ = rotatedPositions.x * cos((uTime * 2.0 + noise) - (aOffset)) + rotatedPositions.y * sin((uTime * 2.0 + noise) - (aOffset));

particlePos.x -= ((cos(position.y - (uTime * aSpeedFactor * 0.05)) * 0.3));
particlePos.z -= (sin(position.x - (uTime * aSpeedFactor * 0.05)) * 0.3) + rY;
particlePos.y += rZ;

vec4 mv = modelViewMatrix * vec4(particlePos, 1.);

gl_Position = projectionMatrix * mv;
