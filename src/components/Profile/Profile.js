/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useFormWithValidation } from '../../utils/formValidator';
import { updateUserInfo } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

export default function Profile({ isLoading, setIsLoading, setCurrentUser, onSignOut }) {
  const [profileEdit, setProfileEdit] = useState(false);
  const [isMatches, setIsMatches] = useState(true);
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);
  const [notificationText, setNotificationText] = useState('');

  function changeProfileEdit() {
    setProfileEdit(!profileEdit);
    setNotificationText('');
  }

  useEffect(() => {
    values['name'] = currentUser.name;
    values['email'] = currentUser.email;
  }, [])

  useEffect(() => {
    if (values['name'] === currentUser.name && values['email'] === currentUser.email) {
      setIsMatches(true);
    } else {
      setIsMatches(false);
      setNotificationText('');
    }
  }, [values])

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    setNotificationText('');

    updateUserInfo({
      name: values['name'],
      email: values['email']
    })
      .then((res) => {
        if (res.email) {
          setCurrentUser({ name: res.name, email: res.email });
          localStorage.setItem('name', res.name);
          localStorage.setItem('email', res.email);
          setProfileEdit(false);
          setNotificationText('Данные успешно сохранены!');
        } else {
          return Promise.reject(res.status);
        }
      })
      .catch((err) => {
        if (err === 409) {
          setNotificationText('Пользователь с таким email уже существует.');
        } else if (err === 500) {
          setNotificationText('500 На сервере произошла ошибка.');
        } else {
          setNotificationText('При обновлении профиля произошла ошибка.');
        }
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setIsMatches(true);
      })
  }

  return (
    <main className="profile">
      <section className="profile__section">
        <form className="profile__form" onSubmit={handleSubmit} noValidate>
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <div className="profile__form-container">
            <div className="profile__inputs-container">
              <label className="profile__label" htmlFor="input-name">Имя</label>
              <input
                id="input-name"
                className={`profile__input ${errors['name'] && 'profile__input_type_error'}`}
                name="name"
                type="text"
                placeholder="Ваше имя"
                required
                maxLength="45"
                value={profileEdit ? values['name'] : currentUser.name || ''}
                onChange={handleChange}
                autoComplete="off"
                disabled={!profileEdit}
                pattern="[a-zA-Zа-яёА-ЯЁ\-\s]{2,45}"
              />
            </div>
            <span className="profile__input-error">{errors['name']}</span>
            <div className="profile__inputs-container">
              <label className="profile__label" htmlFor="input-email">E-mail</label>
              <input
                id="input-email"
                className={`profile__input ${errors['email'] && 'profile__input_type_error'}`}
                name="email"
                type="email"
                placeholder="Ваша почта"
                required
                value={profileEdit ? values['email'] : currentUser.email || ''}
                onChange={handleChange}
                autoComplete="off"
                disabled={!profileEdit}
                pattern=".+@.+\.[a-z]{2,}"
              />
            </div>
            <span className="profile__input-error">{errors['email']}</span>
          </div>
          {profileEdit && <div className="profile__profile-edit">
            <span className="profile__notification profile__notification_type_error">{notificationText}</span>
            <button
              className={`profile__button profile__button_type_save profile__button_type_${isLoading || !isValid || isMatches ? 'inactive' : 'active'}`}
              type="submit"
              disabled={isLoading || !isValid || isMatches}
            >
              {!isLoading ? 'Сохранить' : 'Сохранение...'}
            </button>
          </div>}
          {!profileEdit && <div className="profile__buttons">
            <span className="profile__notification profile__notification_type_completed">{notificationText}</span>
            <button className="profile__button profile__button_type_edit" onClick={changeProfileEdit}>Редактировать</button>
            <button className="profile__button profile__button_type_exit" onClick={onSignOut}>Выйти из аккаунта</button>
          </div>}
        </form>
      </section>
    </main>
  )
}
