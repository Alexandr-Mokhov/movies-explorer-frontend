import './Login.css';

function Login() {
  return (
    <div className="login">
      <div className="login__head">
        <div className="login__head-logo" />
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
        <p className="login__register">Еще не зарегистрированы? <a className="login__register-link" href="#">Регистрация</a></p>
      </form>
    </div>

  )
}

export default Login;
