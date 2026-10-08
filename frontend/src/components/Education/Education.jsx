import { education } from '../../data/content';
import Reveal from '../Reveal/Reveal';
import SectionHead from '../SectionHead/SectionHead';
import { IconCalendar, IconCheck, IconGraduation, IconMapPin } from '../icons/Icons';
import s from './Education.module.css';

export default function Education() {
  return (
    <section
      className="section section--alt"
      id="education"
      aria-labelledby="education-heading"
    >
      <div className="container">
        <SectionHead
          id="education"
          eyebrow="Education"
          title="Academic background"
          subtitle="Computer science at SRM Institute of Science and Technology, with a 9.60 CGPA — plus secondary schooling at DAV Public School."
        />

        <div className={s.grid}>
          {education.map((item, index) => (
            <Reveal className={`card ${s.card}`.trim()} key={item.id} delay={index * 90}>
              <div className={s.head}>
                <span className={s.icon} aria-hidden="true">
                  <IconGraduation size={20} />
                </span>
                <div>
                  <p className={s.stage}>{item.stage}</p>
                  <h3 className={s.degree}>{item.degree}</h3>
                  <p className={s.institute}>{item.institute}</p>
                </div>
              </div>

              <div className={s.divider} />

              <div className={s.meta}>
                <span className={s.session}>
                  <IconCalendar size={15} aria-hidden="true" />
                  {item.session}
                </span>
                <span className={s.session}>
                  <IconMapPin size={15} aria-hidden="true" />
                  {item.location}
                </span>
              </div>

              {item.grade && (
                <p className={s.grade}>
                  <IconCheck size={13} aria-hidden="true" />
                  {item.grade}
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}