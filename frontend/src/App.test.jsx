import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';
import {
  aboutFacts,
  achievements,
  education,
  experience,
  navLinks,
  profile,
  socials,
} from './data/content';

describe('App', () => {
  it('renders the full name as the page heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    // The heading splits the name across two spans for styling, so compare on
    // textContent rather than matching the element.
    expect(heading).toHaveTextContent(profile.name);
  });

  it('renders the first rotating role in the hero', () => {
    const { container } = render(<App />);
    const hero = within(container.querySelector('#home'));
    // The rotator starts on roles[0]; `profile.role` is the job title used by
    // the About card, not the rotating headline.
    expect(hero.getByText(profile.roles[0])).toBeInTheDocument();
  });

  it('renders a section element for every navigation entry', () => {
    render(<App />);

    for (const link of navLinks) {
      expect(
        document.getElementById(link.id),
        `missing section #${link.id}`,
      ).not.toBeNull();
    }
  });

  it('renders every experience entry inside the experience section', () => {
    const { container } = render(<App />);
    const section = within(container.querySelector('#experience'));

    for (const job of experience) {
      expect(section.getByText(job.position), `missing job ${job.position}`).toBeInTheDocument();
      expect(section.getByText(job.company), `missing company ${job.company}`).toBeInTheDocument();
    }
  });

  it('renders every education entry inside the education section', () => {
    const { container } = render(<App />);
    const section = within(container.querySelector('#education'));

    for (const item of education) {
      expect(section.getByText(item.degree), `missing degree ${item.degree}`).toBeInTheDocument();
      // Class 10 and Class 12 share a school, so the institute legitimately
      // appears more than once.
      expect(
        section.getAllByText(item.institute).length,
        `missing institute ${item.institute}`,
      ).toBeGreaterThan(0);
    }
  });

  it('renders every achievement entry inside the achievements section', () => {
    const { container } = render(<App />);
    const section = within(container.querySelector('#achievements'));

    for (const item of achievements) {
      expect(section.getByText(item.title), `missing achievement ${item.id}`).toBeInTheDocument();
    }
  });

  it('renders every about paragraph inside the about section', () => {
    const { container } = render(<App />);
    const section = within(container.querySelector('#about'));

    for (const paragraph of profile.about) {
      expect(section.getByText(paragraph)).toBeInTheDocument();
    }
  });

  it('renders every quick fact inside the about section', () => {
    const { container } = render(<App />);
    const section = within(container.querySelector('#about'));

    for (const fact of aboutFacts) {
      expect(section.getByText(fact.label), `missing fact ${fact.label}`).toBeInTheDocument();
      expect(section.getByText(fact.value), `missing fact value ${fact.label}`).toBeInTheDocument();
    }
  });

  it('links every rendered social entry to a real profile URL', () => {
    const { container } = render(<App />);

    for (const [key, url] of Object.entries(socials)) {
      if (!url) continue;
      const href = key === 'email' ? `mailto:${url}` : url;
      expect(
        container.querySelector(`a[href="${href}"]`),
        `social "${key}" is not linked anywhere`,
      ).not.toBeNull();
    }
  });

  it('exposes a real #top anchor for the footer back-to-top fallback', () => {
    render(<App />);
    expect(document.getElementById('top')).not.toBeNull();
  });

  it('provides a skip link and a main landmark', () => {
    render(<App />);
    expect(
      screen.getByRole('link', { name: /skip to main content/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('has exactly one level-1 heading', () => {
    render(<App />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('gives every section an accessible name via aria-labelledby', () => {
    const { container } = render(<App />);

    for (const link of navLinks) {
      const section = container.querySelector(`#${link.id}`);
      expect(section, `missing section #${link.id}`).not.toBeNull();

      const labelledBy = section.getAttribute('aria-labelledby');
      expect(labelledBy, `#${link.id} has no aria-labelledby`).toBeTruthy();
      expect(
        container.querySelector(`#${CSS.escape(labelledBy)}`),
        `#${link.id} points at a missing heading`,
      ).not.toBeNull();
    }
  });
});