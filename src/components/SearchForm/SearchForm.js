import { useFormWithValidation } from '../../utils/formValidator';
import './SearchForm.css';

export default function SearchForm() {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    resetForm();
  }

  return (
    <section className="search-form">
      <form onSubmit={handleSubmit} noValidate>
        <div className="search-form__input-container">
          <input
            id="input-search"
            className="search-form__input"
            name="search"
            type="text"
            placeholder="Фильм"
            value={values['search'] || ''}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <button className="search-form__button" type="submit">Поиск</button>
        </div>
        <div className="search-form__checkbox-container">
          <label className="search-form__checkbox-label">
            <input className="search-form__checkbox-input" id="checkbox" type="checkbox" />
            <span className="search-form__checkbox-title">Короткометражки</span>
          </label>
        </div>
      </form>
    </section>
  )
}
