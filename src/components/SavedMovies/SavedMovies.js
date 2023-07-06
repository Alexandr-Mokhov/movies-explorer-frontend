import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

export default function SavedMovies({ selectedFilms, setSelectedFilms }) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
    event.target.value === '' ? setIsValid(false) : setIsValid(true);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <main className="saved-movies" aria-label="Сохранённые фильмы">
      <SearchForm
        value={value}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isValid={isValid}
        buttonDisabled={buttonDisabled}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
      <MoviesCardList
        selectedFilms={selectedFilms}
        setSelectedFilms={setSelectedFilms}
      />
    </main>
  )
}
