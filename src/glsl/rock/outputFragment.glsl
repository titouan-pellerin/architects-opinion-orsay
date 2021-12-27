#include <output_fragment>
// Stroke
float stroke = cos((vUv.x + vUv.y) * 3.);

// Render
vec3 render = mix(uColor, uColor2, stroke);

gl_FragColor = vec4(outgoingLight * render, diffuseColor.a);