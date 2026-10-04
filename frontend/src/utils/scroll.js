import { prefersReducedMotion } from './prefersReducedMotion';

/**
 * Smoothly scrolls a section into view, accounting for the sticky header.
 * Falls back to an instant jump when the user prefers reduced motion.
 */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const header = document.querySelector('[data-header]');
  const headerHeight = header?.offsetHeight ?? 0;
  const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });

  // Move keyboard focus with the viewport so the next Tab continues from
  // inside the section rather than jumping back to the header.
  const focusTarget = el.querySelector('[data-section-focus]') ?? el;
  focusTarget.setAttribute('tabindex', '-1');
  focusTarget.focus({ preventScroll: true });
}

/**
 * Anchor click handler: prevents the browser's jump so scrolling stays smooth
 * and focus is managed, then records the fragment ourselves. Without this the
 * `href` is purely decorative — no deep links and no Back-button history.
 */
export function navigateToSection(event, id) {
  event.preventDefault();
  scrollToSection(id);

  const next = `#${id}`;
  if (window.location.hash !== next) {
    window.history.pushState(null, '', next);
  }
}

/** Back-to-top counterpart: clears the fragment instead of setting one. */
export function navigateToTop(event) {
  event.preventDefault();

  // An explicit `behavior` overrides the CSS scroll-behavior, so the reduced
  // motion media query cannot suppress it on its own.
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });

  if (window.location.hash) {
    window.history.pushState(null, '', window.location.pathname + window.location.search);
  }
}

/**
 * Applies whatever fragment is currently in the address bar to the viewport.
 *
 * Needed because `navigateToSection` records history entries, and nothing else
 * consumes them: on a Back/Forward step the URL changes but the page stays put,
 * which is most visible on phones where the back gesture is habitual. Also
 * corrects a cold load straight onto a deep link, where the browser's own
 * fragment jump ignores the sticky header and hides the heading underneath it.
 *
 * @param {{ initial?: boolean }} [options]
 *   `initial` marks the first sync after mount, where an empty fragment means
 *   "leave the page where it is" rather than "jump to the top".
 */
export function syncFromHash({ initial = false } = {}) {
  const id = window.location.hash.replace(/^#/, '');

  if (!id) {
    // Only a real history step scrolls to the top; on mount, stay put so a
    // refresh at the top of the page does not jump.
    if (!initial) {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
    return;
  }

  scrollToSection(id);
}
