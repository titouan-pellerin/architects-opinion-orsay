#include <project_vertex>

vUv = uv;

float time = uTime;
float mSpeed = uTime * .1;

vec3 pos = position;
float noise = cnoise(pos.yz + time) * 2.;

float offset = aOffset * aScale * 3.;

float mouvement = sin(mSpeed * aScale) * .65;
float mouvement2 = cos(mSpeed * aScale) * .65;

float flapTime = radians(sin(uTime * aSpeedFactor * 2. - length(uv - 0.5) * 2.) * 55.0 + 30.0);
pos = vec3(cos(flapTime) * pos.x - mouvement, pos.y + mouvement2, sin(flapTime) * abs(pos.x) + mouvement);

float loop = mod((time * 0.15) - (aOffset) * maxDuration, maxDuration) / maxDuration;
vec3 particlePos = pos + aPositions;

particlePos.y += (loop * (50.));

gl_Position = projectionMatrix * modelViewMatrix * vec4(particlePos, 1.);
