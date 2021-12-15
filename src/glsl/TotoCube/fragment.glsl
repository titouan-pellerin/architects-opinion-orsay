uniform sampler2D uTexture1;
uniform float uTime;

varying vec2 vUv;

void main() {
    vec4 textureToto = (texture2D(uTexture1, vUv));

    gl_FragColor = textureToto;
}