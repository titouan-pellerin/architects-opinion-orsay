varying float vFogDepthZ;
varying float vFogDepthLeft;
varying float vFogDepthRight;
varying float vFogAnimation;
varying vec2 vUv;

uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;
uniform float time;
uniform float progress;
uniform float transitionIsIn;
uniform sampler2D noiseTexture;