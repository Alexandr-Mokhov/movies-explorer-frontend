import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList />
      <div className="movies__more">
        <button className="movies__more-button">Еще</button>
      </div>
    </section>
  )
}
