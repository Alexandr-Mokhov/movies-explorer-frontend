import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import { useFormWithValidation } from '../../utils/formValidator';
import { getAllMovies } from '../../utils/MoviesApi';
import './Movies.css';

export default function Movies() {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const [movies, setMovies] = useState([]);
  const [findMovies, setFindMovies] = useState([]);
  // console.log(findMovies);

  function handleSubmit(evt) {
    evt.preventDefault();

    getAllMovies()
      .then((res) => {
        setMovies(res);
        findMovies.length = 0;
      })
      .then(() => {
        movies.filter(movie => {
          if (movie.nameRU.toLowerCase().includes(values['search'].toLowerCase())) {
            // setFindMovies([...findMovies, movie]);
            findMovies.push(movie);
            // console.log(movie);
          }
        })
      })
      .catch((err) => console.log(err))
      .finally(() => {
        resetForm();
      })
  }

  return (
    <main className="movies" aria-label="Фильмы">
      <SearchForm values={values} handleChange={handleChange} isValid={isValid} handleSubmit={handleSubmit} />
      <MoviesCardList findMovies={findMovies} />
      <MoreMovies />
    </main>
  )
}
