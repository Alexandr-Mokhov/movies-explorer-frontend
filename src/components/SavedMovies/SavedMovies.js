import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList />
      {/* <div className="movies__more">
        <button className="movies__more-button">Еще</button>
      </div> */}
    </div>
  )
}

export default SavedMovies;
