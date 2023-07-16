/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import filterMovies from '../../utils/filterMovies';
import './SavedMovies.css';

export default function SavedMovies({
  selectedFilms,
  setSelectedFilms,
  notFoundMovies,
  setNotFoundMovies,
  setIsInfoTooltipOpen,
  setInfoTooltipMessage,
}) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [shortFilms, setShortFilms] = useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [search, setSearch] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [recheck, setRecheck] = useState(false);

  useEffect(() => {
    setFoundSavedMovies(selectedFilms);
  }, [])

  useEffect(() => {
    handleNotFoundMovies();
    setRecheck(true);
  }, [foundSavedMovies, shortFilms, isChecked])

  useEffect(() => {
    setNotFoundMovies(false);
  }, [recheck])

  function handleChange(evt) {
    setValue(evt.target.value);
    if (evt.target.value === '') {
      setIsValid(false);
      setSearch(false);
      setButtonDisabled(true);
      setNotFoundMovies(false);
    } else {
      setIsValid(true);
      setButtonDisabled(false);
    }
  };

  function handleChecked() {
    setIsChecked(!isChecked);
    if (!isChecked) {
      if (search) {
        setFoundSavedMovies(filterMovies(selectedFilms, value, true));
      } else {
        setShortFilms(filterMovies(selectedFilms, value, true));
      }
    } else {
      setFoundSavedMovies(filterMovies(selectedFilms, value, false));
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setSearch(true);
    if (!isChecked) {
      setFoundSavedMovies(filterMovies(selectedFilms, value, false));
    } else {
      setShortFilms(filterMovies(selectedFilms, value, true));
    }
  }

  function handleNotFoundMovies() {
    if (isChecked) {
      shortFilms.length === 0 ?
        setNotFoundMovies(true) :
        setNotFoundMovies(false);
    } else {
      foundSavedMovies.length === 0 ?
        setNotFoundMovies(true) :
        setNotFoundMovies(false);
    }
  }

  function displayMovieList() {
    if (isChecked) {
      return search ? foundSavedMovies : shortFilms;
    } else {
      return search ? foundSavedMovies : selectedFilms;
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
        selectedFilms={displayMovieList()}
        setSelectedFilms={setSelectedFilms}
        notFoundMovies={notFoundMovies}
        setIsInfoTooltipOpen={setIsInfoTooltipOpen}
        setInfoTooltipMessage={setInfoTooltipMessage}
      />
    </main>
  )
}
