#include <project_vertex>

// Speed
float time = uTime * uSpeed;

vUv = uv;

// New mvPosition
vec4 newMvPosition = instanceMatrix * vec4(position, 1.0);

vec4 worldPosition = modelMatrix * instanceMatrix * vec4(position, 1.);

// Displacement on each vertex
float noise = smoothNoise(newMvPosition.xz + vec2(0., time));

float rayModifierMax = 1.6;
float rayModifierMin = 1.;
float rayModifier = mix(rayModifierMax, rayModifierMin, clamp((distance(uRayPos.xyz, worldPosition.xyz)), .0, 1.5) * .67);
vRayModifier = map(rayModifier, rayModifierMin, rayModifierMax, 0., 1.);

vec3 rayDirection = normalize(uRayPos.xyz - worldPosition.xyz);
rayDirection = mix(vec3(1.), rayDirection, vRayModifier);

float dispPower = 1. - cos(uv.y * PI * uDisplaceIntensity);

float displacement = noise * dispPower * rayModifier;
newMvPosition.x -= displacement * - rayDirection.x;
newMvPosition.y -= displacement * - rayDirection.y;
newMvPosition.z -= displacement * - rayDirection.z;

gl_Position = projectionMatrix * modelViewMatrix * newMvPosition;
