import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"

function MoviesCardList() {
  return (
    <section className="cards-movies">
      <ul className="cards-movies__container">
        <li className="cards-movies__item"><MoviesCard /></li>
        <li className="cards-movies__item"><MoviesCard /></li>
        <li className="cards-movies__item"><MoviesCard /></li>
        <li className="cards-movies__item"><MoviesCard /></li>
       
      </ul>
      <button className="cards-movies__more" type="button">Ещё</button>

    </section>

  )
}

export default MoviesCardList