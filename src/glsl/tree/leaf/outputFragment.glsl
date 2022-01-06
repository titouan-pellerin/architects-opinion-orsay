#include <output_fragment>
// Stroke
float stroke = cos(vUv.x - vUv.y);

// Render
vec3 render = mix(uColor, uColor2, stroke);
gl_FragColor = vec4(outgoingLight * vec3(render), diffuseColor.a);