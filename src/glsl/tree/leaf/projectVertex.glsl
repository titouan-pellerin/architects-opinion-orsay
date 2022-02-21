#include <project_vertex>

// Speed
float time = uTime * uSpeed;

vUv = uv;

// New mvPosition
vec4 newMvPosition = instanceMatrix * vec4(position, 1.0);

vec4 worldPosition = modelMatrix * instanceMatrix * vec4(position, 1.);

// Displacement on each vertex
float noise = smoothNoise(newMvPosition.xz + vec2(0., time));

float rayModifierMax = 2.;
float rayModifierMin = 1.;
float rayModifier = mix(rayModifierMax, rayModifierMin, clamp((distance(uRayPos.xyz, worldPosition.xyz)), .0, 1.) * 1.);
vRayModifier = map(rayModifier, rayModifierMin, rayModifierMax, 0., 1.);

vec3 rayDirection = normalize(uRayPos.xyz - worldPosition.xyz);
// if(rayModifier == 1.) rayDirection = vec3(1.);
// vec3 rayDirection = vec3(1.);

// To make sure that rayDirection wont alterate instances which are not in range
// rayDirection = mix(rayDirection, vec3(1.), rayModifier);

float dispPower = 1. - cos(uv.y * PI * uDisplaceIntensity);

float displacement = noise * dispPower * rayModifier;
newMvPosition.x -= displacement * - rayDirection.x;
newMvPosition.y -= displacement * - rayDirection.y;
newMvPosition.z -= displacement * - rayDirection.z;

gl_Position = projectionMatrix * modelViewMatrix * newMvPosition;
