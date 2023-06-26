import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Movies.css';

export default function Movies({ loggedIn }) {
  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm />
      <MoviesCardList />
      <MoreMovies />
      <Footer />
    </section>
  )
}
