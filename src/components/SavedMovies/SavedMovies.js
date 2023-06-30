import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

export default function SavedMovies() {
  return (
    <main className="saved-movies" aria-label="Сохранённые фильмы">
      <SearchForm />
      <MoviesCardList />
    </main>
  )
}
