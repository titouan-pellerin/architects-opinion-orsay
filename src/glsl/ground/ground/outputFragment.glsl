#include <output_fragment>

vec3 riverColor = vec3(0.99, 0.94, 0.62);

// vec3 curveCoords = texture2D(uTexture, vUv).xyz;
vec4 curveCoords = texture2D(uTexture, vUv);

// if(curveCoords.a < .3) discard;

vec3 render = mix(uPathColor, uColor, 1. - curveCoords.r);
render = mix(riverColor, render, 1. - curveCoords.g);

vec3 colorElevation = vec3(vSmallNoise * 100.) * uColor;

gl_FragColor = vec4(outgoingLight * render + colorElevation, diffuseColor.a);