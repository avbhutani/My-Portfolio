import { achievements } from '../../data/content';
import Reveal from '../Reveal/Reveal';
import SectionHead from '../SectionHead/SectionHead';
import { achievementIcons } from '../icons/registry';
import s from './Achievements.module.css';

export default function Achievements() {
  return (
    <section className="section" id="achievements" aria-labelledby="achievements-heading">
      <div className="container">
        <SectionHead
          id="achievements"
          eyebrow="Recognition"
          title="What I’m proud of"
          subtitle="A few things worth calling out — a scholarship, a rating, and a hackathon."
        />

        <div className={s.grid}>
          {achievements.map((item, index) => {
            const Icon = achievementIcons[item.icon] ?? achievementIcons.award;

            return (
              <Reveal className={`card ${s.card}`.trim()} key={item.id} delay={index * 90}>
                <span className={s.icon} aria-hidden="true">
                  <Icon size={22} />
                </span>
                {item.tag && <span className={s.tag}>{item.tag}</span>}
                <h3 className={s.title}>{item.title}</h3>
                <p className={s.description}>{item.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}