import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

// импортировал просто модули карточек для наглядности верстки, при работе с апи будут загружаться нужные карточки
export default function MoviesCardList() {
  return (
    <section className="movies-list">
      <div className="movies-list__container">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </div>
    </section>
  )
}
