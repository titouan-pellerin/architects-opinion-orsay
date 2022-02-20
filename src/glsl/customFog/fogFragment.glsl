#ifdef USE_FOG
float fogFactor = smoothstep(fogNear, fogFar, vFogDepth);
gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);
#endif