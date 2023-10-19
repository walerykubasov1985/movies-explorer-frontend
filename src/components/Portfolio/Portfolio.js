import "./Portfolio.css"
import arrow from "../../images/arrowLink.svg"

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__link">
          <a className="portfolio__arrow-link" href='https://github.com/walerykubasov1985/how-to-learn' target='blank' rel='noopener noreferrer'><img className="portfolio__arrow-image" src={arrow} alt="Ссылка на проект со статичным сайтом"/>
          <p className="portfolio__name">Статичный сайт</p></a>
        </li>
        <li className="portfolio__link">
          <a className="portfolio__arrow-link" href='https://github.com/walerykubasov1985/russian-travel' target='blank' rel='noopener noreferrer'><img className="portfolio__arrow-image" src={arrow} alt="Ссылка на проект с адаптивным сайтом"/>
          <p className="portfolio__name">Адаптивный сайт</p></a>
        </li>
        <li className="portfolio__link">
          <a className="portfolio__arrow-link" href='https://github.com/walerykubasov1985/react-mesto-api-full-gha' target='blank' rel='noopener noreferrer'><img className="portfolio__arrow-image" src={arrow} alt="Ссылка на проект с одностраничным приложением"/>
          <p className="portfolio__name">Одностраничное приложение</p></a>
        </li>
      </ul>

    </section>
  )
}
export default Portfolio