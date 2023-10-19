import Section from "../Section/Section"
import Portfolio from "../Portfolio/Portfolio"
import "./AboutMe.css"
import photo from "../../images/foto-min.png"

function AboutMe() {
  return (
    <section className="student">
      <div className="student__container">
        <Section title="Студент" />
        <div className="student__about-me">
          <div className="student__text-info">
            <h3 className="student__title">Валерий</h3>
            <p className="student__subtitle">Фронтенд-разработчик, 38 лет.</p>
            <p className="student__text">Я родился и живу в Иванове, закончил ИАТК и ИГСХА. У меня есть жена и двое детей (6 и 12 лет). Я люблю строить дачу и путешествовать с семьёй, а ещё увлекаюсь бегом. С 2022 года увлекся програмированием. С 2009 года занимался видеосъёмкой и монтажом видео.
              с 2022 года погрузился в процесс обучения в Яндекс Практикуме.</p>
            <a className="student__contact" href='https://github.com/walerykubasov1985.html' target='blank'>Github</a>
          </div>
          <img className="student__photo" src={photo} alt='Фото студента' />
        </div>
        <Portfolio/>
      </div>
    </section >
  )
}
export default AboutMe