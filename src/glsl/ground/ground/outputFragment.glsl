#include <output_fragment>
vec3 curveCoords = texture2D(uTexture, vUv).xyz;

float strength = length(vPosition);
vec3 render = mix(vec3(strength), uColor, 0.5);

render = mix(uPathColor, render, 1. - curveCoords.r);

gl_FragColor = vec4(outgoingLight * render, diffuseColor.a);
