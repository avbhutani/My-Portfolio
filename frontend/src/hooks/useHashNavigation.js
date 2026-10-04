import { useEffect } from 'react';
import { syncFromHash } from '../utils/scroll';

/**
 * Keeps the viewport in step with the address bar.
 *
 * Nav clicks push history entries, so Back/Forward has to move the page again
 * — without this the URL changes and the scroll position is left behind. The
 * same pass fixes deep links: a cold load onto `#contact` relies on the
 * browser's native fragment jump, which does not know about the sticky header
 * and would tuck the heading underneath it.
 */
export function useHashNavigation() {
  useEffect(() => {
    // Deferred a frame so the browser has applied its own fragment jump before
    // we correct for the header.
    const frame = window.requestAnimationFrame(() => syncFromHash({ initial: true }));

    const onPopState = () => syncFromHash();
    window.addEventListener('popstate', onPopState);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);
}