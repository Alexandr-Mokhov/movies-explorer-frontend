import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ foundMovies, notFoundMovies }) {

  return (
    <section className="movies-list">
      {notFoundMovies && <h2 className="movies-list__not-found">Ничего не найдено</h2>}
      <div className="movies-list__container">
        {foundMovies.map((movie, i) => {
          return <MoviesCard movies={movie} key={i} />
        })}
      </div>
    </section>
  )
}
