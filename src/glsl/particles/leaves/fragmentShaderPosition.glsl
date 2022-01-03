uniform float time;
uniform float delta;
uniform vec2 camPos;

void main() {

    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 tmpPos = texture2D(texturePosition, uv);
    vec3 position = tmpPos.xyz;
    vec3 velocity = texture2D(textureVelocity, uv).xyz;

    float phase = tmpPos.w;

    if(position.y <= -4.)
        position.y = 5.;
    if(position.x >= camPos.x - 3. || position.x <= camPos.x + 3.) {
        position.x = camPos.x;
        // position.y = 5.;
    }
    // if(position.z >= camPos.y + 3. || position.z <= camPos.y - 3.) {
    //     position.z = camPos.y;
    //     // position.y = 5.;
    // }

    phase = mod((phase + delta +
        length(velocity.xz) * delta * 3. +
        max(velocity.y, 0.0) * delta * 6.), 62.83);

    gl_FragColor = vec4(position + velocity * delta * 15., phase);

}