#include <common>
#include ../utils/noise2d;

uniform float uTime;

attribute vec3 aPositions;
attribute float aOffset;
attribute float aScale;

varying float vLoop;
varying float vRandomScale;
// // varying vec2 vUv;
varying vec3 vPos;

const float maxDuration = 7.;