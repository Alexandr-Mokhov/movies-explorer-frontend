/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import { getAllMovies } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import { useResize } from '../../utils/checkResize';
import './Movies.css';

export default function Movies({
  selectedFilms,
  setSelectedFilms,
  movies,
  setMovies,
  foundMovies,
  setFoundMovies,
  notFoundMovies,
  setNotFoundMovies,
}) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [shortFilms, setShortFilms] = useState(false);
  const [preloaderEnabled, setPreloaderEnabled] = useState(false);
  const [errorFoundMovies, setErrorFoundMovies] = useState(false);
  const [buttonMoreDisplay, setButtonMoreDisplay] = useState(false);
  const [startingItems, setStartingItems] = useState(5);
  const [additionalItems, setAdditionalItems] = useState(2);
  const windowWidth = useResize();

  useEffect(() => {
    settingAmountFilms();
    handleVisibilityButtonMore()
  }, [windowWidth]);

  useEffect(() => {
    if (localStorage.movieSearchText) {
      setValue(localStorage.getItem('movieSearchText'));
      setShortFilms(JSON.parse(localStorage.getItem('shortFilms')));
      setFoundMovies(JSON.parse(localStorage.getItem('foundMovies')));
    }
  }, [])

  useEffect(() => {
    handleVisibilityButtonMore();
    handleNotFoundMovies();
    savingLocalData();
  }, [foundMovies])

  function handleChange(event) {
    setValue(event.target.value);
    if (event.target.value === '') {
      setIsValid(false);
      setButtonDisabled(true);
    } else {
      setIsValid(true);
      setButtonDisabled(false);
    }
  }

  function settingAmountFilms() {
    if (windowWidth >= 1000) {
      setStartingItems(16);
      setAdditionalItems(4);
    } else if (windowWidth >= 800) {
      setStartingItems(12);
      setAdditionalItems(3);
    } else if (windowWidth >= 500) {
      setStartingItems(8);
      setAdditionalItems(2);
    } else {
      setStartingItems(5);
      setAdditionalItems(2);
    }
  }

  function handleVisibilityButtonMore() {
    foundMovies.length > startingItems + additionalItems ?
      setButtonMoreDisplay(true) : setButtonMoreDisplay(false);
  }

  function handleNotFoundMovies() {
    foundMovies.length === 0 ? setNotFoundMovies(true) : setNotFoundMovies(false);
  }

  function savingLocalData() {
    localStorage.setItem('movieSearchText', value);
    localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
    localStorage.setItem('shortFilms', shortFilms);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setPreloaderEnabled(true);
    setErrorFoundMovies(false);
    setButtonMoreDisplay(false);
    setButtonDisabled(true);
    if (value === '') {
      setIsValid(false);
    } else {
      setIsValid(true);
      setFoundMovies([]);
      if (movies[0]) {
        setFoundMovies(movies.filter(movie => movie.nameRU.toLowerCase().includes(value.toLowerCase())));
        handleVisibilityButtonMore();
        setPreloaderEnabled(false);
        setButtonDisabled(false);
      } else {
        getAllMovies()
          .then((res) => {
            setMovies(res);
            setFoundMovies(res.filter(movie => movie.nameRU.toLowerCase().includes(value.toLowerCase())));
          })
          .then(() => {
            handleVisibilityButtonMore();
          })
          .catch((err) => {
            setErrorFoundMovies(true);
            console.log(err);
          })
          .finally(() => {
            setButtonDisabled(false);
            setPreloaderEnabled(false);
          })
      }
    }
  }

  function handleClickMore() {
    setStartingItems(startingItems + additionalItems);
    handleVisibilityButtonMore();
  }

  return (
    <main className="movies" aria-label="Фильмы">
      <SearchForm
        value={value}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isValid={isValid}
        buttonDisabled={buttonDisabled}
        shortFilms={shortFilms}
        setShortFilms={setShortFilms}
      />
      {preloaderEnabled ? <Preloader /> :
        <MoviesCardList
          foundMovies={foundMovies}
          notFoundMovies={notFoundMovies}
          errorFoundMovies={errorFoundMovies}
          startingItems={startingItems}
          selectedFilms={selectedFilms}
          setSelectedFilms={setSelectedFilms}
        />}
      {buttonMoreDisplay && <MoreMovies handleClickMore={handleClickMore} />}
    </main>
  )
}
