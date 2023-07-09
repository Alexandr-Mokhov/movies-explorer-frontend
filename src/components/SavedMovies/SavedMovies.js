import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

export default function SavedMovies({ selectedFilms, setSelectedFilms }) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [searched, setSearched] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  function handleChange(event) {
    setValue(event.target.value);
    if (event.target.value === '') {
      setIsValid(false);
      setSearched(false);
      setButtonDisabled(true);
    } else {
      setIsValid(true);
      setButtonDisabled(false);

    }
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    setSearched(true);
    setFoundSavedMovies(selectedFilms.filter(movie => movie.nameRU.toLowerCase().includes(value.toLowerCase())));
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
        selectedFilms={searched ? foundSavedMovies : selectedFilms}
        setSelectedFilms={setSelectedFilms}
      />
    </main>
  )
}
