import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';
import { useState } from 'react';

export default function Navigation() {
  const [navMenu, setNavMenu] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="navigation">
      <button
        className={
          `navigation__button-menu 
          ${navMenu ? "navigation__button-menu_type_close" : "navigation__button-menu_type_open"}
          ${pathname === "/" ? "navigation__button-menu_type_light" : ''}`
        }
        onClick={() => setNavMenu(!navMenu)}
      />
      <nav className={`navigation__container ${navMenu ? '' : "navigation__container_hide"}`}>
        <ul className="navigation__links">
          <li>
            <NavLink to="/" className={
              ({ isActive }) => `navigation__link navigation__link_type_main ${isActive ? "navigation__link_type_active" : ''}`
            }>
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={
              ({ isActive }) => `navigation__link ${isActive ? "navigation__link_type_active" : ''}
              ${pathname === "/" ? "navigation__link_type_light" : ''}`
            }>
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink to="/saved-movies" className={
              ({ isActive }) => `navigation__link ${isActive ? "navigation__link_type_active" : ''}
              ${pathname === "/" ? "navigation__link_type_light" : ''}`
            }>
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <Link to="/profile" className={
          `navigation__account ${pathname === "/" ? (navMenu ? '' : "navigation__account__light") : ''}`
        }>
          Аккаунт
          <div className="navigation__button-account" />
        </Link>
      </nav>
      <div className={`${navMenu ? "navigation__overlay" : ''}`} />
    </div>
  )
}
