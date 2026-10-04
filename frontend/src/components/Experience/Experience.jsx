import { experience } from '../../data/content';
import Reveal from '../Reveal/Reveal';
import SectionHead from '../SectionHead/SectionHead';
import {
  IconCalendar,
  IconCheck,
  IconExternal,
  IconMapPin,
} from '../icons/Icons';
import s from './Experience.module.css';

export default function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-heading">
      <div className="container">
        <SectionHead
          id="experience"
          eyebrow="Experience"
          title="Where I’ve worked"
          subtitle="From backend internships and freelance work to a full-time platform role — most of it spent close to the infrastructure layer."
        />

        <div className={s.timeline}>
          {experience.map((job, index) => (
            <Reveal
              className={s.entry}
              key={job.id}
              delay={Math.min(index * 70, 210)}
            >
              <span className={s.node} aria-hidden="true" />

              <article className={s.card}>
                <div className={s.top}>
                  <div>
                    <h3 className={s.position}>{job.position}</h3>
                    <div className={s.companyRow}>
                      {job.companyUrl ? (
                        <a
                          className={s.company}
                          href={job.companyUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {job.company}
                          <IconExternal size={13} style={{ marginLeft: 4, display: 'inline' }} />
                        </a>
                      ) : (
                        <span className={s.company}>{job.company}</span>
                      )}
                      {job.employmentType && (
                        <span className={s.type}>{job.employmentType}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className={s.meta}>
                  <span className={s.metaItem}>
                    <IconCalendar size={15} className={s.metaIcon} />
                    {job.duration}
                  </span>
                  <span className={s.metaItem}>
                    <IconMapPin size={15} className={s.metaIcon} />
                    {job.location}
                  </span>
                </div>

                {job.highlights?.length > 0 && (
                  <ul className={s.highlights}>
                    {job.highlights.map((point) => (
                      <li className={s.highlight} key={point}>
                        <IconCheck size={15} className={s.highlightIcon} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {job.tech?.length > 0 && (
                  <div className={s.tech}>
                    {job.tech.map((item) => (
                      <span className="pill" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}