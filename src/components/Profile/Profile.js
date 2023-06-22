import './Profile.css';

function Profile() {
  return (
    <div className="profile">
      <h2 className="profile__greetings">Привет, Александр!</h2>
      <div className="profile__container">
        <p className="profile__title">Имя</p>
        <p className="profile__title profile__title_type_value">Александр</p>
      </div>
      <div className="profile__container">
        <p className="profile__title">E-mail</p>
        <p className="profile__title profile__title_type_value">pochta@mail.ru</p>
      </div>
      <a className="profile__link profile__link_type_edit" href="#">Редактировать</a>
      <a className="profile__link profile__link_type_exit" href="#">Выйти из аккаунта</a>
    </div>
  )
}

export default Profile;
