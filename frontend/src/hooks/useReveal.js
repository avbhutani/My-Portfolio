import { useEffect, useRef } from 'react';

/**
 * Adds the global `is-visible` class when an element scrolls into view.
 * A single shared observer is used for every instance on the page.
 */

let sharedObserver = null;

function getObserver() {
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          sharedObserver.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );

  return sharedObserver;
}

export function useReveal({ disabled = false } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // If IntersectionObserver is unavailable (or animations are disabled),
    // show the content immediately rather than leaving it invisible.
    if (disabled || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return undefined;
    }

    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, [disabled]);

  return ref;
}