#include <output_fragment>

vec3 riverColor = vec3(0.82, 0.87, 0.89);

vec3 render = mix(uColor, uPathColor, vCurveCoords.r * vCurveCoords.a);
render = mix(render, riverColor, vCurveCoords.g * vCurveCoords.a);

vec3 colorElevation = vec3(vSmallNoise * 100.) * uColor;

gl_FragColor = vec4(outgoingLight * render + colorElevation, diffuseColor.a);