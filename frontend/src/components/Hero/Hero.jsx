import { experience, profile, socials } from '../../data/content';
import { navigateToSection } from '../../utils/scroll';
import Reveal from '../Reveal/Reveal';
import RoleRotator from './RoleRotator';
import { IconBriefcase, IconDownload, IconMail } from '../icons/Icons';
import { socialIcons } from '../icons/registry';
import portrait from '../../assets/profile.jpg';
import s from './Hero.module.css';

const SOCIAL_ORDER = ['github', 'linkedin', 'x'];
const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

export default function Hero() {
  const [firstName, ...restName] = profile.name.split(' ');
  const currentRole = experience[0];
  const activeSocials = SOCIAL_ORDER.filter((key) => Boolean(socials[key]));

  return (
    <section className={s.hero} id="home" aria-labelledby="home-heading">
      <div className={s.backdrop} aria-hidden="true" />
      <div className={s.grid} aria-hidden="true" />

      <div className={`container ${s.inner}`.trim()}>
        <Reveal className={s.copy}>
          {profile.availableForWork && (
            <p className={s.status}>
              <span className={s.statusDot} aria-hidden="true" />
              Available for new opportunities
            </p>
          )}

          <span className={s.greeting}>Hi, I&rsquo;m</span>
          <h1 className={s.title} id="home-heading">
            <span className={s.titleAccent}>{firstName}</span>{' '}
            {restName.join(' ')}
          </h1>

          <div className={s.roleSlot}>
            <RoleRotator roles={profile.roles} />
          </div>

          <p className={s.summary}>{profile.summary}</p>

          <div className={s.actions}>
            <a
              className="btn btnPrimary"
              href="#experience"
              onClick={(event) => navigateToSection(event, 'experience')}
            >
              <IconBriefcase size={17} />
              View experience
            </a>
            <a
              className="btn btnGhost"
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              <IconDownload size={17} />
              Résumé
            </a>
          </div>

          <div className={s.social}>
            <a
              className={s.socialLink}
              href={`mailto:${socials.email}`}
              aria-label={`Email ${profile.name} at ${socials.email}`}
              title={socials.email}
            >
              <IconMail size={19} />
            </a>
            {activeSocials.map((key) => {
              const Icon = socialIcons[key];
              return (
                <a
                  key={key}
                  className={s.socialLink}
                  href={socials[key]}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${profile.name} on ${capitalize(key)}`}
                  title={capitalize(key)}
                >
                  <Icon size={19} />
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal className={s.portraitCol} delay={140}>
          <div className={s.portraitFrame}>
            <div className={s.portraitInner}>
              <img
                className={s.portraitImg}
                src={portrait}
                alt={`Portrait of ${profile.name}`}
                width="440"
                height="440"
              />
            </div>
            {currentRole && (
              <p className={s.portraitBadge}>
                <span className={s.badgeIcon} aria-hidden="true">
                  <IconBriefcase size={17} />
                </span>
                <span className={s.badgeText}>
                  <strong>{currentRole.position}</strong>
                  <span>{currentRole.company}</span>
                </span>
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}