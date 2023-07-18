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
  handleNotFoundMovies,
  isChecked,
  setIsChecked,
}) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [savedShortFilms, setSavedShortFilms] = useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [foundSavedShortFilms, setFoundSavedShortFilms] = useState([]);
  const [search, setSearch] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [recheck, setRecheck] = useState(false);
  
  useEffect(() => {
    setFoundSavedMovies(selectedFilms);
  }, [])

  useEffect(() => {
    handleNotFoundMovies(savedShortFilms, foundSavedMovies);
    setRecheck(true);
  }, [foundSavedMovies, savedShortFilms, isChecked])

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
        setFoundSavedShortFilms(filterMovies(selectedFilms, value, true));
      } else {
        setSavedShortFilms(filterMovies(selectedFilms, value, true));
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
      setFoundSavedShortFilms(filterMovies(selectedFilms, value, true));
    }
  }

  function displayMovieList() {
    if (isChecked) {
      return search ? foundSavedShortFilms : savedShortFilms;
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
        displayedFilms={displayMovieList()}
        selectedFilms={selectedFilms}
        setSelectedFilms={setSelectedFilms}
        notFoundMovies={notFoundMovies}
        setIsInfoTooltipOpen={setIsInfoTooltipOpen}
        setInfoTooltipMessage={setInfoTooltipMessage}
        setSavedShortFilms={setSavedShortFilms}
        setFoundSavedMovies={setFoundSavedMovies}
        setFoundSavedShortFilms={setFoundSavedShortFilms}
        isChecked={isChecked}
        search={search}
      />
    </main>
  )
}
