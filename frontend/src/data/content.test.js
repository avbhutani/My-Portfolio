import { describe, expect, it } from 'vitest';
import {
  aboutFacts,
  achievements,
  education,
  experience,
  navLinks,
  profile,
  socials,
} from './content';
import { achievementIcons, factIcons } from '../components/icons/registry';

const uniqueIds = (items) => {
  const ids = items.map((item) => item.id);
  expect(new Set(ids).size, `duplicate ids: ${ids.join(', ')}`).toBe(ids.length);
};

describe('portfolio content', () => {
  it('exposes the profile fields the UI depends on', () => {
    expect(profile.name).toBeTruthy();
    expect(profile.initials).toBeTruthy();
    expect(profile.role).toBeTruthy();
    expect(profile.roles.length).toBeGreaterThan(0);
    expect(profile.about.length).toBeGreaterThan(0);
    expect(profile.resumeUrl).toMatch(/^https?:\/\//);
  });

  it('keeps ids unique across every list', () => {
    uniqueIds(experience);
    uniqueIds(education);
    uniqueIds(achievements);
  });

  it('gives every experience entry the fields the card renders', () => {
    for (const job of experience) {
      expect(job.position, `missing position on ${job.id}`).toBeTruthy();
      expect(job.company, `missing company on ${job.id}`).toBeTruthy();
      expect(job.duration, `missing duration on ${job.id}`).toBeTruthy();
      expect(job.location, `missing location on ${job.id}`).toBeTruthy();
      expect(Array.isArray(job.tech)).toBe(true);
      expect(Array.isArray(job.highlights)).toBe(true);
    }
  });

  it('gives every education entry the fields the card renders', () => {
    for (const item of education) {
      expect(item.stage, `missing stage on ${item.id}`).toBeTruthy();
      expect(item.degree, `missing degree on ${item.id}`).toBeTruthy();
      expect(item.institute, `missing institute on ${item.id}`).toBeTruthy();
      expect(item.session, `missing session on ${item.id}`).toBeTruthy();
      expect(item.grade, `missing grade on ${item.id}`).toBeTruthy();
    }
  });

  it('gives every navigation entry a label and a unique id', () => {
    for (const link of navLinks) {
      expect(link.label, `nav entry ${link.id} has no label`).toBeTruthy();
      expect(link.id, `nav entry ${link.label} has no id`).toBeTruthy();
    }
    expect(new Set(navLinks.map((l) => l.id)).size).toBe(navLinks.length);
  });

  it('gives every quick fact a label, value, note and a known icon', () => {
    for (const fact of aboutFacts) {
      expect(fact.label, `fact missing label`).toBeTruthy();
      expect(fact.value, `fact "${fact.label}" missing value`).toBeTruthy();
      expect(fact.note, `fact "${fact.label}" missing note`).toBeTruthy();
      expect(factIcons[fact.icon], `fact "${fact.label}" has unknown icon "${fact.icon}"`)
        .toBeTypeOf('function');
    }
  });

  it('gives every achievement a known icon', () => {
    for (const item of achievements) {
      expect(achievementIcons[item.icon], `achievement "${item.id}" has unknown icon`)
        .toBeTypeOf('function');
    }
  });

  it('uses absolute URLs for every configured social link', () => {
    for (const [key, url] of Object.entries(socials)) {
      if (key === 'email' || url === null) continue;
      expect(url, `${key} must be absolute`).toMatch(/^https:\/\//);
    }
    expect(socials.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});