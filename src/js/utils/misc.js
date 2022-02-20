import SimplexNoise from "simplex-noise";
import { Color } from "three";

function isSafari() {
  return !!navigator.userAgent.match(/Safari/i) && !navigator.userAgent.match(/Chrome/i);
}

const simplex = new SimplexNoise("toto-titou");

const customFogUniforms = {
  coucou: { value: 0 },
  coucou2: { value: new Color("#ff0000") },
};

export { simplex, isSafari, customFogUniforms };
