import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header({loggedIn}) {
  return (
    <div className={`header ${loggedIn ? '' : ''}`}>
      <div className="header__logo" />
      {loggedIn ? <Navigation /> :
      <div className="header__links-authorization">
        <a className="header__link header__link_register" href="#">Регистрация</a>
        <a className="header__link header__link_login" href="#">Войти</a>
      </div>
      }
    </div>
  );
}

export default Header;
