import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { syncFromHash } from './scroll';

/*
 * jsdom has no layout engine: every element reports offsetHeight 0 and a
 * zeroed rect, and it implements neither smooth scrolling nor sticky-header
 * geometry. So the geometry the calculation depends on is stubbed explicitly,
 * and the assertions check *intent* — which target a history step resolves to —
 * rather than painted pixels.
 */
const HEADER_HEIGHT = 73;
const GAP = 16;

const setHash = (hash) => {
  window.history.replaceState(null, '', hash ? `#${hash}` : window.location.pathname);
};

const stubSections = () => {
  document.body.innerHTML = `
    <header data-header></header>
    <section id="about"></section>
    <section id="experience"></section>
    <section id="contact"><h2 data-section-focus>Contact</h2></section>
  `;

  const header = document.querySelector('[data-header]');
  Object.defineProperty(header, 'offsetHeight', { value: HEADER_HEIGHT, configurable: true });

  // Mirrors the real page: sections stack 600px apart, and a rect's `top` is
  // viewport-relative, so it shrinks as the page scrolls. The offset is
  // captured per entry — closing over the loop variable would hand every
  // section the final value.
  const offsets = { about: 0, experience: 600, contact: 1200 };

  for (const [id, offset] of Object.entries(offsets)) {
    const el = document.getElementById(id);
    el.getBoundingClientRect = () => ({ top: offset - window.scrollY });
    Object.defineProperty(el, 'offsetTop', { value: offset, configurable: true });
  }
};

const lastScrollArg = () => {
  const { calls } = window.scrollTo.mock;
  return calls.length ? calls[calls.length - 1][0] : null;
};

describe('syncFromHash', () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    stubSections();
    window.scrollTo = vi.fn();
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
    setHash('');
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
  });

  it('scrolls to the section named in the fragment, clear of the sticky header', () => {
    setHash('experience');
    syncFromHash();

    // 600 (section top) - 73 (header) - 16 (gap)
    expect(lastScrollArg()).toEqual({ top: 600 - HEADER_HEIGHT - GAP, behavior: 'smooth' });
  });

  it('resolves a fragment to a document position from a scrolled viewport', () => {
    // #contact sits 1200px down the document; from scrollY 1200 its rect top
    // is 0, so the target is its document offset less the header and gap.
    window.scrollY = 1200;
    setHash('contact');
    syncFromHash();

    expect(lastScrollArg()).toEqual({ top: 1200 - HEADER_HEIGHT - GAP, behavior: 'smooth' });
  });

  it('never scrolls to a negative offset for the first section', () => {
    setHash('about');
    syncFromHash();

    expect(lastScrollArg()).toEqual({ top: 0, behavior: 'smooth' });
  });

  it('moves focus into the section so keyboard users follow the jump', () => {
    setHash('contact');
    syncFromHash();

    const heading = document.querySelector('#contact h2');
    expect(document.activeElement).toBe(heading);
    expect(heading).toHaveAttribute('tabindex', '-1');
  });

  it('ignores an unknown fragment rather than throwing', () => {
    setHash('does-not-exist');

    expect(() => syncFromHash()).not.toThrow();
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('sends an empty fragment to the top of the page on a history step', () => {
    setHash('');
    syncFromHash();

    expect(lastScrollArg()).toEqual({ top: 0, behavior: 'smooth' });
  });

  it('leaves the position alone on the initial sync when there is no fragment', () => {
    setHash('');
    syncFromHash({ initial: true });

    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('still corrects a deep link on the initial sync', () => {
    setHash('experience');
    syncFromHash({ initial: true });

    expect(lastScrollArg()).toEqual({ top: 600 - HEADER_HEIGHT - GAP, behavior: 'smooth' });
  });
});