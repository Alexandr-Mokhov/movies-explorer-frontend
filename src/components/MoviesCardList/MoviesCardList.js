import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ foundMovies, notFoundMovies, errorFoundMovies, startingItems }) {

  const visibleItems = () => foundMovies.slice(0, startingItems).map((movie, i) => <MoviesCard movies={movie} key={i} />);

  return (
    <section className="movies-list">
      {notFoundMovies && <h2 className="movies-list__not-found">Ничего не найдено</h2>}
      {errorFoundMovies && <h3 className="movies-list__error-found">
        Во время запроса произошла ошибка.
        Возможно, проблема с соединением или сервер недоступен.
        Подождите немного и попробуйте ещё раз.
      </h3>}
      <div className="movies-list__container">
        {visibleItems()}
      </div>
    </section>
  )
}
