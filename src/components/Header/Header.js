import './Header.css';
import Navigation from '../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';

function Header({loggedIn}) {
  const { pathname } = useLocation();
  return (
    <div className={`header ${pathname !== "/" && "header_light"}`}>
      <div className="header__logo" />
      {loggedIn ? <Navigation /> :
      <div className="header__links-authorization">
        <Link className="header__link header__link_register" to="/sign-up">Регистрация</Link>
        <Link className="header__link header__link_login" to="/sign-in">Войти</Link>
      </div>
      }
    </div>
  );
}

export default Header;
