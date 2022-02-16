#include <project_vertex>

// Speed
float time = uTime * uSpeed;

vUv = uv;
vInstanceColor = instanceColor;

// New mvPosition
vec4 newMvPosition = instanceMatrix * vec4(position, 1.0);

vec4 worldPosition = instanceMatrix * modelMatrix * vec4(position, 1.);

// Displacement on each vertex
float noise = smoothNoise(newMvPosition.xz + vec2(0., time));

float rayModifier = mix(10., 1., clamp((distance(uRayPos.xyz, worldPosition.xyz)), .0, 6.) * .16);

vec3 rayDirection = normalize(uRayPos.xyz - worldPosition.xyz);

float dispPower = 1. - cos(uv.y * PI * uDisplaceIntensity);

float displacement = noise * dispPower * rayModifier;
newMvPosition.x -= displacement * rayDirection.x;
newMvPosition.y -= displacement * - rayDirection.y;
newMvPosition.z -= displacement * rayDirection.z;

gl_Position = projectionMatrix * modelViewMatrix * newMvPosition;
