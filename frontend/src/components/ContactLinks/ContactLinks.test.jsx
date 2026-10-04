import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ContactLinks from './ContactLinks';
import { socials } from '../../data/content';

describe('ContactLinks', () => {
  it('offers an email link that opens a mail client', () => {
    render(<ContactLinks />);

    const email = screen.getByRole('link', { name: /email/i });
    expect(email).toHaveAttribute('href', `mailto:${socials.email}`);
    expect(email).toHaveTextContent(socials.email);
    // A mailto must not open a new tab.
    expect(email).not.toHaveAttribute('target');
  });

  it('offers a LinkedIn link that opens safely in a new tab', () => {
    render(<ContactLinks />);

    const linkedin = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedin).toHaveAttribute('href', socials.linkedin);
    expect(linkedin).toHaveAttribute('target', '_blank');
    expect(linkedin).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('keeps the #contact anchor that the nav and About CTA link to', () => {
    const { container } = render(<ContactLinks />);

    const section = container.querySelector('section#contact');
    expect(section).not.toBeNull();
    expect(section).toHaveAttribute('aria-labelledby', 'contact-heading');
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute(
      'id',
      'contact-heading',
    );
  });

  it('renders no form, since the page links out instead of posting', () => {
    const { container } = render(<ContactLinks />);

    expect(container.querySelector('form')).toBeNull();
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(screen.queryByRole('button', { name: /send/i })).toBeNull();
  });

  it('exposes each channel as one keyboard-reachable link', () => {
    render(<ContactLinks />);

    // Whole card is the anchor: no nested interactive elements.
    for (const link of screen.getAllByRole('link')) {
      expect(link.querySelector('a')).toBeNull();
    }
  });
});