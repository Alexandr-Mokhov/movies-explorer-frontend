import './Header.css'

function Header() {
	return (
		<div className="header">
			<div className="header__logo" />
			<div className="header__links-container">
			<p className="header__link header__link_type_register">Регистрация</p>
				<div className="header__button-login">
					<p className="header__link header__link_type_login">Войти</p>
				</div>
			</div>
		</div>
	);
}

export default Header;
