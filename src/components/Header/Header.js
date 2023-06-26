import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header({ loggedIn }) {
  const { pathname } = useLocation();

  return (
    <header className={`header ${pathname !== "/" && "header_light"}`}>
      <Link className="header__logo" to="/" />
      {
        loggedIn ? <Navigation /> :
          <div className="header__links-authorization">
            <Link to="/sign-up" className=
              {`header__link ${pathname === "/" ? "header__link_type_light" : ''}`}
            >
              Регистрация
            </Link>
            <Link className="header__link header__link_type_login" to="/sign-in">Войти</Link>
          </div>
      }
    </header>
  );
}
