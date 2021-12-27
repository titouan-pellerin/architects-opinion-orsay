#include <output_fragment>
// Stroke
float stroke = 1.0 - (smoothstep(0.2, 0.8, sin((vNoise.x * vNoise.y) * 500.)));

// Smooth
float sIn = smoothstep(0.0, 0.5, vUv.y);
float sOut = 1.0 - smoothstep(0.5, 1.0, vUv.y);

// Render
vec3 render = mix(uColor, uColor2, stroke * (sIn * sOut));

gl_FragColor = vec4(outgoingLight * vec3(stroke), diffuseColor.a);
gl_FragColor = vec4(outgoingLight * render, diffuseColor.a);
