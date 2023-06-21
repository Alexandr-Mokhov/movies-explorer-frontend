import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() {
  return (
    <div className="page">
      <Header />
      {/* <Main /> */}
      {/* <Movies /> */}
      {/* <SavedMovies /> */}
      <Profile />
    </div>
  );
}

export default App;
