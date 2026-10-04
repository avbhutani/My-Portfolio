import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'portfolio-theme';
const DARK = 'dark';
const LIGHT = 'light';

function readInitialTheme() {
  if (typeof window === 'undefined') return DARK;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === DARK || stored === LIGHT) return stored;
  } catch {
    /* localStorage can throw in private mode — fall through to the OS setting */
  }

  return window.matchMedia?.('(prefers-color-scheme: light)').matches
    ? LIGHT
    : DARK;
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);

  // Keep the browser chrome (address bar on mobile) in sync with the theme.
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === DARK ? '#0a0d14' : '#ffffff');
}

export function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme);

  // True only once the visitor has clicked the toggle. Tracked in a ref rather
  // than inferred from localStorage, because an absent key is also the state
  // before React mounts, and reading it mid-session races the first effect.
  const userChose = useRef(false);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Follow the OS preference until the visitor overrides it.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = (event) => {
      if (!userChose.current) setTheme(event.matches ? LIGHT : DARK);
    };

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    userChose.current = true;
    setTheme((current) => {
      const next = current === DARK ? LIGHT : DARK;

      // Persist only an explicit choice. Writing on mount would store the
      // OS-derived theme and make it override the OS on the next visit.
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* Persisting is best-effort only */
      }

      return next;
    });
  }, []);

  return { theme, toggleTheme };
}