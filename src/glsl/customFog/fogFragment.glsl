float fogFactor = smoothstep(fogNear, fogFar, vFogDepth);
float vFogAnimation = smoothstep(fogNear * 40., fogFar, vFogDepth);

float t1 = texture2D(noiseTexture, vUv).g;

float temp = progress;
temp += ((10.0 * t1 - 5.) * 0.05);

float distanceFromCenter = length(vUv - 0.5);
temp = smoothstep(temp - 0.05, temp, distanceFromCenter);

vec3 initialRender = mix(gl_FragColor.rgb, fogColor, fogFactor);
vec3 clickMenuRender = mix(gl_FragColor.rgb * 3., fogColor, vFogAnimation);
vec3 clickArtworkRender = mix(gl_FragColor.rgb * 2., fogColor, fogFactor);

vec3 globalRender;

if(transitionIsIn == 0.) {
globalRender = mix(clickMenuRender, initialRender, temp);
}

if(transitionIsIn == 1.) {
globalRender = mix(initialRender, clickMenuRender, temp);
}

if(transitionIsIn == 2.) {
globalRender = mix(clickArtworkRender, initialRender, temp);
}

if(transitionIsIn == 3.) {
globalRender = mix(initialRender, clickArtworkRender, temp);
}

// if(transitionIsIn == 0.) {
// globalRender = mix(clickedRender, initialRender, temp);
// }

// if(transitionIsIn == 0.) {
// globalRender = mix(clickedRender, initialRender, temp);
// }

gl_FragColor.rgb = globalRender;