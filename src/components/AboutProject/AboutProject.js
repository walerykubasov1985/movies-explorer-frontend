import "./AboutProject.css"
import Section from "../Section/Section";

function AboutProject() {
  return (
    <section className="project">
      <div className="project__container">
        <Section title='О проекте' />
        <div className="project__about">
          <article className="project__description">
            <h3 className="project__title">Дипломный проект включал 5 этапов</h3>
            <p className="project__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </article>

          <article className="project__description">
            <h3 className="project__title">На выполнение диплома ушло 5 недель</h3>
            <p className="project__subtitle"> У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </article>
        </div>
        <div className="project__duration">
          <p className='project__strip project__time_short'>1 неделя</p> 
          <p className='project__strip project__time_long'>4 недели</p>
          <p className='project__strip project__part_short'>Back-end</p>
          <p className='project__strip project__part_long'>Front-end</p>
        </div>
      </div>
    </section>
  )

};

export default AboutProject;