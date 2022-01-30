vec3 render = uColor + vec3(vNoise) * 500.;
vec3 render2 = uColor2 + vec3(vNoise2) * 500.;

vec3 renderMix = render * render2;

gl_FragColor = vec4(renderMix, renderMix.g);
gl_FragColor = vec4(outgoingLight * renderMix, diffuseColor.a);
