import './SearchForm.css';

export default function SearchForm() {
  return (
    <form className="search-form">
      <input
        className="search-form__input"
        id=""
        name=""
        type="text"
        placeholder="Фильм"
        required
        value={''}
        onChange={''}
      />
      <div className="search-form__checkbox-container">
        <label className="search-form__checkbox-label" for="checkbox">
          <input className="search-form__checkbox-input" id="checkbox" type="checkbox" />
          <span className="search-form__checkbox-new">Короткометражки</span>
        </label>
      </div>
      <button className="search-form__button" type="submit">Поиск</button>
      <div className="search-form__line" />
    </form>
  )
}
