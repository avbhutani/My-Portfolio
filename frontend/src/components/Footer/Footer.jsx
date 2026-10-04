import { profile, socials } from '../../data/content';
import { navigateToTop } from '../../utils/scroll';
import { IconArrowDown, IconMail } from '../icons/Icons';
import { socialIcons } from '../icons/registry';
import s from './Footer.module.css';

const SOCIAL_ORDER = ['github', 'linkedin', 'x'];

export default function Footer() {
  const year = new Date().getFullYear();
  const socialEntries = SOCIAL_ORDER.filter((key) => socials[key]);

  return (
    <footer className={s.footer}>
      <div className={`container ${s.inner}`.trim()}>
        <div>
          <div className={s.brand}>
            <span className={s.monogram} aria-hidden="true">
              {profile.initials}
            </span>
            <span className={s.brandName}>{profile.name}</span>
          </div>
          <p className={s.copyright}>
            © {year} {profile.name}. All rights reserved.
          </p>
        </div>

        <div className={s.meta}>
          {socialEntries.map((key) => {
            const Icon = socialIcons[key];
            return (
              <a
                key={key}
                className={s.link}
                href={socials[key]}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon size={16} />
                {key}
              </a>
            );
          })}

          <a className={s.link} href={`mailto:${socials.email}`}>
            <IconMail size={16} />
            Email
          </a>

          <a
            className={s.backToTop}
            href="#top"
            onClick={navigateToTop}
          >
            <IconArrowDown size={15} style={{ transform: 'rotate(180deg)' }} />
            Top
          </a>
        </div>
      </div>
    </footer>
  );
}