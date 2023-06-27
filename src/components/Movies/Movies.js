import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import './Movies.css';

export default function Movies() {
  return (
    <main className="movies" aria-label="Фильмы">
      <SearchForm />
      <MoviesCardList />
      <MoreMovies />
    </main>
  )
}
