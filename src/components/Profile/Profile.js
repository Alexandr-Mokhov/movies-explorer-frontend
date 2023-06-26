import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header/Header';
import { useFormWithValidation } from '../../utils/formValidator';
import './Profile.css';

export default function Profile({ loggedIn, setLoggedIn, isLoading }) {
  const [profileEdit, setProfileEdit] = useState(false);
  const [userName, setUserName] = useState('Александр');
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function changeProfileEdit() {
    setProfileEdit(!profileEdit);
  }

  function onSignOut() {
    setLoggedIn(!loggedIn);
    navigate("/");
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setUserName(values['name']);
    setProfileEdit(false);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <div className="profile">
        <form className="profile__form" onSubmit={handleSubmit} noValidate>
          <div className="profile__container">
            <h2 className="profile__title">Привет, {userName}!</h2>
            <div className="profile__container-input">
              <label className="profile__label">Имя</label>
              <input
                id="input-name"
                className={`profile__input ${!errors['name'] || 'profile__input_type_error'}`}
                name="name"
                type="text"
                placeholder="Ваше имя"
                required
                maxLength="45"
                value={values['name'] || ''}
                onChange={handleChange}
                autoComplete="off"
                disabled={!profileEdit}
              />
            </div>
            <span className="profile__input-error">{errors['name']}</span>
            <div className="profile__container-input">
              <label className="profile__label">E-mail</label>
              <input
                id="input-email"
                className={`profile__input ${!errors['email'] || 'profile__input_type_error'}`}
                name="email"
                type="email"
                placeholder="Ваша почта"
                required
                value={values['email'] || ''}
                onChange={handleChange}
                autoComplete="off"
                disabled={!profileEdit}
              />
            </div>
            <span className="profile__input-error">{errors['email']}</span>
          </div>
          {profileEdit &&
            <button
              className={`form__button form__button_type_${isLoading || !isValid ? 'inactive' : 'active'}`}
              type="submit"
              disabled={isLoading || !isValid}
            >
              Сохранить
            </button>}
        </form>
        {!profileEdit && <div className="profile__buttons">
          <button className="profile__button profile__button_type_edit" onClick={changeProfileEdit}>Редактировать</button>
          <button className="profile__button profile__button_type_exit" onClick={onSignOut}>Выйти из аккаунта</button>
        </div>}
      </div>
    </>
  )
}
