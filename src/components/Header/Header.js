import './Header.css';
import Navigation from '../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';

export default function Header({loggedIn}) {
  const { pathname } = useLocation();
  return (
    <div className={`header ${pathname !== "/" && "header_light"}`}>
      <Link className="header__logo" to="/"/>
      {loggedIn ? <Navigation /> :
      <div className="header__links-authorization">
        <Link className="header__link header__link_register" to="/sign-up">Регистрация</Link>
        <Link className="header__link header__link_login" to="/sign-in">Войти</Link>
      </div>
      }
    </div>
  );
}
