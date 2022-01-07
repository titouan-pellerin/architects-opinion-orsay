#include <output_fragment>
// Stroke
float strokeNoise = 1.0 - (smoothstep(0.2, 0.8, sin((vNoise.x * vNoise.y) * 500.)));
float stroke = step(0.75, abs(mod((distance(vUv, vec2(0.5)) - 0.25) * 10., 1.0)));
float stroke2 = step(0.5, abs(mod((distance(vUv, vec2(0.5)) - 0.25) * 20., 1.0)));

// Smooth
float sIn = smoothstep(0.0, 0.5, vUv.y);
float sOut = 1.0 - smoothstep(0.5, 1.0, vUv.y);

float strength = mod((vUv.x * vUv.y) * 2.5, 1.0);

float mixNoise = mix(stroke, strength, strokeNoise);
float mixStroke = mix(stroke, stroke2, mixNoise);

// Render
vec3 render = mix(uColor, uColor2, mixStroke * (sIn * sOut));

gl_FragColor = vec4(outgoingLight * vec3(render), diffuseColor.a);