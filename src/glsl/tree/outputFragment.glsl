#include <output_fragment>
  // Noise
float smallNoise = cnoise(vec2(vUv * 0.05));
float bigNoise = cnoise(vec2(vUv * 0.2));
float mixNoise = step(1.0, cnoise(vec2(vUv * 0.5)));

  // Stroke
float stroke = sin(vUv.x + vUv.y);
stroke *= (bigNoise * 10.0 - 5.0) + (smallNoise * 10.0 - 5.0);

  // Render
vec4 render = mix(vec4(mixNoise), vec4(uColor, 1.0) * vec4(stroke), smallNoise);

// Render
gl_FragColor = vec4(stroke);
gl_FragColor = vec4(outgoingLight, diffuseColor.a) * render;