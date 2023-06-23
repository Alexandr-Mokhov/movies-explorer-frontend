import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { useState } from 'react';

export default function Profile({ loggedIn, setLoggedIn }) {
  const [profileEdit, setProfileEdit] = useState(false);
  const navigate = useNavigate();

  function changeProfileEdit() {
    setProfileEdit(!profileEdit);
  }

  function onSignOut() {
    setLoggedIn(!loggedIn);
    navigate("/");
  }

  return (
    <div className="profile">
      <h2 className="profile__greetings">Привет, Александр!</h2>
      <form className="profile__form">
        <div className="profile__container">
          <label className="profile__label">Имя</label>
          <input className="profile__input profile__input_type_name" value="Александр" type="text" disabled={!profileEdit} />
        </div>
        <div className="profile__container">
          <label className="profile__label">E-mail</label>
          <input className="profile__input profile__input_type_email" value="pochta@mail.ru" type="email" disabled={!profileEdit} />
        </div>
        <span className="profile__error"></span>
        {profileEdit && <button className="profile__button profile__button_type_save" onClick={changeProfileEdit}>Сохранить</button>}
      </form>
      {!profileEdit && <button className="profile__button profile__button_type_edit" onClick={changeProfileEdit}>Редактировать</button>}
      {!profileEdit && <button className="profile__button profile__button_type_exit" onClick={onSignOut}>Выйти из аккаунта</button>}
    </div>
  )
}
