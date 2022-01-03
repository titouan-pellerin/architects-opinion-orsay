uniform float time;
uniform float delta;

void main() {

    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 tmpPos = texture2D(texturePosition, uv);
    vec3 position = tmpPos.xyz;
    vec3 velocity = texture2D(textureVelocity, uv).xyz;

    float phase = tmpPos.w;

    if(position.y <= -3.)
        position.y = 5.;
    if(position.x >= 3. || position.x <= -3.)
        position.x = 0.;
    if(position.z >= 3. || position.z <= -3.)
        position.z = 0.;

    phase = mod((phase + delta +
        length(velocity.xz) * delta * 3. +
        max(velocity.y, 0.0) * delta * 6.), 62.83);

    gl_FragColor = vec4(position + velocity * delta * 15., phase);

}