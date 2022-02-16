#include <project_vertex>

vUv = uv;
vRandomScale = aScale;
vPos = position;

float time = uTime;
float mSpeed = uTime * .1;

vec3 pos = position;
float noise = cnoise(pos.yz + time) * 2.;
// pos.x += noise * 0.1;
// pos.y += noise * 0.1;
// pos.z += noise * 0.1;

float offset = aOffset * aScale * 3.;

float mouvement = sin(mSpeed * aScale) * .65;
float mouvement2 = cos(mSpeed * aScale) * .65;

float flapTime = radians(sin(uTime * aSpeedFactor * 2. - length(uv - 0.5) * 2.) * 55.0 + 30.0);
pos = vec3(cos(flapTime) * pos.x - mouvement, pos.y + mouvement2, sin(flapTime) * abs(pos.x) + mouvement);

float loop = mod((time * 0.15) - (aOffset) * maxDuration, maxDuration) / maxDuration;
vLoop = loop;
vec3 particlePos = pos + aPositions;

particlePos.y += (loop * (50.));

vec3 rotatedPositions = pos;

float rY = rotatedPositions.y * cos((noise) - (aOffset)) + rotatedPositions.x * sin((noise) - (aOffset));
float rZ = rotatedPositions.x * cos((uTime * 2.0 + noise) - (aOffset)) + rotatedPositions.y * sin((uTime * 2.0 + noise) - (aOffset));

// particlePos.x -= ((cos(position.y - (uTime * aSpeedFactor * 0.05 - noise)) * 0.3));
// particlePos.x -= ((cos(position.y - (uTime * aSpeedFactor * 0.05 - noise)) * 0.3));
// particlePos.z -= (sin(position.x - (uTime * aSpeedFactor * 0.05 - noise)) * 0.3) + rY;
// particlePos.y += rZ + noise;

gl_Position = projectionMatrix * modelViewMatrix * vec4(particlePos, 1.);
