#include <project_vertex>

// Speed
float time = uTime;

vUv = uv;

// New mvPosition
vec4 newMvPosition = instanceMatrix * vec4(position, 1.0);

vec4 worldPosition = instanceMatrix * modelMatrix * vec4(position, 1.);

// Displacement on each vertex
float noise = smoothNoise(newMvPosition.xz + vec2(0., time));

float rayModifier = mix(4., 1., clamp((distance(uRayPos, worldPosition.xz)), .0, 1.3) * .769);

vec2 rayDirection = normalize(uRayPos - worldPosition.xz);

float dispPower = 1. - cos(uv.y * PI * uDisplaceIntensity);

float displacement = noise * dispPower * rayModifier;
newMvPosition.x -= displacement * rayDirection.x;
newMvPosition.z -= displacement * rayDirection.y;
newMvPosition.y -= displacement * .5;

gl_Position = projectionMatrix * modelViewMatrix * newMvPosition;