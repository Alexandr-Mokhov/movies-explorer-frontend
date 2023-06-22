import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <div className="page">
      <Header loggedIn={loggedIn}/>
      <Main />
      {/* <Movies /> */}
      {/* <SavedMovies /> */}
      {/* <Profile /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <NotFound /> */}
      {/* <Preloader /> */}
      <Footer />
    </div>
  );
}

export default App;
