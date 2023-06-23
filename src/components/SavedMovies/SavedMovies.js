import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList />
      {/* <div className="movies__more">
        <button className="movies__more-button">Еще</button>
      </div> */}
    </section>
  )
}
