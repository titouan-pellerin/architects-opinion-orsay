#include <output_fragment>
vec3 curveCoords = texture2D(uTexture, vUv).xyz;

float strength = length(vPosition);
vec3 render = mix(vec3(strength), uColor, 0.5);

// gl_FragColor = vec4(vec3(strength), diffuseColor.a);

if(curveCoords.r >= .7 && curveCoords.g >= .7 && curveCoords.b >= .7) render = mix(curveCoords, render, 1. - curveCoords.r);

gl_FragColor = vec4(outgoingLight * render, diffuseColor.a);
