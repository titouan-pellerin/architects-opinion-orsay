#include <output_fragment>

// Shape
float rightPattern = 1.0 - (step(1.0, length(vUv)));
float leftPattern = 1.0 - (step(1.0, length(1.0 - vUv)));
vec4 shape = vec4(rightPattern) * vec4(leftPattern) * vec4(mix(uColor, vec3(3.), vRayModifier), 1.);

// Noise
float noise = cnoise(vUv * 10.);
float fade = .85 - distance(vUv, vec2(0.5));
vec4 noiseRender = vec4(leftPattern) * vec4(rightPattern) * vec4(vec3(step(0.35, noise)), 1.0);

// Center line
vec2 vUvRotate = rotate(vUv, PI * 0.25, vec2(0.5));
float centerLine = 1.0 - (step(0.01, abs(vUvRotate.x - 0.5) * pow(5., vUv.y + noise)));
vec4 centerLineFinal = vec4(centerLine);

// Left lines
vec2 lineLeftRotate = (1.0 - rotate(vUv, -PI * .9, vec2(0.)));

float leftLine = mod((lineLeftRotate.y * 10.0 + (noise * .3)) * lineLeftRotate.x, 1.0);
leftLine = step(0.8, leftLine);

float leftMask = step(0.5, abs(vUvRotate.x - .99));

vec4 leftLineFinal = (vec4(leftLine) * vec4(leftMask) * vec4(leftPattern));

// Right lines
vec2 lineRightRotate = rotate(vUv, PI * .9, vec2(1.));

float rightLine = mod((lineRightRotate.y * 10. + (noise * .3)) * lineRightRotate.x, 1.0);
rightLine = step(0.8, rightLine);

float rightMask = 1.0 - (step(0.5, abs(vUvRotate.x - 1.01)));

vec4 rightLineFinal = (vec4(rightLine) * vec4(rightMask) * vec4(rightPattern));

// Render lines
vec4 lines = (centerLineFinal + rightLineFinal + leftLineFinal) * vec4(uColor2, 1.0);

// Global render
vec4 render = (shape + lines * (1.0 - noiseRender)) * vec4(vec3(fade), 1.0);
// render.rgb = mix(render.rgb, vec3(3.), vRayModifier);
gl_FragColor = vec4(outgoingLight * render.rgb, diffuseColor.a * render.a);
// gl_FragColor = vec4(render.rgb, render.a);

if(render.a < 1.0) {
discard;
}