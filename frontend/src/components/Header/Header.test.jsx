import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Header from './Header';
import { navLinks, profile } from '../../data/content';

const scrollToSection = vi.hoisted(() => vi.fn());
vi.mock('../../utils/scroll', () => ({
  scrollToSection,
  navigateToSection: (event, id) => {
    event.preventDefault();
    scrollToSection(id);
  },
  navigateToTop: vi.fn(),
}));

/*
 * Note: jsdom does not evaluate CSS media queries, so elements that CSS hides
 * below a breakpoint (`display: none` inside `@media`) are still reported as
 * visible by the accessibility tree, and `*ByRole` would match both the
 * desktop and mobile copies of each link. Link wiring is therefore asserted
 * against the DOM directly; responsive visibility is a CSS-only concern.
 */
const desktopNav = (container) =>
  container.querySelector('nav[aria-label="Section navigation"]');

const mobileNav = (container) =>
  container.querySelector('nav[aria-label="Section navigation (mobile)"]');

describe('Header', () => {
  beforeEach(() => {
    scrollToSection.mockClear();
    window.localStorage.clear();
  });

  it('renders every navigation link in the desktop nav', () => {
    const { container } = render(<Header />);
    const nav = desktopNav(container);

    for (const link of navLinks) {
      const anchor = nav.querySelector(`a[href="#${link.id}"]`);
      expect(anchor, `missing nav link for #${link.id}`).not.toBeNull();
      expect(anchor.textContent).toBe(link.label);
    }
  });

  it('mirrors every navigation link in the mobile panel', () => {
    const { container } = render(<Header />);
    const panel = mobileNav(container);

    for (const link of navLinks) {
      expect(panel.querySelector(`a[href="#${link.id}"]`)).not.toBeNull();
    }
  });

  it('intercepts nav clicks and delegates scrolling to scrollToSection', async () => {
    const user = userEvent.setup();
    const { container } = render(<Header />);

    const target = navLinks[2];
    const anchor = desktopNav(container).querySelector(`a[href="#${target.id}"]`);

    await user.click(anchor);

    expect(scrollToSection).toHaveBeenCalledTimes(1);
    expect(scrollToSection).toHaveBeenCalledWith(target.id);
  });

  it('links to the resume in a new tab with noopener', () => {
    const { container } = render(<Header />);
    const resume = container.querySelector(`a[href="${profile.resumeUrl}"]`);

    expect(resume).not.toBeNull();
    expect(resume).toHaveAttribute('target', '_blank');
    expect(resume).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('exposes the mobile menu toggle with correct expanded state', async () => {
    const user = userEvent.setup();
    const { container } = render(<Header />);

    const toggle = container.querySelector('button[aria-controls="mobile-nav"]');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(container.querySelector('#mobile-nav')).toHaveAttribute('hidden');

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelector('#mobile-nav')).not.toHaveAttribute('hidden');
  });

  it('closes the mobile menu after choosing a section', async () => {
    const user = userEvent.setup();
    const { container } = render(<Header />);

    const toggle = container.querySelector('button[aria-controls="mobile-nav"]');
    await user.click(toggle);

    const anchor = container
      .querySelector('#mobile-nav')
      .querySelector(`a[href="#${navLinks[0].id}"]`);
    await user.click(anchor);

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(scrollToSection).toHaveBeenCalledWith(navLinks[0].id);
  });

  // Closing the menu makes the focused link display:none, so without an explicit
  // restore the browser drops focus to <body> and keyboard users lose their place.
  it('returns focus to the toggle when Escape closes the mobile menu', async () => {
    const user = userEvent.setup();
    const { container } = render(<Header />);

    const toggle = container.querySelector('button[aria-controls="mobile-nav"]');
    await user.click(toggle);

    const firstLink = container.querySelector('#mobile-nav a');
    firstLink.focus();
    expect(firstLink).toHaveFocus();

    await user.keyboard('{Escape}');

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveFocus();
  });

  it('toggles between light and dark themes and persists the choice', async () => {
    const user = userEvent.setup();
    render(<Header />);

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');

    await user.click(screen.getByRole('button', { name: /switch to light theme/i }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(window.localStorage.getItem('portfolio-theme')).toBe('light');

    await user.click(screen.getByRole('button', { name: /switch to dark theme/i }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});