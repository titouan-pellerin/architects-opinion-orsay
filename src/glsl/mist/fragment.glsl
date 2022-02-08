uniform sampler2D pointTexture;

varying vec3 vColor;
varying vec3 vPosition;

void main() {

    gl_FragColor = vec4(vPosition, 1.0);

    // gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
    // gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);

}