import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__contayner">
        <p className="footer__cooperait">© 2022</p>
        <nav>
          <ul className="footer__links">
            <li className="footer__item">
              <a className='footer__link' href='https://practicum.yandex.ru' target='blank' rel='noopener noreferrer'>Яндекс.Практикум</a>
            </li>
            <li className="footer__item">
              <a className='footer__link' href='https://github.com/walerykubasov1985?tab=repositories' target='blank' rel='noopener noreferrer'>Github</a>
            </li>

          </ul>
        </nav>
      </div>
    </footer>
  )
};
export default Footer