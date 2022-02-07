#include <output_fragment>

vec3 riverColor = vec3(0.99, 0.94, 0.62);

vec4 curveCoords = texture2D(uTexture, vUv);

vec3 render = mix(uPathColor, uColor, 1. - curveCoords.r);
render = mix(riverColor, render, 1. - curveCoords.g);

vec3 colorElevation = vec3(vSmallNoise * 125.) * uColor;

gl_FragColor = vec4(outgoingLight * render + colorElevation, diffuseColor.a);