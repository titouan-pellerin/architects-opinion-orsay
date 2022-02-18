#include ../utils/noise2d;
#include <common>

uniform float uTime;

attribute vec3 aPositions;
attribute vec3 aColor;
attribute float aOffset;
attribute float aScale;
attribute float aSpeedFactor;

varying float vLoop;
varying float vRandomScale;
varying vec2 vUv;
varying vec3 vPos;
varying vec3 vColor;

const float maxDuration = 10.;