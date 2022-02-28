#include <common>
#include ../../utils/noise2d;

varying vec3 vPos;

uniform vec3 uColor;
uniform vec3 uColor2;

uniform sampler2D uNoiseTexture;
uniform float uTime;
uniform float uProgress;