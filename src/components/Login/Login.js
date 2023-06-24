import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  function onSign() {
    setLoggedIn(!loggedIn);
    navigate("/");
  }

  return (
    <div className="login">
      <form className="login__form">
        <div className="login__head">
          <Link className="login__main-link" to="/">
            <div className="login__head-logo" />
          </Link>
          <h2 className="login__title">Рады видеть!</h2>
        </div>
        <label className="login__label">E-mail</label>
        <input className="login__input login__input_type_email" value="pochta@mail.ru" type="email" />
        <span className="login__input-error"></span>
        <label className="login__label">Пароль</label>
        <input className="login__input login__input_type_password" value="" type="password" />
        <span className="login__input-error"></span>
      </form>
      <div className="login__buttons-container">
        <button className="login__button" onClick={onSign}>Войти</button>
        <p className="login__register">
          Еще не зарегистрированы?&nbsp;&nbsp;
          <Link className="login__register-link" to="/sign-up">Регистрация</Link>
        </p>
      </div>
    </div>
  )
}
