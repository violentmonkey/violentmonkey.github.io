let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    /* eslint-disable-next-line getter-return */
    get() {
      supportsPassive = true;
    },
  });
  window.addEventListener('testPassive', null, opts);
  window.removeEventListener('testPassive', null, opts);
} catch {
  // ignore
}
const options = supportsPassive ? { passive: true } : false;

export default function onScroll(listener) {
  window.addEventListener('scroll', listener, options);
  return () => window.removeEventListener('scroll', listener, options);
}
