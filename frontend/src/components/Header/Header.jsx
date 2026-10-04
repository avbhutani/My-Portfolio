import { useCallback, useEffect, useRef, useState } from 'react';
import { navLinks, profile } from '../../data/content';
import { useActiveSection } from '../../hooks/useActiveSection';
import { navigateToSection, navigateToTop } from '../../utils/scroll';
import { IconClose, IconExternal, IconMenu } from '../icons/Icons';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import s from './Header.module.css';

const SECTION_IDS = navLinks.map((link) => link.id);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection(SECTION_IDS);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape and when returning to desktop widths.
  // Focus is returned to the toggle in both cases: the link that had focus
  // becomes display:none, and the browser would otherwise drop focus to <body>.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const close = ({ restoreFocus = true } = {}) => {
      setMenuOpen(false);
      // On a breakpoint change the toggle is about to become display:none, so
      // focusing it would just hand focus back to <body>.
      if (restoreFocus) toggleRef.current?.focus();
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close();
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = (event) => {
      if (event.matches) close({ restoreFocus: false });
    };

    window.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onChange);
    };
  }, [menuOpen]);

  const go = useCallback(
    (event, id) => {
      setMenuOpen(false);
      navigateToSection(event, id);
    },
    [],
  );

  const goTop = useCallback((event) => {
    setMenuOpen(false);
    navigateToTop(event);
  }, []);

  return (
    <header className={s.header} id="top" data-header data-scrolled={scrolled}>
      <div className={s.inner}>
        <a className={s.brand} href="#top" onClick={goTop} aria-label={`${profile.name} — back to top`}>
          <span className={s.monogram} aria-hidden="true">
            {profile.initials}
          </span>
          <span className={s.brandText}>
            <span className={s.brandName}>{profile.name}</span>
            <span className={s.brandRole}>{profile.role}</span>
          </span>
        </a>

        <nav className={s.desktopNav} aria-label="Section navigation">
          <ul className={s.navList}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(event) => go(event, link.id)}
                  className={`${s.navLink} ${activeId === link.id ? s.navLinkActive : ''}`.trim()}
                  aria-current={activeId === link.id ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.actions}>
          <ThemeToggle />
          <a
            className={`btn btnSubtle ${s.resumeBtn}`.trim()}
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            Resume
            <IconExternal size={14} />
          </a>
          <button
            type="button"
            ref={toggleRef}
            className={s.menuToggle}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
            <span className="srOnly">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <nav
        className={s.mobilePanel}
        id="mobile-nav"
        aria-label="Section navigation (mobile)"
        hidden={!menuOpen}
      >
        <ul className={s.mobileList}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(event) => go(event, link.id)}
                className={`${s.mobileLink} ${activeId === link.id ? s.mobileLinkActive : ''}`.trim()}
                aria-current={activeId === link.id ? 'true' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className={s.mobileFooter}>
          <a
            className="btn btnPrimary"
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            Résumé
          </a>
        </div>
      </nav>
    </header>
  );
}