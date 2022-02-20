#include <output_fragment>

vec4 butterfly = texture2D(uTexture, vUv);

gl_FragColor = vec4(1.0);
gl_FragColor = butterfly;
gl_FragColor = vec4(outgoingLight, diffuseColor.a) * butterfly;

if(gl_FragColor.a < 1.0) {
discard;
}