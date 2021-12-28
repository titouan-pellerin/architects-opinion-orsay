#include <begin_vertex>

vUv = uv;
vNormal = normal;
vPosition = transformed;
vCurveCoords = texture2D(uTexture, vUv).xyz;
// vCurveCoords = curveCoords;

float bigNoise = cnoise(vec4(vec3(transformed * 50.), 0.5)) * 0.0045;

// if(curveCoords != vec3(1.))
// vPosition.zy += bigNoise;
transformed.z += bigNoise;

// gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vPosition, 1.0);
