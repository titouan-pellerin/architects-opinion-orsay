attribute float size;

varying vec3 vColor;
varying vec3 vPosition;

void main() {

    vColor = color;
    vPosition = position;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    mvPosition.x += mvPosition.y;

    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = size * (300.0 / -mvPosition.z);

}