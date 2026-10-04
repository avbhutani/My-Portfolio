import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import s from './Hero.module.css';

const INTERVAL_MS = 2600;

/**
 * Cycles through a list of roles. Respects prefers-reduced-motion by rendering
 * the first role as static text.
 */
export default function RoleRotator({ roles }) {
  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || roles.length < 2) return undefined;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % roles.length),
      INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, [reducedMotion, roles.length]);

  return (
    <p className={s.roleRotator}>
      <span
        key={reducedMotion ? 'static' : index}
        className={reducedMotion ? undefined : s.roleAnim}
      >
        {roles[index]}
      </span>
    </p>
  );
}