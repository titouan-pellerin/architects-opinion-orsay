#include <output_fragment>
// Stroke
float stroke = 1.0 - (smoothstep(0.2, 0.8, sin((vNoise.x * vNoise.y) * 500.)));

// Smooth
float sIn = smoothstep(0.0, 0.5, vUv.y);
float sOut = 1.0 - smoothstep(0.5, 1.0, vUv.y);

float strength = mod((vUv.x * vUv.y) * 10.0, 1.0);

float strength2 = step(0.4, mod(vNoise.x * 20.0, 1.0));
strength2 *= step(0.8, mod(vNoise.x * 20.0, 1.0));

// Render
vec3 render = mix(uColor, uColor2, stroke * (sIn * sOut) * (strength + strength2));
gl_FragColor = vec4(outgoingLight, diffuseColor.a) * vec4(strength);
gl_FragColor = vec4(outgoingLight * vec3(render), diffuseColor.a);
