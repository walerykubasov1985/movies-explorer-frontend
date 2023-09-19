import "./SearchForm.css"
import iconSearch from "../../images/icon_search.svg"

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <div className="search__field">

          <input
            className='search__input'
            type='text'
            placeholder="Фильм"
            name='query'
            required
          />
          <label className='search__label'><img className='search__label-img' src= {iconSearch} alt="постер фильма" />Фильм</label>
          <button className="search__button" type="submit">Найти</button>

        </div>

        <div className="search__radio-container">

          <label className="search__tumbler" >
            <input className="search__checkbox"
              type = "checkbox"
              name = "shortFilms"
              id = "shortFilms"
            />
            <span className="search__tumbler-name" > Короткометражки</span>
          </label>
          
        </div>
      </form>
    </section>
  )
}
export default SearchForm