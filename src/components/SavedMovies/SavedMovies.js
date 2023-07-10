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
  const [isChecked, setIsChecked] = useState(false);
  const [shortFilms, setShortFilms] = useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [searched, setSearched] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    setFoundSavedMovies(selectedFilms);
  }, [])

  useEffect(() => {
    handleNotFoundMovies();
  }, [foundSavedMovies, shortFilms, isChecked])
console.log(foundSavedMovies);
  function handleChange(evt) {
    setValue(evt.target.value);
    if (evt.target.value === '') {
      setIsValid(false);
      setSearched(false);
      setButtonDisabled(true);
      setNotFoundMovies(false);
    } else {
      setIsValid(true);
      setButtonDisabled(false);
      // setSearched(true);
    }
  };

  function handleChecked() {
    setIsChecked(!isChecked);
    if (!isChecked) {
      if (searched) {
        setFoundSavedMovies(selectedFilms.filter(movie => movie.nameRU.toLowerCase().includes(value.toLowerCase())
          && movie.duration < 40));
          console.log('сработал Чекбокс, был Выключен');
      } else {
        setShortFilms(selectedFilms.filter(movie => movie.nameRU.toLowerCase().includes(value.toLowerCase())
          && movie.duration < 40));
        console.log('сработал Чекбокс, был Выключен');
      }
    } else {
      console.log('сработал Чекбокс, был Включен');
      setFoundSavedMovies(selectedFilms.filter(movie => movie.nameRU.toLowerCase().includes(value.toLowerCase())));
    }

  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setSearched(true);
    if (!isChecked) {
      console.log('сработал Поиск, чекбокс был Выключен');
      setFoundSavedMovies(selectedFilms.filter(movie => movie.nameRU.toLowerCase().includes(value.toLowerCase())));
    } else {
      console.log('сработал Поиск, чекбокс был Включен');
      setShortFilms(selectedFilms.filter(movie => movie.nameRU.toLowerCase().includes(value.toLowerCase())
        && movie.duration < 40));
    }
  }

  function handleNotFoundMovies() {
    if (isChecked) {
      shortFilms.length === 0 ? setNotFoundMovies(true) : setNotFoundMovies(false);
    } else {
      foundSavedMovies.length === 0 ? setNotFoundMovies(true) : setNotFoundMovies(false);
    }
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
        handleChecked={handleChecked}
      />
      <MoviesCardList
        selectedFilms={isChecked ? (searched ? foundSavedMovies : shortFilms) : (searched ? foundSavedMovies : selectedFilms)}
        setSelectedFilms={setSelectedFilms}
        notFoundMovies={notFoundMovies}
      />
    </main>
  )
}
