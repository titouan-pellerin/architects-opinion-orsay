#include <project_vertex>

// Speed
float time = uTime;

vUv = uv;

// New mvPosition
vec4 newMvPosition = instanceMatrix * vec4(position, 1.0);

vec4 worldPosition = modelMatrix * instanceMatrix * vec4(position, 1.);

// Displacement on each vertex
float noise = smoothNoise(newMvPosition.xz + vec2(0., time));

vec3 rayPos = uRayPos;
rayPos.y += .5;
float rayModifier = mix(4., 1., clamp((distance(rayPos, worldPosition.xyz)), .0, 1.3) * .769);

vec3 rayDirection = normalize(rayPos - worldPosition.xyz);

float dispPower = 1. - cos(uv.y * PI * uDisplaceIntensity);

float displacement = noise * dispPower * rayModifier;
newMvPosition.x -= displacement * rayDirection.x;
newMvPosition.y += displacement * rayDirection.y;
newMvPosition.z -= displacement * rayDirection.z * uFlipped;

gl_Position = projectionMatrix * modelViewMatrix * newMvPosition;