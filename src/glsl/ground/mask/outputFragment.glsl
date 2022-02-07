float smallNoise = cnoise(vec2(vUv * uSmallNoise));
float bigNoise = cnoise(vec2(vUv * uBigNoise));

// Stroke
float stroke = cos((vUv.x + vUv.y) * uStroke);
stroke += (bigNoise * 2.0 - 1.0) + (smallNoise * 2.0 - 1.0);

// Render
vec4 render = vec4(uColor, 1.0) * vec4(stroke);

gl_FragColor = vec4(outgoingLight * render.rgb, diffuseColor.a * render.a);
