import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Form from '../Form/Form';
import { useFormWithValidation } from '../../utils/formValidator';

export default function Login({ loggedIn, setLoggedIn, isLoading }) {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    navigate("/");
    setLoggedIn(true);
  }

  return (
    <div className="login">
      <div className="login__container">
        <Link className="login__link" to="/"><div className="login__logo" /></Link>
        <h2 className="login__title">Добро пожаловать!</h2>
        <Form
          name={"login"}
          buttonText={isLoading ? 'Вход...' : 'Войти'}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isDisabledButton={!isValid}
        >
          <label className="form__label">E-mail</label>
          <input
            id="input-email"
            className={`form__input ${!errors['email'] || 'form__input_type_error'}`}
            name="email"
            type="email"
            placeholder="Ваша почта"
            required
            value={values['email'] || ''}
            onChange={handleChange}
            autoComplete="off"
          />
          <span className="form__input-error">{errors['email']}</span>
          <label className="form__label">Пароль</label>
          <input
            id="input-password"
            className={`form__input ${!errors['password'] || 'form__input_type_error'}`}
            name="password"
            type="password"
            placeholder="Пароль"
            required
            minLength="4"
            value={values['password'] || ''}
            onChange={handleChange}
            autoComplete="off"
          />
          <span className="form__input-error">{errors['password']}</span>
        </Form>
      </div>
    </div>
  )
}
