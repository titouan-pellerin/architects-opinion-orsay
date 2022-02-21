import SimplexNoise from "simplex-noise";
import { Color } from "three";
import { texturesMap } from "./assets";

function isSafari() {
  return !!navigator.userAgent.match(/Safari/i) && !navigator.userAgent.match(/Chrome/i);
}

const simplex = new SimplexNoise("toto-titou");

const customFogUniforms = {
  time: { value: 0 },
  progress: { value: -0.1 },
  transitionIsIn: { value: 0 },
  nearIntensity: { value: 20 },
  noiseTexture: { value: texturesMap.get("noiseTexture")[0] },
};

export { simplex, isSafari, customFogUniforms };
