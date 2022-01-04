#include <project_vertex>

vUv = uv;

vec4 tmpPos = texture2D(texturePosition, reference);
vec3 pos = tmpPos.xyz;
vec3 velocity = normalize(texture2D(textureVelocity, reference).xyz);

vec3 newPosition = position;

newPosition = mat3(modelMatrix) * newPosition;

velocity.z *= - 1.;
float xz = length(velocity.xz);
float xyz = 1.;
float x = sqrt(1. - velocity.y * velocity.y);

// float cosry = velocity.x / xz + sin(time * 2.) * .2;
float cosry = velocity.x / xz + cnoise(vec2(time * .001) * 10.);
float sinry = (velocity.z / xz);

// float cosrz = x / xyz + sin(time * 5.) * .2;
float cosrz = x / xyz + cnoise(vec2(time * .005) * 20.);
float sinrz = (velocity.y / xyz);

mat3 maty = mat3(cosry, 0, - sinry, 0, 1, 0, sinry, 0, cosry);

mat3 matz = mat3(cosrz, sinrz, 0, - sinrz, cosrz, 0, 0, 0, 1);

newPosition = maty * matz * newPosition;
// newPosition = maty * newPosition;
// newPosition = newPosition;
newPosition += pos;

gl_Position = projectionMatrix * viewMatrix * vec4(newPosition, 1.0);
