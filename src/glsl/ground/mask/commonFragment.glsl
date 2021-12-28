#include <common>
#include ../../utils/noise2d;

varying vec2 vUv;

uniform float uTime;
uniform float uSpeed;
uniform float uStroke;
uniform float uSmallNoise;
uniform float uBigNoise;
uniform vec3 uColor;
uniform sampler2D uTexture;