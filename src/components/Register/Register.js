import './Register.css';

function Register() {
	return (
		<div className="register">
			<div className="register__head">
				<div className="register__head-logo" />
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
				<button className="register__button">Зарегистрироваться</button>
				<p className="register__login">Уже зарегистрированы? <a className="register__login-link" href="#">Войти</a></p>
			</form>
		</div>
	)
}

export default Register;
