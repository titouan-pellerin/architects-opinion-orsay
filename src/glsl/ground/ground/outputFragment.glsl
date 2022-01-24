#include <output_fragment>

vec3 riverColor = vec3(0.99, 0.94, 0.62);

vec3 curveCoords = texture2D(uTexture, vUv).xyz;

vec3 render = mix(uPathColor, uColor, 1. - curveCoords.r);
render = mix(riverColor, render, 1. - curveCoords.g);

gl_FragColor = vec4(outgoingLight * render, diffuseColor.a);
