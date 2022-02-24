vec3 render = uColor + vec3(vNoise) * 2000.;
vec3 render2 = uColor2 + vec3(vNoise2) * 2000.;
vec3 render3 = uColor + vec3(vNoise3) * 2000.;
vec3 render4 = uColor2 + vec3(vNoise4) * 2000.;

vec3 renderMix = (render * render2) + (render3 * render4);
renderMix = mix(renderMix, uColor2 * 3., vRayModifier);

// gl_FragColor = vec4(renderMix, renderMix.g);
gl_FragColor = vec4(outgoingLight * renderMix, diffuseColor.a);
