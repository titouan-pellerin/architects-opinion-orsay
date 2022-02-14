#include <output_fragment>
// Render
vec4 render = texture2D(uTexture, vUv) * 5. * (vec4(vInstanceColor, 1.0));

gl_FragColor = render;
gl_FragColor = vec4(outgoingLight, diffuseColor.a) * render;