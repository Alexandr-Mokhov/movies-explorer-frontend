import './SearchForm.css';

export default function SearchForm() {
  return (
    <section className="search-form">
      <form>
        <div className="search-form__input-container">
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
          <button className="search-form__button" type="submit">Поиск</button>
        </div>
        <div className="search-form__checkbox-container">
          <label className="search-form__checkbox-label" for="checkbox">
            <input className="search-form__checkbox-input" id="checkbox" type="checkbox" />
            <span className="search-form__checkbox-title">Короткометражки</span>
          </label>
        </div>
      </form>
    </section>
  )
}
