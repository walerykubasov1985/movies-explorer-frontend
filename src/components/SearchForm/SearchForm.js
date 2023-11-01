import "./SearchForm.css"
import iconSearch from "../../images/icon_search.svg"

function SearchForm({props}) {
  const { short, refreshShortMovie, refreshSearchQuery, onSubmit } = props;

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={ onSubmit}>
          <div className="search__field">
            <input
              className='search__input'
              type='text'
              placeholder="Фильм"
              value={props.query}
              onChange={e => refreshSearchQuery(e.target.value)}
            />

            <label className='search__label'>
              <img className="search__label-img" src={iconSearch} alt="постер фильма" />
              <p className="search__error">Фильм</p>
            </label>
            <button className="search__button" type="submit">Найти</button>
          </div>

        </form>
        <div className="search__radio-container">

          <label htmlFor="checkbox" className="search__tumbler" >
            <input className="search__checkbox"
              type="checkbox"
              checked={short}
              onChange={() => {refreshShortMovie(!short)}}
            />
            <span className="search__tumbler-name" > Короткометражки</span>
          </label>

        </div>
      </div>
    </section>
  )
}
export default SearchForm