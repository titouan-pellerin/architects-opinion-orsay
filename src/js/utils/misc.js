import SimplexNoise from "simplex-noise";

function isSafari() {
  return !!navigator.userAgent.match(/Safari/i) && !navigator.userAgent.match(/Chrome/i);
}

const simplex = new SimplexNoise("toto-titou");

export { simplex, isSafari };
