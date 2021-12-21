#include <output_fragment>
// Stroke
float stroke = cos((vUv.x + vUv.y) * 4.5);

// Grass
float grassPattern = 1.0 - (step(0.99, abs(vUv.x - 0.5) + vUv.y));

// Render
vec3 render = mix(uColor, uColor2, stroke );

gl_FragColor = vec4(outgoingLight * render, diffuseColor.a ) * vec4(grassPattern);

// Discard opacity
if ( gl_FragColor.a < 0.99 ){ discard; }
