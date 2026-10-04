import userEvent from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import { useActiveSection } from './useActiveSection';
import { useTheme } from './useTheme';

/*
 * jsdom does not implement matchMedia, so these tests install a controllable
 * stub. `setupTests` only defines it when absent, which means a previous test
 * file may already have installed a non-controllable one.
 */
let listeners = [];
let systemPrefersLight = false;

function installMatchMedia() {
  listeners = [];
  window.matchMedia = (query) => ({
    get matches() {
      if (query.includes('prefers-color-scheme')) return systemPrefersLight;
      if (query.includes('prefers-reduced-motion')) return false;
      return false;
    },
    media: query,
    onchange: null,
    addEventListener: (_type, fn) => listeners.push(fn),
    removeEventListener: (_type, fn) => {
      listeners = listeners.filter((l) => l !== fn);
    },
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

function emitSystemChange(prefersLight) {
  systemPrefersLight = prefersLight;
  act(() => {
    for (const fn of [...listeners]) fn({ matches: prefersLight });
  });
}

const originalMatchMedia = window.matchMedia;

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  systemPrefersLight = false;
  installMatchMedia();
});

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

describe('useTheme', () => {
  function Probe() {
    const { theme, toggleTheme } = useTheme();
    return (
      <button type="button" onClick={toggleTheme}>
        {theme}
      </button>
    );
  }

  it('adopts the OS light preference when nothing is stored', () => {
    systemPrefersLight = true;
    render(<Probe />);

    expect(screen.getByRole('button')).toHaveTextContent('light');
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('restores a stored choice over the OS preference', () => {
    window.localStorage.setItem('portfolio-theme', 'dark');
    systemPrefersLight = true;

    render(<Probe />);

    expect(screen.getByRole('button')).toHaveTextContent('dark');
  });

  // Regression guard for the dead OS listener: the hook used to persist the
  // OS-derived theme on mount, so a localStorage-based "did the user choose?"
  // check was always true and the OS was never followed again.
  it('follows OS changes before the visitor chooses', () => {
    render(<Probe />);
    expect(screen.getByRole('button')).toHaveTextContent('dark');

    emitSystemChange(true);

    expect(screen.getByRole('button'), 'OS change was not followed').toHaveTextContent('light');
  });

  // Persisting the OS-derived theme on mount would make it override the OS on
  // the next visit, so nothing may be stored until the visitor actually chooses.
  it('stores nothing until the visitor makes an explicit choice', async () => {
    const user = userEvent.setup();
    render(<Probe />);

    emitSystemChange(true);
    expect(screen.getByRole('button')).toHaveTextContent('light');
    expect(window.localStorage.getItem('portfolio-theme')).toBeNull();

    await user.click(screen.getByRole('button'));

    expect(window.localStorage.getItem('portfolio-theme')).toBe('dark');
  });

  it('stops following the OS once the visitor picks a theme explicitly', async () => {
    const user = userEvent.setup();
    render(<Probe />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveTextContent('light');

    emitSystemChange(false);

    expect(screen.getByRole('button'), 'OS overrode an explicit choice').toHaveTextContent('light');
  });
});

describe('ThemeToggle', () => {
  it('names the theme it switches to, not the current one', () => {
    render(<ThemeToggle />);

    // Currently dark, so the control offers light.
    const button = screen.getByRole('button', { name: /switch to light theme/i });
    expect(button).toHaveAttribute('aria-label', 'Switch to light theme');
  });
});

describe('useActiveSection', () => {
  function Probe({ ids }) {
    const activeId = useActiveSection(ids);
    return <span data-testid="active">{activeId ?? 'none'}</span>;
  }

  function stubSections(offsets, scrollY = 0) {
    // jsdom performs no layout, so `offsetTop` and `scrollHeight` must be
    // defined directly — CSS positioning alone would leave them at 0.
    for (const [id, offsetTop] of Object.entries(offsets)) {
      const el = document.createElement('section');
      el.id = id;
      Object.defineProperty(el, 'offsetTop', { value: offsetTop, configurable: true });
      document.body.append(el);
    }

    Object.defineProperty(window, 'scrollY', {
      value: scrollY,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 10000,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true,
      configurable: true,
    });
  }

  afterEach(() => {
    document.body.innerHTML = '';
  });

  // Seeding state with ids[0] highlighted About while the Hero was still on
  // screen, because the Hero is not one of the tracked sections.
  it('reports no active section at the top of the page', () => {
    stubSections({ about: 900, experience: 1900 }, 0);
    render(<Probe ids={['about', 'experience']} />);

    expect(screen.getByTestId('active')).toHaveTextContent('none');
  });

  it('activates the last section whose top has passed the offset', () => {
    stubSections({ about: 900, experience: 1900 }, 1000);
    render(<Probe ids={['about', 'experience']} />);

    expect(screen.getByTestId('active')).toHaveTextContent('about');
  });
});