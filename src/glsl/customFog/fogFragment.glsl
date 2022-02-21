float fogFactor = smoothstep(fogNear, fogFar, vFogDepthZ);
float fogFactorLeft = smoothstep(24., fogFar, vFogDepthLeft);
float fogDepthRight = smoothstep(24., fogFar, vFogDepthRight);

float vFogAnimation = smoothstep(fogNear * 40., fogFar, vFogDepthZ);

float t1 = texture2D(noiseTexture, vUv).g;

float temp = progress;
temp += ((10.0 * t1 - 5.) * 0.05);

float distanceFromCenter = length(vUv - 0.5);
temp = smoothstep(temp - 0.05, temp, distanceFromCenter);

vec3 initialRender = mix(gl_FragColor.rgb, fogColor, fogFactor);
initialRender = mix(initialRender, fogColor, fogFactorLeft);
initialRender = mix(initialRender, fogColor, fogDepthRight);

vec3 clickMenuRender = mix(gl_FragColor.rgb * 3., fogColor, vFogAnimation);
clickMenuRender = mix(clickMenuRender, fogColor, fogFactorLeft);
clickMenuRender = mix(clickMenuRender, fogColor, fogDepthRight);

vec3 clickArtworkRender = mix(gl_FragColor.rgb * 2., fogColor, fogFactor);
clickArtworkRender = mix(clickArtworkRender, fogColor, fogFactorLeft);
clickArtworkRender = mix(clickArtworkRender, fogColor, fogDepthRight);

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

gl_FragColor.rgb = globalRender;