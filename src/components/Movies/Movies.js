import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import { getAllMovies } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import { useResize } from '../../utils/checkResize';
import './Movies.css';

export default function Movies({ selectedFilms, setSelectedFilms }) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [movies, setMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [preloaderEnabled, setPreloaderEnabled] = useState(false);
  const [notFoundMovies, setNotFoundMovies] = useState(false);
  const [errorFoundMovies, setErrorFoundMovies] = useState(false);
  const [buttonMoreDisplay, setButtonMoreDisplay] = useState(false);
  const [startingItems, setStartingItems] = useState(5);
  const [additionalItems, setAdditionalItems] = useState(2);
  const windowWidth = useResize();
console.log(selectedFilms);
  const handleChange = (event) => {
    setValue(event.target.value);
    event.target.value === '' ? setIsValid(false) : setIsValid(true);
  };

  function handleNotFoundMovies(foundMovies) {
    if (foundMovies.length === 0) {
      setNotFoundMovies(true);
    } else {
      setNotFoundMovies(false);
    }
  }

  useEffect(() => {
    if (localStorage.movieSearchText) {
      setValue(localStorage.getItem('movieSearchText'));
      setIsChecked(JSON.parse(localStorage.getItem('shortFilms')));
      setFoundMovies(JSON.parse(localStorage.getItem('foundMovies')))
    }
  }, [])

  function handleSubmit(evt) {
    evt.preventDefault();
    setPreloaderEnabled(true);
    setErrorFoundMovies(false);
    setButtonMoreDisplay(false);
    if (value === '') {
      setIsValid(false);
    } else {
      setIsValid(true);
      setButtonDisabled(true);
      getAllMovies()
        .then((res) => {
          setMovies(res);
          foundMovies.length = 0;
          res.filter(movie => {
            if (movie.nameRU.toLowerCase().includes(value.toLowerCase()) && (isChecked ? movie.duration < 40 : true)) {
              foundMovies.push(movie);
            }
          });
        })
        .then(() => {
          handleNotFoundMovies(foundMovies);
          localStorage.setItem('movieSearchText', value);
          localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
          localStorage.setItem('shortFilms', isChecked);
          if (foundMovies.length > 4) {
            setButtonMoreDisplay(true);
          }
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

  function handleClickMore() {
    setStartingItems(startingItems + additionalItems);
    foundMovies.length > startingItems + additionalItems ? 
    setButtonMoreDisplay(true) : setButtonMoreDisplay(false);
  }

  useEffect(() => {
    if (windowWidth >= 1000) {
      setStartingItems(12);
      setAdditionalItems(4);
    } else if (windowWidth >= 768) {
      setStartingItems(12);
      setAdditionalItems(3);
    } else if (windowWidth >= 500) {
      setStartingItems(8);
      setAdditionalItems(2);
    } else {
      setStartingItems(5);
      setAdditionalItems(2);
    }

    if (foundMovies.length > 4) {
      setButtonMoreDisplay(true);
    }
  }, [windowWidth]);

  return (
    <main className="movies" aria-label="Фильмы">
      <SearchForm
        value={value}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isValid={isValid}
        buttonDisabled={buttonDisabled}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
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
