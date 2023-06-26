import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import Form from '../Form/Form';
import { useFormWithValidation } from '../../utils/formValidator';

export default function Register({ isLoading }) {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();


  function handleSubmit(evt) {
    evt.preventDefault();
    navigate("/sign-in");
  }

  return (
    <div className="register">
      <div className="register__container">
        <Link className="register__link" to="/"><div className="register__logo" /></Link>
        <h2 className="register__title">Добро пожаловать!</h2>
        <Form
          name={"register"}
          buttonText={isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isDisabledButton={!isValid}
        >
          <label className="form__label">Имя</label>
          <input
            id="input-name"
            className={`form__input ${!errors['name'] || 'form__input_type_error'}`}
            name="name"
            type="text"
            placeholder="Ваше имя"
            required
            maxLength="45"
            value={values['name'] || ''}
            onChange={handleChange}
            autoComplete="off"
          />
          <span className="form__input-error">{errors['name']}</span>
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
