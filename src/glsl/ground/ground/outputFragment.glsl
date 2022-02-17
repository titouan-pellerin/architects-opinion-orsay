#include <output_fragment>

vec3 riverColor = vec3(0.82, 0.87, 0.89);
// vec3 riverColor = vec3(1.) * 5.;

vec4 curveCoords = texture2D(uTexture, vUv);

vec3 render = mix(uColor, uPathColor, curveCoords.r);
render = mix(render, riverColor, curveCoords.g);

vec3 colorElevation = vec3(vSmallNoise * 100.) * uColor;

gl_FragColor = vec4(outgoingLight * render + colorElevation, diffuseColor.a);