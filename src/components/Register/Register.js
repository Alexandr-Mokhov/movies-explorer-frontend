import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const navigate = useNavigate();

  function onSignIn() {
    navigate("/sign-in");
  }

  return (
    <div className="register">
      <div className="register__head">
        <Link className="register__main-link" to="/">
          <div className="register__head-logo" />
        </Link>
        <h2 className="register__title">Добро пожаловать!</h2>
      </div>
      <form className="register__form">
        <label className="register__label">Имя</label>
        <input className="register__input register__input-name" value="Александр" type="text" />
        <span className="register__input-error"></span>
        <label className="register__label">E-mail</label>
        <input className="register__input register__input-email" value="pochta@mail.ru" type="email" />
        <span className="register__input-error"></span>
        <label className="register__label">Пароль</label>
        <input className="register__input register__input-password" value="123456" type="password" />
        <span className="register__input-error">Что-то пошло не так...</span>
        <button className="register__button" onClick={onSignIn}>Зарегистрироваться</button>
        <p className="register__login">
          Уже зарегистрированы?&nbsp;&nbsp;
          <Link className="register__login-link" to="/sign-in">Войти</Link>
        </p>
      </form>
    </div>
  )
}
