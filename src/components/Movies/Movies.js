import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import { getAllMovies } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

export default function Movies() {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [movies, setMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [preloaderEnabled, setPreloaderEnabled] = useState(false);
  const [notFoundMovies, setNotFoundMovies] = useState(false);

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

  function handleSubmit(evt) {
    evt.preventDefault();
    setPreloaderEnabled(true);
    if (value === '') {
      setIsValid(false);
    } else {
      setIsValid(true);
      setButtonDisabled(true);
      getAllMovies()
        .then((res) => {
          setMovies(res);
          foundMovies.length = 0;
        })
        .then(() => {
          movies.filter(movie => {
            if (movie.nameRU.toLowerCase().includes(value.toLowerCase()) && (isChecked ? movie.duration < 40 : true)) {
              foundMovies.push(movie);
            }
          });
          handleNotFoundMovies(foundMovies);
          localStorage.setItem('movieSearchText', value);
          localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
          localStorage.setItem('shortFilms', isChecked);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setButtonDisabled(false);
          setPreloaderEnabled(false);
        })
    }
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
        setIsChecked={setIsChecked}
      />
      {preloaderEnabled ? <Preloader /> : <MoviesCardList foundMovies={foundMovies} notFoundMovies={notFoundMovies} />}
      {/* <MoreMovies /> */}
    </main>
  )
}
