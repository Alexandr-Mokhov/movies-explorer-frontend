/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import filterMovies from '../../utils/filterMovies';
import './SavedMovies.css';

export default function SavedMovies({
  savedFilms,
  setSavedFilms,
  notFoundMovies,
  setNotFoundMovies,
  setIsInfoTooltipOpen,
  setInfoTooltipMessage,
  handleNotFoundMovies,
  selectedShortFilms,
  setSelectedShortFilms,
}) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [savedShortFilms, setSavedShortFilms] = useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [foundSavedShortFilms, setFoundSavedShortFilms] = useState([]);
  const [search, setSearch] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [recheck, setRecheck] = useState(false);
  // const [foundsavedFilms, setFoundsavedFilms] = useState([]);

  useEffect(() => {
    setFoundSavedMovies(savedFilms);
  }, [])

  useEffect(() => {
    handleNotFoundMovies(savedShortFilms, foundSavedMovies);
    setRecheck(true);
  }, [foundSavedMovies, savedShortFilms, selectedShortFilms])

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

  // function handleChecked() {
  //   setSelectedShortFilms(!selectedShortFilms);
  //   if (!selectedShortFilms) {
  //     if (search) {
  //       setFoundSavedShortFilms(filterMovies(savedFilms, value, true));
  //     } else {
  //       setSavedShortFilms(filterMovies(savedFilms, value, true));
  //     }
  //   } else {
  //     setFoundSavedMovies(filterMovies(savedFilms, value, false));
  //   }
  // }
  function handleChecked() {
    setSelectedShortFilms(!selectedShortFilms);
    if (!selectedShortFilms) {
      if (search) {
        setFoundSavedShortFilms(filterMovies(savedFilms, value, true));
      } else {
        setSavedShortFilms(filterMovies(savedFilms, value, true));
      }
    } else {
      setFoundSavedMovies(filterMovies(savedFilms, value, false));
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setSearch(true);
    if (!selectedShortFilms) {
      setFoundSavedMovies(filterMovies(savedFilms, value, false));
    } else {
      setFoundSavedShortFilms(filterMovies(savedFilms, value, true));
    }
  }

  function displayMovieList() {
    if (selectedShortFilms) {
      return search ? foundSavedShortFilms : savedShortFilms;
    } else {
      return search ? foundSavedMovies : savedFilms;
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
        selectedShortFilms={selectedShortFilms}
        handleChecked={handleChecked}
      />
      <MoviesCardList
        displayedFilms={displayMovieList()}
        savedFilms={savedFilms}
        setSavedFilms={setSavedFilms}
        notFoundMovies={notFoundMovies}
        setIsInfoTooltipOpen={setIsInfoTooltipOpen}
        setInfoTooltipMessage={setInfoTooltipMessage}
        setSavedShortFilms={setSavedShortFilms}
        setFoundSavedMovies={setFoundSavedMovies}
        setFoundSavedShortFilms={setFoundSavedShortFilms}
        selectedShortFilms={selectedShortFilms}
        search={search}
      />
    </main>
  )
}
