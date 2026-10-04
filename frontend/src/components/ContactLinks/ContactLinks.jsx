import { profile, socials } from '../../data/content';
import Reveal from '../Reveal/Reveal';
import SectionHead from '../SectionHead/SectionHead';
import { IconLinkedIn, IconMail } from '../icons/Icons';
import s from './ContactLinks.module.css';

/** Show the readable host/path rather than the raw URL, with no duplicated config. */
const prettyUrl = (url) => url.replace(/^https?:\/\//, '').replace(/\/+$/, '');

export default function ContactLinks() {
  const channels = [
    {
      key: 'email',
      Icon: IconMail,
      label: 'Email',
      value: socials.email,
      action: 'Send me a message',
      hint: 'Fastest reply — usually within a day.',
      href: `mailto:${socials.email}`,
    },
    {
      key: 'linkedin',
      Icon: IconLinkedIn,
      label: 'LinkedIn',
      value: prettyUrl(socials.linkedin),
      action: 'View my profile',
      hint: 'Best for roles, referrals, or a quick intro.',
      href: socials.linkedin,
    },
  ].filter((channel) => channel.href);

  return (
    <section className="section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <SectionHead
          id="contact"
          eyebrow="Contact"
          title="Let’s work together"
          subtitle="Have a role, a project, or a hard backend problem in mind? Pick whichever channel suits you."
        />

        <ul className={s.channels}>
          {channels.map(({ key, Icon, label, value, action, hint, href }, index) => {
            const isExternal = key !== 'email';

            return (
              <Reveal as="li" key={key} delay={index * 120} className={s.item}>
                <a
                  className={s.channel}
                  href={href}
                  {...(isExternal
                    ? { target: '_blank', rel: 'noreferrer noopener' }
                    : null)}
                >
                  <span className={s.icon} aria-hidden="true">
                    <Icon size={20} />
                  </span>

                  <span className={s.body}>
                    <span className={s.label}>{label}</span>
                    <span className={s.value}>{value}</span>
                    <span className={s.hint}>{hint}</span>
                  </span>

                  <span className={s.action}>
                    {action}
                    {isExternal && (
                      <span className={s.external} aria-hidden="true">
                        ↗
                      </span>
                    )}
                  </span>
                </a>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={channels.length * 120}>
          <p className={s.note}>
            Currently working as a {profile.role}, and open to interesting backend
            and platform problems.
          </p>
        </Reveal>
      </div>
    </section>
  );
}