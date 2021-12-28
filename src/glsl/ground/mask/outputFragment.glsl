vec3 curveCoords = texture2D(uTexture, vUv).xyz;

float time = uTime * uSpeed;

float smallNoise = cnoise(vec2(vUv * uSmallNoise + time));
float bigNoise = cnoise(vec2(vUv * uBigNoise + time * .5));
float mixNoise = smoothstep(0.1, 0.9, cnoise(vec2(vUv * 50. + time)));

  // Stroke
float stroke = cos((vUv.x + vUv.y) * uStroke);
stroke += (bigNoise * 2.0 - 1.0) + (smallNoise * 2.0 - 1.0);

  // Render
// vec4 render = mix(vec4(mixNoise), vec4(uColor, 1.0) * vec4(stroke), uColor.z);
vec4 render = vec4(uColor, 1.0) * vec4(stroke);

  // if(vUv.x >= .5 && vUv.x <= .6)
  //   render = vec4(1.);
// if(curveCoords.r >= .7 && curveCoords.g >= .7 && curveCoords.b >= .7) render = mix(vec4(curveCoords, 1.), render, 1. - curveCoords.r);
if(curveCoords.r >= .7 && curveCoords.g >= .7 && curveCoords.b >= .7) render = vec4(1.);

gl_FragColor = vec4(outgoingLight * render.xyz, diffuseColor.a * render.w);
