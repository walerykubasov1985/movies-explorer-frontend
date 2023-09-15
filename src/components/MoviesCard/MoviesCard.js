import image from "../../images/image.png"
import "./MoviesCard.css"

function MoviesCard() {
  return (
    <article className="card-movie">
      <img
        className="card-movie__image"
        src={image}
        alt="картинка"
      />
      <div className="card-movie__caption">
        <h2 className="card-movie__title">Когда я думаю о Германии ночью</h2>
        <button className="card-movie__like card-movie__like_activ" type="button"></button>
        {/* card-movie__like_delete */}
      </div>
      <p className="card-movie__duration">1ч42м</p>

    </article>
  )
}
export default MoviesCard