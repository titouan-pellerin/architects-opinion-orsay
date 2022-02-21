#include <project_vertex>

vUv = uv;
vRandomScale = aScale;
vPos = position;

vec3 pos = position;

float time = uTime * .01;
float offset = aOffset * aScale * 2.;
float noise = cnoise(uv);

vec3 particlePos = pos + aPositions;

float loop = mod(time + aOffset * maxDuration, maxDuration) / maxDuration;
vLoop = loop;

particlePos.x = loop * ((particlePos.x + sin(time + aOffset * aScale)) + (offset)) - 15.;

particlePos.xy += particlePos.xy * 5.;
particlePos.y -= particlePos.x * 0.5;

particlePos.y += sin(position.y + noise + uTime + offset) * 0.2;
particlePos.x += sin(position.y + noise + uTime + offset) * 0.2;
particlePos.z += sin(position.x + noise + uTime + offset) * 0.2;

vec4 mv = modelViewMatrix * vec4(particlePos, 1.);

gl_Position = projectionMatrix * mv;
