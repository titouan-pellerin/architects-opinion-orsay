uniform float time;
uniform float delta; // about 0.016
uniform float separationDistance; // 20
uniform float alignmentDistance; // 40

const float width = resolution.x;
const float height = resolution.y;

const float PI = 3.141592653589793;

float zoneRadius = 40.0;
float zoneRadiusSquared = 1600.0;

float separationThresh = 0.45;
float alignmentThresh = 0.65;

const float SPEED = .04;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 leavePosition, leaveVelocity;

    vec3 selfPosition = texture2D(texturePosition, uv).xyz;
    vec3 selfVelocity = texture2D(textureVelocity, uv).xyz;

    float dist;
    vec3 direction;
    float distSquared;

    vec3 velocity = selfVelocity;

    direction = selfPosition;
    dist = length(direction);

    for(float y = 0.0; y < height; y++) {
        for(float x = 0.0; x < width; x++) {

            vec2 ref = vec2(x + 0.5, y + 0.5) / resolution.xy;
            leavePosition = texture2D(texturePosition, ref).xyz;

            direction = leavePosition - selfPosition;
            dist = length(direction);

            distSquared = dist * dist;

            velocity += normalize(leaveVelocity) * delta;
            velocity = normalize(velocity) * SPEED;
        }

    }

    // this make tends to fly around than down or up
    // if (velocity.y > 0.) velocity.y *= (1. - 0.2 * delta);

    // Speed Limits
    // if(length(velocity) > limit) {
    //     velocity = normalize(velocity) * limit;
    // }

    gl_FragColor = vec4(velocity, 1.0);

}