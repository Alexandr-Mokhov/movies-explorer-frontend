import './Header.css'
import { useState } from 'react';

function Header() {
	const [nav, setNav] = useState(false);

	return (
		<>
			{/* <div className="header">
				<div className="header__logo" />
				<div className="header__links-authorization">
					<p className="header__link header__link_type_register">Регистрация</p>
					<div className="header__button-login">
						<p className="header__link header__link_type_login">Войти</p>
					</div>
				</div>
			</div> */}
			<div className="header header_type_light">
				<div className="header__logo" />
				<button className={`header__menu-button ${nav ? "header__menu-button_open" : "header__menu-button_close"}`} onClick={() => setNav(!nav)} />
				<nav className={`header__navbar ${nav ? "header__navbar-close" : ''}`}>
					<ul className="header__links-navbar">
						<li className="header__list"><a className="header__link-navbar" href="#">Главная</a></li>
						<li className="header__list"><a className="header__link-navbar header__link-navbar_active" href="#">Фильмы</a></li>
						<li className="header__list"><a className="header__link-navbar" href="#">Сохранённые фильмы</a></li>
					</ul>
					<div className="header__links-authorization">
						<p className="header__link header__link_type_account">Аккаунт</p>
						<button className="header__button-account" />
					</div>
				</nav>
				<div className={`${nav ? '' : "header__navbar-overlay"}`} />
			</div>
		</>
	);
}

export default Header;
