import "./SearchForm.css"
import iconSearch from "../../images/icon_search.svg"
import { useState } from "react";

function SearchForm({
  onSearch,
  isChecked,
  setChecked,
  initialValue,
  onInputChange,
}) {
  const [inputValue, setInputValue] = useState(initialValue || '');
  const [textMessage, setTextMessage] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onInputChange && onInputChange(value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!inputValue.trim()) {
      setTextMessage('Введите слово для поиска');
            
      return;
    }
    setTextMessage(null);
    onSearch(inputValue);
  };

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={handleSubmit}>
          <div className="search__field">
            <input
              className='search__input'
              type='text'
              placeholder="Фильм"
              value={inputValue}
              onChange={handleInputChange}
            />          

            <label className='search__label'>
              <img className="search__label-img" src={iconSearch} alt="постер фильма" />
              {textMessage ?
            <p className="search__error">{textMessage}</p> : "Фильм"}
            </label>
            <button className="search__button" type="submit">Найти</button>
          </div>
          
        </form>
        <div className="search__radio-container">

          <label htmlFor="checkbox" className="search__tumbler" >
            <input className="search__checkbox"
              type="checkbox"
              id="checkbox"
              checked={isChecked}
              onChange={() => setChecked(!isChecked)}
            />
            <span className="search__tumbler-name" > Короткометражки</span>
          </label>

        </div>
      </div>
    </section>
  )
}
export default SearchForm