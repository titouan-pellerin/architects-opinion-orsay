#include <output_fragment>
// Render
vec4 render = texture2D(uTexture, vUv) * 5.;

gl_FragColor = vec4(outgoingLight, diffuseColor.a) * render;