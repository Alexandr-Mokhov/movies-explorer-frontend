import './Navigation.css';
import { useState } from 'react';

function Navigation() {
  const [navMenu, setNavMenu] = useState(false);

  return (
    <div className="navigation">
      <button className={`navigation__button-menu ${navMenu ? "navigation__button-menu_close" : "navigation__button-menu_open"}`} onClick={() => setNavMenu(!navMenu)} />
      <nav className={`navigation__container ${navMenu ? '' : "navigation__container_hide"}`}>
        <ul className="navigation__links">
          <li><a className="navigation__link" href="#">Главная</a></li>
          <li><a className="navigation__link navigation__link_active" href="#">Фильмы</a></li>
          <li><a className="navigation__link" href="#">Сохранённые фильмы</a></li>
        </ul>
        <a className="navigation__account" href="#">
          Аккаунт
          <div className="navigation__button-account" />
        </a>
      </nav>
      <div className={`${navMenu ? "navigation__overlay" : ''}`} />
    </div>
  )
}

export default Navigation;
