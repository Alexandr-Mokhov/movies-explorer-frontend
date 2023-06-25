import './Form.css';
import { Link } from 'react-router-dom';

export default function Form({ children, name, buttonText, onSubmit, isLoading, isDisabledButton }) {

  return (
    <form className="form" onSubmit={onSubmit} name={name} noValidate>
      <div className="form__container">
        {children}
      </div>
      <div className="form__buttons-container">
        <button
          className={`form__button form__button_type_${isLoading || isDisabledButton ? 'inactive' : 'active'}`}
          type="submit"
          disabled={isLoading || isDisabledButton}
        >
          {buttonText}
        </button>
        <p className="form__login">
          {name === 'register' ? 'Уже зарегистрированы? ' : 'Еще не зарегистрированы? '}
          <Link
            className="form__login-link"
            to={name === 'register' ? '/sign-in' : '/sign-up'}
          >
            {name === 'register' ? 'Войти' : 'Регистрация'}
          </Link>
        </p>
      </div>
    </form>
  )
}
