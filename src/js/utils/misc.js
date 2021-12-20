export function isSafari() {
  return !!navigator.userAgent.match(/Safari/i) && !navigator.userAgent.match(/Chrome/i);
}
