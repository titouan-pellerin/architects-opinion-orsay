float fogFactor = smoothstep(fogNear, fogFar, vFogDepth);

float t1 = texture2D(noiseTexture, vUv).g;

float temp = progress;
temp += ((10.0 * t1 - 5.) * 0.05);

float distanceFromCenter = length(vUv - 0.5);
temp = smoothstep(temp - 0.05, temp, distanceFromCenter);

vec3 initialRender = mix(gl_FragColor.rgb, fogColor, fogFactor);
vec3 clickedRender = mix(gl_FragColor.rgb * 2., fogColor, fogFactor);

vec3 globalRender;

if(transitionIsIn == 1.) {
globalRender = mix(initialRender, clickedRender, temp);
}

if(transitionIsIn == 0.) {
globalRender = mix(clickedRender, initialRender, temp);
}

gl_FragColor.rgb = globalRender;