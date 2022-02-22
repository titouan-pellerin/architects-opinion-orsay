import SimplexNoise from "simplex-noise";
import { texturesMap } from "./assets";

function isSafari() {
  return !!navigator.userAgent.match(/Safari/i) && !navigator.userAgent.match(/Chrome/i);
}

function isMobile() {
  const ua = navigator.userAgent;
  if (
    /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
    // eslint-disable-next-line max-len
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  )
    return true;
  return false;
}

const simplex = new SimplexNoise("toto-titou");

const customFogUniforms = {
  time: { value: 0 },
  progress: { value: -0.1 },
  transitionIsIn: { value: 0 },
  noiseTexture: { value: texturesMap.get("noiseTexture")[0] },
};

export { simplex, isSafari, isMobile, customFogUniforms };
