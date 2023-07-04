import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ findMovies }) {
  console.log(findMovies);
  return (
    <section className="movies-list">
      <div className="movies-list__container">
        {findMovies.map((movie, i) => {
          return <MoviesCard movies={movie} key={i} />
        })}
      </div>
    </section>
  )
}
