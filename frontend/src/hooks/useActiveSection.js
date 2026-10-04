import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view so the header can highlight it.
 *
 * Uses scroll position rather than IntersectionObserver because the sections
 * vary wildly in height — an observer that fires on ratio changes flickers
 * between two sections while a tall section is scrolling past.
 */
export function useActiveSection(ids, offsetPx = 90) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    let frame = null;

    const compute = () => {
      frame = null;

      const scrollY = window.scrollY + offsetPx;
      let current = null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollY) current = id;
      }

      // Pin the last section once the page is scrolled to the bottom, otherwise
      // a short final section can never become active.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1] ?? current;

      setActiveId((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, offsetPx]);

  return activeId;
}