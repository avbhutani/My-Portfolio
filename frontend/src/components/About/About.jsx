import { aboutFacts, profile } from '../../data/content';
import Reveal from '../Reveal/Reveal';
import SectionHead from '../SectionHead/SectionHead';
import { IconDownload } from '../icons/Icons';
import { factIcons } from '../icons/registry';
import s from './About.module.css';

export default function About() {
  return (
    <section className="section section--alt" id="about" aria-labelledby="about-heading">
      <div className="container">
        <SectionHead
          id="about"
          eyebrow="About"
          title="A little about me"
          subtitle="The short version of who I am and what I spend my time building."
        />

        <div className={s.layout}>
          <Reveal className={s.prose}>
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}

            <div className={s.proseActions}>
              <a
                className="btn btnPrimary"
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <IconDownload size={17} />
                Download résumé
              </a>
              <a className="btn btnGhost" href="#contact">
                Get in touch
              </a>
            </div>
          </Reveal>

          <Reveal className={s.facts} delay={120}>
            {aboutFacts.map((fact) => {
              const Icon = factIcons[fact.icon];
              return (
                <div className={s.fact} key={fact.label}>
                  <span className={s.factIcon} aria-hidden="true">
                    {Icon && <Icon size={19} />}
                  </span>
                  <div>
                    <p className={s.factLabel}>{fact.label}</p>
                    <p className={s.factValue}>{fact.value}</p>
                    <p className={s.factNote}>{fact.note}</p>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}