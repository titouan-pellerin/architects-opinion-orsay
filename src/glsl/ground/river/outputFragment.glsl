vec3 render = uColor + vec3(vNoise) * 2000.;
vec3 render2 = uColor2 + vec3(vNoise2) * 2000.;
vec3 render3 = uColor + vec3(vNoise3) * 2000.;
vec3 render4 = uColor2 + vec3(vNoise4) * 2000.;

float noise = smoothstep(0.0, .75, cnoise(vUv * 130. + uTime * 0.1));
float noise2 = smoothstep(0.0, .75, cnoise(vUv * 20. + uTime * .1));

vec3 renderMix = (render * render2) + (render3 * render4);
renderMix = mix(renderMix, vec3(noise * noise2) * uColor2 * 80., vRayModifier);

gl_FragColor = vec4(outgoingLight * renderMix, diffuseColor.a);
