#include <output_fragment>

// Smooth
float s1 = smoothstep(0.0, 0.5, vUv.y);
float s2 = 1.0 - smoothstep(0.5, 1.0, vUv.y);
float s3 = smoothstep(0.0, 0.5, vUv.x);
float s4 = 1.0 - smoothstep(0.5, 1.0, vUv.x);

float ligthLeft = vPos.x - vPos.z;
float ligthRight = -vPos.x - vPos.z;

float borderWidth = .42;

float left = step(borderWidth, vPos.x);
float right = 1.0 - step(-borderWidth, vPos.x);
float top = 1.0 - step(-borderWidth, vPos.y);
float bottom = step(borderWidth, vPos.y);
float back = 1.0 - step(-.01, vPos.z);

float glassLine = mod((vUv.x + vUv.y) * 5.0, 1.0);
float glassLine2 = mod((vUv.x - vUv.y) * 5.0, 1.0);

float glassLine3 = mod((vUv.x + vUv.y) * 10.0, 1.0);
float glassLine4 = mod((vUv.x - vUv.y) * 10.0, 1.0);

float glass = 1.0 - length(vPos);
float glassRender = (glass + glassLine + glassLine2 + glassLine3 + glassLine4);

float shape = (left + right + top + bottom + back) + (glassRender * 0.1);

// Render
vec3 render = mix(uColor, uColor2, ((s1 * s2) + (s3 * s4)));

gl_FragColor = vec4(outgoingLight * (vec3(render) / vec3(ligthLeft * ligthRight) * 0.05), shape * diffuseColor.a);