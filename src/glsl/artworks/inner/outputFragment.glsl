#include <output_fragment>

float artNoiseTexture = texture2D(uNoiseTexture, vUv).g;

float artTemp = uProgress;
artTemp += ((10.0 * artNoiseTexture - 5.) * 0.05);

float artDistanceFromCenter = length(vUv - 0.5);
artTemp = smoothstep(artTemp - 0.05, artTemp, artDistanceFromCenter);

// Renders
vec4 render = texture2D(uTexture, vUv); 


float stroke = cos((vUv.x * vUv.y - time * 0.1) * 50.);

float smallNoise = cnoise(500. * vUv + (time *0.5));
float bigNoise = cnoise(5. * vUv + (time *0.5));

stroke *= (smallNoise * 10.0 - 5.) - (bigNoise * 20.0 - 10.0);

vec4 hoverRender = texture2D(uTexture, vUv);
hoverRender += vec4(stroke) * 0.005; 

vec4 finalRender = mix(hoverRender, render, artTemp);

gl_FragColor = finalRender;