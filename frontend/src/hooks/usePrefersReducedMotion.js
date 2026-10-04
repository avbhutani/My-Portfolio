import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../utils/prefersReducedMotion';

const QUERY = '(prefers-reduced-motion: reduce)';

export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    const handleChange = (event) => setPrefersReduced(event.matches);

    setPrefersReduced(query.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return prefersReduced;
}