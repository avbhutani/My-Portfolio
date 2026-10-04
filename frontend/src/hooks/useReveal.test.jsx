import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useReveal } from './useReveal';
import { scrollToSection } from '../utils/scroll';

/*
 * `setupTests` installs an IntersectionObserver stub whose callback never fires,
 * so these tests install a controllable one — otherwise `useReveal` and
 * `scroll.js` would appear to "pass" while asserting nothing.
 */
let observerInstances = [];

class ControllableObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.observed = [];
    this.unobserved = [];
    observerInstances.push(this);
  }

  observe(el) {
    this.observed.push(el);
  }

  unobserve(el) {
    this.unobserved.push(el);
  }

  disconnect() {
    this.observed = [];
  }

  /** Simulate the element scrolling into view. */
  trigger(el) {
    this.callback([{ target: el, isIntersecting: true }], this);
  }
}

function Probe({ disabled = false }) {
  const ref = useReveal({ disabled });
  return (
    <div ref={ref} data-testid="target">
      content
    </div>
  );
}

const originalIO = globalThis.IntersectionObserver;

/*
 * `useReveal` keeps ONE module-level observer for the whole page, so it survives
 * across tests in this file. Tests therefore reuse the first instance and reset
 * its bookkeeping, rather than expecting a fresh observer per render.
 */
const observer = () => observerInstances[0] ?? null;

beforeEach(() => {
  globalThis.IntersectionObserver = ControllableObserver;
  document.body.innerHTML = '';
  const io = observer();
  if (io) {
    io.observed.length = 0;
    io.unobserved.length = 0;
  }
});

afterEach(() => {
  globalThis.IntersectionObserver = originalIO;
  vi.restoreAllMocks();
});

describe('useReveal', () => {
  it('observes the element with the documented threshold and root margin', () => {
    render(<Probe />);

    expect(observer()).not.toBeNull();
    expect(observer().options).toEqual({
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });
    expect(observer().observed).toContain(screen.getByTestId('target'));
  });

  it('reuses a single observer across every instance', () => {
    render(
      <>
        <Probe />
        <Probe />
      </>,
    );

    expect(observerInstances).toHaveLength(1);
    expect(observer().observed).toHaveLength(2);
  });

  it('adds is-visible when the element intersects, then stops observing it', () => {
    render(<Probe />);
    const target = screen.getByTestId('target');

    expect(target).not.toHaveClass('is-visible');

    observer().trigger(target);

    expect(target).toHaveClass('is-visible');
    // Unobserving stops the callback firing again for an already-revealed node.
    expect(observer().unobserved).toContain(target);
  });

  it('ignores non-intersecting entries', () => {
    render(<Probe />);
    const target = screen.getByTestId('target');

    observer().callback([{ target, isIntersecting: false }], observer());

    expect(target).not.toHaveClass('is-visible');
  });

  it('reveals immediately and creates no observer when disabled', () => {
    const before = observerInstances.length;

    render(<Probe disabled />);

    expect(observerInstances).toHaveLength(before);
    expect(screen.getByTestId('target')).toHaveClass('is-visible');
  });

  it('falls back to revealing when IntersectionObserver is unavailable', () => {
    globalThis.IntersectionObserver = undefined;

    render(<Probe />);

    expect(screen.getByTestId('target')).toHaveClass('is-visible');
  });

  it('unobserves on unmount', () => {
    const { unmount } = render(<Probe />);
    const target = screen.getByTestId('target');

    unmount();

    expect(observer().unobserved).toContain(target);
  });
});

describe('scrollToSection', () => {
  function stubSection(id, { focusable = true, top = 500 } = {}) {
    const section = document.createElement('section');
    section.id = id;
    // jsdom has no layout, so getBoundingClientRect always reports zeroes.
    section.getBoundingClientRect = () => ({ top, left: 0, width: 0, height: 0 });
    document.body.append(section);

    if (focusable) {
      const heading = document.createElement('h2');
      heading.setAttribute('data-section-focus', '');
      section.append(heading);
    }

    return section;
  }

  let scrollTo;

  beforeEach(() => {
    scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  it('offsets the scroll by the sticky header height', () => {
    const header = document.createElement('header');
    header.setAttribute('data-header', '');
    Object.defineProperty(header, 'offsetHeight', { value: 72 });
    document.body.append(header);

    stubSection('about', { top: 500 });

    scrollToSection('about');

    // 500 (rect top) - 72 (header) - 16 (gap) = 412
    expect(scrollTo).toHaveBeenCalledWith({ top: 412, behavior: 'smooth' });
  });

  it('never scrolls to a negative offset', () => {
    stubSection('home', { top: 0 });

    scrollToSection('home');

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('focuses the section heading and makes it programmatically focusable', () => {
    stubSection('about');

    scrollToSection('about');

    const heading = document.querySelector('#about [data-section-focus]');
    expect(heading).toHaveAttribute('tabindex', '-1');
    expect(heading).toHaveFocus();
  });

  it('falls back to focusing the section itself when it has no heading', () => {
    const section = stubSection('contact', { focusable: false });

    scrollToSection('contact');

    expect(section).toHaveAttribute('tabindex', '-1');
    expect(section).toHaveFocus();
  });

  it('uses instant scrolling when the visitor prefers reduced motion', () => {
    const original = window.matchMedia;
    window.matchMedia = (q) => ({
      matches: q.includes('prefers-reduced-motion'),
      media: q,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    });

    try {
      stubSection('about');
      scrollToSection('about');
      expect(scrollTo).toHaveBeenCalledWith({ top: expect.any(Number), behavior: 'auto' });
    } finally {
      window.matchMedia = original;
    }
  });

  it('does nothing for an unknown id', () => {
    scrollToSection('nope');

    expect(scrollTo).not.toHaveBeenCalled();
  });
});
