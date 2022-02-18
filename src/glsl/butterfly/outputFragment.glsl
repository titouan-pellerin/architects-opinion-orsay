#include <output_fragment>

vec4 texture = texture2D(uTexture, vUv);

// gl_FragColor = vec4(1.0);
// gl_FragColor = texture;
gl_FragColor = vec4(outgoingLight, diffuseColor.a) * texture * vec4(vColor, 1.);

if(gl_FragColor.a < 1.0) {
discard;
}