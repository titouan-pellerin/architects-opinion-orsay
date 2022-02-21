#include <output_fragment>
// Stroke
float stroke = cos((vUv.x + vUv.y) * 4.);

// Grass
float grassPattern = 1. - (step(0.99, abs(vUv.x - 0.5) + vUv.y * 1.2));

// Render
vec3 render = mix(uColor, uColor2, stroke);
render = mix(render, vec3(2.), vRayModifier);
vec4 grass = texture2D(uTexture, vUv);

// gl_FragColor = vec4(1.);
gl_FragColor = vec4(outgoingLight, diffuseColor.a) * grass;
gl_FragColor = vec4(outgoingLight * render, diffuseColor.a) * vec4(grassPattern);

// Discard opacity
if(gl_FragColor.a < 1.) {
discard;
}
