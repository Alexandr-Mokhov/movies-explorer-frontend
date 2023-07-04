import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ foundMovies, notFoundMovies, errorFoundMovies }) {

  return (
    <section className="movies-list">
      {notFoundMovies && <h2 className="movies-list__not-found">Ничего не найдено</h2>}
      {errorFoundMovies && <h3 className="movies-list__error-found">
        Во время запроса произошла ошибка. 
        Возможно, проблема с соединением или сервер недоступен. 
        Подождите немного и попробуйте ещё раз.
      </h3>}
      <div className="movies-list__container">
        {foundMovies.map((movie, i) => {
          return <MoviesCard movies={movie} key={i} />
        })}
      </div>
    </section>
  )
}
