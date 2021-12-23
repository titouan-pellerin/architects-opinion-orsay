#include <output_fragment>
float strength = length(vPosition);
vec3 render = mix(vec3(strength), uColor, 0.5);

gl_FragColor = vec4( vec3(strength), diffuseColor.a );
gl_FragColor = vec4(outgoingLight * render, diffuseColor.a );
