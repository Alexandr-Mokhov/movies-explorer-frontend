/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import { getAllMovies } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import { useResize } from '../../utils/checkResize';
import filterMovies from '../../utils/filterMovies';
import {
  SCREEN_DESCTOP,
  SCREEN_TABLET,
  SCREEN_MOBILE,
  STARTING_ITEMS_DESCTOP,
  STARTING_ITEMS_TABLET,
  STARTING_ITEMS_MOBILE,
  STARTING_ITEMS_MINIMUM,
  ADDITIONAL_ITEMS_DESCTOP,
  ADDITIONAL_ITEMS_TABLET,
  ADDITIONAL_ITEMS_MOBILE,
  ADDITIONAL_ITEMS_MINIMUM,
  ONE_ADDITIONAL_ELEMENT,
} from '../../constans';
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
  const [isChecked, setIsChecked] = useState(false);
  const [shortFilms, setShortFilms] = useState([]);
  const [preloaderEnabled, setPreloaderEnabled] = useState(false);
  const [errorFoundMovies, setErrorFoundMovies] = useState(false);
  const [buttonMoreDisplay, setButtonMoreDisplay] = useState(false);
  const [startingItems, setStartingItems] = useState(5);
  const [additionalItems, setAdditionalItems] = useState(2);
  const windowWidth = useResize();

  useEffect(() => {
    settingAmountFilms();
    isChecked ? handleVisibilityButtonMore(shortFilms) : handleVisibilityButtonMore(foundMovies);
  }, [windowWidth]);

  useEffect(() => {
    if (localStorage.movieSearchText) {
      setValue(localStorage.getItem('movieSearchText'));
      setIsChecked(JSON.parse(localStorage.getItem('isCheckedShortFilms')));
      setShortFilms(JSON.parse(localStorage.getItem('shortFilms')));
      setFoundMovies(JSON.parse(localStorage.getItem('foundMovies')));
    }
  }, [])

  useEffect(() => {
    isChecked ? handleVisibilityButtonMore(shortFilms) : handleVisibilityButtonMore(foundMovies);
    handleNotFoundMovies();
    savingLocalData();
  }, [foundMovies, shortFilms])

  function handleChange(evt) {
    setValue(evt.target.value);
    if (evt.target.value === '') {
      setIsValid(false);
      setButtonDisabled(true);
    } else {
      setIsValid(true);
      setButtonDisabled(false);
    }
  }

  function settingAmountFilms() {
    if (windowWidth >= SCREEN_DESCTOP) {
      setStartingItems(STARTING_ITEMS_DESCTOP);
      setAdditionalItems(ADDITIONAL_ITEMS_DESCTOP);
    } else if (windowWidth >= SCREEN_TABLET) {
      setStartingItems(STARTING_ITEMS_TABLET);
      setAdditionalItems(ADDITIONAL_ITEMS_TABLET);
    } else if (windowWidth >= SCREEN_MOBILE) {
      setStartingItems(STARTING_ITEMS_MOBILE);
      setAdditionalItems(ADDITIONAL_ITEMS_MOBILE);
    } else {
      setStartingItems(STARTING_ITEMS_MINIMUM);
      setAdditionalItems(ADDITIONAL_ITEMS_MINIMUM);
    }
  }

  useEffect(() => {
    isChecked ? handleVisibilityButtonMore(shortFilms) : handleVisibilityButtonMore(foundMovies);
  }, [handleClickMore])

  function handleVisibilityButtonMore(listFilms) {
    listFilms.length >= startingItems + ONE_ADDITIONAL_ELEMENT ?
      setButtonMoreDisplay(true) : setButtonMoreDisplay(false);
  }

  function handleNotFoundMovies() {
    if (movies[0]) {
      if (isChecked) {
        shortFilms.length === 0 ? setNotFoundMovies(true) : setNotFoundMovies(false);
      } else {
        foundMovies.length === 0 ? setNotFoundMovies(true) : setNotFoundMovies(false);
      }
      if (foundMovies.length === 0) {
        setNotFoundMovies(true);
      }
    } else {
      setNotFoundMovies(false);
    }
  }

  function savingLocalData() {
    localStorage.setItem('movieSearchText', value);
    localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
    localStorage.setItem('isCheckedShortFilms', JSON.stringify(isChecked));
    localStorage.setItem('shortFilms', JSON.stringify(shortFilms));
  }

  function handleGetAllMovies(moviesList) {
    getAllMovies()
      .then((res) => {
        setMovies(res);
        moviesList === foundMovies ?
          setFoundMovies(filterMovies(res, value, false)) :
          setShortFilms(filterMovies(res, value, true));
      })
      .then(() => {
        isChecked ? handleVisibilityButtonMore(shortFilms) : handleVisibilityButtonMore(foundMovies);
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

  function handleChecked() {
    !isChecked ? handleVisibilityButtonMore(shortFilms) : handleVisibilityButtonMore(foundMovies);
    setButtonDisabled(true);
    if (value === '') {
      setIsValid(false);
    } else {
      setPreloaderEnabled(true);
      setErrorFoundMovies(false);
      savingLocalData();
      setIsValid(true);
      settingAmountFilms();
      if (movies[0]) {
        setButtonDisabled(false);
        setPreloaderEnabled(false);
        if (isChecked) {
          setFoundMovies(filterMovies(movies, value, false));
          handleVisibilityButtonMore(foundMovies);
        } else {
          setShortFilms(filterMovies(movies, value, true));
          handleVisibilityButtonMore(shortFilms);
        }
      } else {
        if (isChecked) {
          handleGetAllMovies(foundMovies);
          handleVisibilityButtonMore(foundMovies);
        } else {
          handleGetAllMovies(shortFilms);
          handleVisibilityButtonMore(shortFilms);
        }
      }
    }
    setIsChecked(!isChecked);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setPreloaderEnabled(true);
    setErrorFoundMovies(false);
    setButtonDisabled(true);
    if (value === '') {
      setIsValid(false);
    } else {
      savingLocalData();
      setIsValid(true);
      settingAmountFilms();
      if (movies[0]) {
        setPreloaderEnabled(false);
        setButtonDisabled(false);
        if (!isChecked) {
          setFoundMovies(filterMovies(movies, value, false));
          handleVisibilityButtonMore(foundMovies);
        } else {
          setShortFilms(filterMovies(movies, value, true));
          handleVisibilityButtonMore(shortFilms);
        }
      } else {
        if (!isChecked) {
          handleGetAllMovies(foundMovies);
          handleVisibilityButtonMore(foundMovies);
        } else {
          handleGetAllMovies(shortFilms);
          handleVisibilityButtonMore(shortFilms);
        }
      }
    }
  }

  function handleClickMore() {
    setStartingItems(startingItems + additionalItems);
  }

  return (
    <main className="movies" aria-label="Фильмы">
      <SearchForm
        value={value}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isValid={isValid}
        buttonDisabled={buttonDisabled}
        isChecked={isChecked}
        handleChecked={handleChecked}
      />
      {preloaderEnabled ? <Preloader /> :
        <MoviesCardList
          foundMovies={foundMovies}
          notFoundMovies={notFoundMovies}
          errorFoundMovies={errorFoundMovies}
          startingItems={startingItems}
          selectedFilms={selectedFilms}
          setSelectedFilms={setSelectedFilms}
          shortFilms={shortFilms}
          isChecked={isChecked}
        />}
      {buttonMoreDisplay && <MoreMovies handleClickMore={handleClickMore} />}
    </main>
  )
}
