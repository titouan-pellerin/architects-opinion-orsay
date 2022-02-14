#include <project_vertex>

// Speed
float time = uTime;

vUv = uv;
vInstanceColor = instanceColor;

// New mvPosition
vec4 newMvPosition = vec4(position, 1.0);
newMvPosition = instanceMatrix * newMvPosition;

float noise = smoothNoise(newMvPosition.xz + vec2(0., time));

newMvPosition.x += sin((newMvPosition.z * PI * 5.) + (uTime * 3.)) * 0.02;

gl_Position = projectionMatrix * modelViewMatrix * newMvPosition;