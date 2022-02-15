#include <project_vertex>

// Speed
float time = uTime;

vUv = uv;

// New mvPosition
vec4 newMvPosition = vec4(position, 1.0);
newMvPosition = instanceMatrix * newMvPosition;

// Displacement on each vertex
float noise = smoothNoise(newMvPosition.xz + vec2(0., time));

float rayModifier = mix(5., 1., clamp(abs(distance(uRayPos, newMvPosition.xz)), 0., 1.));
float rayDirection = clamp(distance(uRayPos, newMvPosition.xz), - 1., 1.);

float dispPower = 1. - cos(uv.y * PI * uDisplaceIntensity);

float displacement = noise * dispPower * rayModifier * rayDirection;
newMvPosition.x -= displacement;

gl_Position = projectionMatrix * modelViewMatrix * newMvPosition;