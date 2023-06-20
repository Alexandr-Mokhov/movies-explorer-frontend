import './Header.css'

function Header() {
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
				<nav className="header__navbar">
					<ul className="header__links-navbar">
						<li className="header__list"><a className="header__link-navbar header__link-navbar_active" href="#">Фильмы</a></li>
						<li className="header__list"><a className="header__link-navbar" href="#">Сохранённые фильмы</a></li>
					</ul>
				</nav>
				<div className="header__links-authorization">
					<p className="header__link header__link_type_account">Аккаунт</p>
					<div className="header__button-account" />
					{/* <div className="header__button-login">
					<p className="header__link header__link_type_login">Войти</p>
				</div> */}
				</div>
			</div>
		</>
	);
}

export default Header;
