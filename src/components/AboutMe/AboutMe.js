import './AboutMe.css';
import photo from '../../images/photo.jpg';

function AboutMe() {
  return (
    <div className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__line" />
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Александр Мохов</h3>
          <p className="about-me__profession">Фронтенд-разработчик, 37 лет</p>
          <p className="about-me__biography">
            Я родился в Курганской области, сейчас живу в Челябинске.
            Закончил Московский Автомобильно-Дорожный Институт.
            У меня есть жена и двое детей.
            Я люблю туризм, у нас на Урале множество живописных мест.
            Также увлекаюсь проектированием и конструированием,
            а с недавнего времени увлекся и веб-разработкой.
          </p>
          <a className="about-me__link" href="#">Github</a>
        </div>
        <img className="about-me__photo" src={photo} alt="Фото студента" />
      </div>
    </div>
  )
}

export default AboutMe;