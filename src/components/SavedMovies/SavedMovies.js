/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

export default function SavedMovies({
  selectedFilms,
  setSelectedFilms,
  notFoundMovies,
  setNotFoundMovies,
}) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [shortFilms, setShortFilms] = useState(false);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [searched, setSearched] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    setFoundSavedMovies(selectedFilms);
  }, [])

  useEffect(() => {
    handleNotFoundMovies();
  }, [foundSavedMovies])

  function handleChange(event) {
    setValue(event.target.value);
    if (event.target.value === '') {
      setIsValid(false);
      setSearched(false);
      setButtonDisabled(true);
      setNotFoundMovies(false);
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

  function handleNotFoundMovies() {
    foundSavedMovies.length === 0 ? setNotFoundMovies(true) : setNotFoundMovies(false);
  }

  return (
    <main className="saved-movies" aria-label="Сохранённые фильмы">
      <SearchForm
        value={value}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isValid={isValid}
        buttonDisabled={buttonDisabled}
        shortFilms={shortFilms}
        setShortFilms={setShortFilms}
      />
      <MoviesCardList
        selectedFilms={searched ? foundSavedMovies : selectedFilms}
        setSelectedFilms={setSelectedFilms}
        notFoundMovies={notFoundMovies}
      />
    </main>
  )
}
