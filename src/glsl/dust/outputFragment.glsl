#include <output_fragment>

vec2 uv = vUv;

float strength = 1.0 - step(0.15, length(vUv - 0.5));

float alpha = smoothstep(1., 0., vLoop) * smoothstep(.0, 1., vLoop) * float(vPos + vec3(uAlpha));
alpha *= vRandomScale * 15.;

vec4 particle = vec4(strength) * vec4(uColor, 1.0);

gl_FragColor = vec4(particle);
gl_FragColor = vec4(outgoingLight, diffuseColor.a) * vec4(particle);

particle.a = abs(sin(uTime * alpha));