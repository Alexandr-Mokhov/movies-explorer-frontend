import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFormWithValidation } from '../../utils/formValidator';
import { updateUserInfo } from '../../utils/auth';
import './Profile.css';

export default function Profile({ loggedIn, setLoggedIn, isLoading, setIsLoading, currentUser, setCurrentUser }) {
  const [profileEdit, setProfileEdit] = useState(false);
  const [isMatches, setIsMatches] = useState(true);
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function changeProfileEdit() {
    setProfileEdit(!profileEdit);
  }

  useEffect(() => {
    values['name'] = currentUser.name;
    values['email'] = currentUser.email;
  }, [])

  useEffect(() => {
    values['name'] === currentUser.name && values['email'] === currentUser.email ? setIsMatches(true) : setIsMatches(false);
  }, [values['name'], values['email']])

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);

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
        } else {
          return Promise.reject(res.status);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setIsMatches(true);
      })
  }
  
  function onSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/', { replace: true });
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
              />
            </div>
            <span className="profile__input-error">{errors['email']}</span>
          </div>
          {profileEdit &&
            <button
              className={`profile__button profile__button_type_save profile__button_type_${isLoading || !isValid || isMatches ? 'inactive' : 'active'}`}
              type="submit"
              disabled={isLoading || !isValid || isMatches}
            >
              {!isLoading ? 'Сохранить' : 'Сохранение...'}
            </button>}
          {!profileEdit && <div className="profile__buttons">
            <button className="profile__button profile__button_type_edit" onClick={changeProfileEdit}>Редактировать</button>
            <button className="profile__button profile__button_type_exit" onClick={onSignOut}>Выйти из аккаунта</button>
          </div>}
        </form>
      </section>
    </main>
  )
}
