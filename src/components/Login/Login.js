import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  return (
    <div className="login">
      <div className="login__head">
        <Link className="login__main-link" to="/">
          <div className="login__head-logo" />
        </Link>
        <h2 className="login__title">Рады видеть!</h2>
      </div>
      <form className="login__form">
        <label className="login__label">E-mail</label>
        <input className="login__input login__input-email" value="pochta@mail.ru" type="email" />
        <span className="login__input-error"></span>
        <label className="login__label">Пароль</label>
        <input className="login__input login__input-password" value="" type="password" />
        <span className="login__input-error"></span>
        <button className="login__button">Войти</button>
        <p className="login__register">
          Еще не зарегистрированы?&nbsp;&nbsp;
          <Link className="login__register-link" to="/sign-up">Регистрация</Link>
        </p>
      </form>
    </div>
  )
}
