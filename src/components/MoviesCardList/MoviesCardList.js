import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({
  foundMovies,
  notFoundMovies,
  errorFoundMovies,
  startingItems,
  selectedFilms,
  setSelectedFilms }) {

  const { pathname } = useLocation();

  const movieSavedItems = () => {
    if (selectedFilms[0]) {
      return selectedFilms.map((movieItem, i) => {
        return <MoviesCard
          movie={movieItem}
          selectedFilms={selectedFilms}
          setSelectedFilms={setSelectedFilms}
          key={i} />
      })
    }
  }

  const movieFoundItems = () => {
    return foundMovies.slice(0, startingItems).map((movieItem, i) => {
      return <MoviesCard
        movie={movieItem}
        selectedFilms={selectedFilms}
        setSelectedFilms={setSelectedFilms}
        key={i} />
    });
  }

  return (
    <section className="movies-list">
      {notFoundMovies && <h2 className="movies-list__not-found">Ничего не найдено</h2>}
      {errorFoundMovies && <h3 className="movies-list__error-found">
        Во время запроса произошла ошибка.
        Возможно, проблема с соединением или сервер недоступен.
        Подождите немного и попробуйте ещё раз.
      </h3>}
      <div className="movies-list__container">
        {pathname === '/movies' ? movieFoundItems() : movieSavedItems()}
      </div>
    </section>
  )
}
