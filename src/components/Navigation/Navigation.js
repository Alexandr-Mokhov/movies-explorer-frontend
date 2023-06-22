import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
import { useState } from 'react';


function Navigation() {
  const [navMenu, setNavMenu] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="navigation">
      <button className={`navigation__button-menu ${navMenu ? "navigation__button-menu_close" : "navigation__button-menu_open"}`} onClick={() => setNavMenu(!navMenu)} />
      <nav className={`navigation__container ${navMenu ? '' : "navigation__container_hide"}`}>
        <ul className="navigation__links">
          <li><Link className={`navigation__link ${pathname === "/" ? "navigation__link_light" : ''}`} to="/">Главная</Link></li>
          <li><Link className={`navigation__link ${pathname === "/" ? "navigation__link_light" : ''}`} to="/movies">Фильмы</Link></li>
          <li><Link className={`navigation__link ${pathname === "/" ? "navigation__link_light" : ''}`} to="/saved-movies">Сохранённые фильмы</Link></li>
        </ul>
        <Link className={`navigation__account ${pathname === "/" ? "navigation__account__light" : ''}`} to="/profile">
          Аккаунт
          <div className="navigation__button-account" />
        </Link>
      </nav>
      <div className={`${navMenu ? "navigation__overlay" : ''}`} />
    </div>
  )
}

export default Navigation;
