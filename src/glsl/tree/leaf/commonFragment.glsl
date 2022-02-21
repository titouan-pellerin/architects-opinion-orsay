#include ../../utils/noise2d;
#include <common>

uniform vec3 uColor;
uniform vec3 uColor2;
uniform vec3 uRayPos;

varying float vRayModifier;
varying vec2 vUv;

vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x, cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y);
}