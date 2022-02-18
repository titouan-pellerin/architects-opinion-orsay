#include <project_vertex>

// Speed
float time = uTime;

vUv = uv;
vInstanceColor = instanceColor;

// New mvPosition
vec4 newMvPosition = instanceMatrix * vec4(position, 1.0);

vec4 worldPosition = modelMatrix * instanceMatrix * vec4(position, 1.);

float noise = smoothNoise(newMvPosition.xz + vec2(0., time));

float rayModifier = mix(4., 1., clamp((distance(uRayPos, worldPosition.xyz)), .0, 1.3) * .769);
vec3 rayDirection = normalize(uRayPos - worldPosition.xyz);

newMvPosition.x += sin((newMvPosition.z * PI * 5.) + (uTime * 3.)) * 0.0125 * rayModifier;

gl_Position = projectionMatrix * modelViewMatrix * newMvPosition;