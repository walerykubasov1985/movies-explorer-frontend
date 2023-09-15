import "./PageNotFound.css"
import { useNavigate } from "react-router-dom"

function PageNotFound() {
  const navigate = useNavigate()

  const back = () => {
    navigate(-1)
  }

  return (
    <main className="content">
      <section className="page-not-found">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__subtitle">Страница не найдена</p>
        <button className="page-not-found__button" onClick={back} type="button">Назад</button>
      </section>
    </main>
  )
}
export default PageNotFound