#include <project_vertex>

// Speed
float time = uTime * uSpeed;

vUv = uv;

// New mvPosition
vec4 newMvPosition = vec4(position, 1.0);
newMvPosition = instanceMatrix * newMvPosition;

// Displacement on each vertex
float noise = smoothNoise(newMvPosition.xz + vec2(0., time));

float dispPower = 1. - cos(uv.y * PI * uDisplaceIntensity);

float displacement = noise * dispPower;
newMvPosition.x -= displacement;

gl_Position = projectionMatrix * modelViewMatrix * newMvPosition;