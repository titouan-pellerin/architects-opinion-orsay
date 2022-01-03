#include ../../utils/noise2d;
#include <common>

attribute vec2 reference;
attribute float leafVertex;

// attribute vec3 birdColor;

uniform sampler2D texturePosition;
uniform sampler2D textureVelocity;

// varying vec4 vColor;
varying vec2 vUv;

uniform float time;
