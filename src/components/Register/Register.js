import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Form from '../Form/Form';
import { useFormWithValidation } from '../../utils/formValidator';
import { registerUser, authorizeUser } from '../../utils/MainApi';
import { CONFLICTING_REQUEST_ERROR, INTERNAL_SERVER_ERROR } from '../../constans';
import './Register.css';

export default function Register({ setLoggedIn, isLoading, setIsLoading, setCurrentUser }) {
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const [errorText, setErrorText] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    setErrorText('');

    registerUser({
      name: values['name'],
      email: values['email'],
      password: values['password'],
    })
      .then((res) => {
        if (res.email) {
          setCurrentUser({ name: res.name, email: res.email });
          localStorage.setItem('name', res.name);
          localStorage.setItem('email', res.email);
        } else {
          return Promise.reject(res.status);
        }
      })
      .then(() => {
        authorizeUser({
          email: values['email'],
          password: values['password'],
        })
          .then((res) => {
            if (res.token) {
              localStorage.setItem('token', res.token);
              setLoggedIn(true);
              navigate('/movies', { replace: true });
              resetForm();
            } else {
              return Promise.reject(res.status);
            }
          })
      })
      .catch((err) => {
        if (err === CONFLICTING_REQUEST_ERROR) {
          setErrorText('Пользователь с таким email уже существует.');
        } else if (err === INTERNAL_SERVER_ERROR) {
          setErrorText('500 На сервере произошла ошибка.');
        } else {
          setErrorText('При регистрации пользователя произошла ошибка.');
        }
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <main className="register">
      <section className="register__container">
        <Link className="register__link" to="/"><div className="register__logo" /></Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <Form
          name={"register"}
          buttonText={isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          isDisabledButton={!isValid}
          errorText={errorText}
        >
          <label className="form__label" htmlFor="input-name">Имя</label>
          <input
            id="input-name"
            className={`form__input ${errors['name'] && 'form__input_type_error'}`}
            name="name"
            type="text"
            placeholder="Ваше имя"
            required
            maxLength="45"
            value={values['name'] || ''}
            onChange={handleChange}
            autoComplete="off"
            pattern="[a-zA-Zа-яёА-ЯЁ\-\s]{2,45}"
          />
          <span className="form__input-error">{errors['name']}</span>
          <label className="form__label" htmlFor="input-email">E-mail</label>
          <input
            id="input-email"
            className={`form__input ${errors['email'] && 'form__input_type_error'}`}
            name="email"
            type="email"
            placeholder="Ваша почта"
            required
            value={values['email'] || ''}
            onChange={handleChange}
            autoComplete="off"
            pattern=".+@.+\.[a-z]{2,}"
          />
          <span className="form__input-error">{errors['email']}</span>
          <label className="form__label" htmlFor="input-password">Пароль</label>
          <input
            id="input-password"
            className={`form__input ${errors['password'] && 'form__input_type_error'}`}
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
      </section>
    </main>
  )
}
