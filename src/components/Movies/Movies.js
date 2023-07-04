import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import { getAllMovies } from '../../utils/MoviesApi';
import './Movies.css';

export default function Movies() {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [movies, setMovies] = useState([]);
  const [findMovies, setFindMovies] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
    event.target.value === '' ? setIsValid(false) : setIsValid(true);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    if (value === '') {
      setIsValid(false);
    } else {
      setIsValid(true);
      getAllMovies()
        .then((res) => {
          setMovies(res);
          findMovies.length = 0;
        })
        .then(() => {
          movies.filter(movie => {
            if (movie.nameRU.toLowerCase().includes(value.toLowerCase())) {
              findMovies.push(movie);
            }
          })
        })
        .catch((err) => console.log(err))
        .finally(() => {
        })
    }
  }

  return (
    <main className="movies" aria-label="Фильмы">
      <SearchForm value={value} handleSubmit={handleSubmit} handleChange={handleChange} isValid={isValid} />
      <MoviesCardList findMovies={findMovies} />
      <MoreMovies />
    </main>
  )
}
