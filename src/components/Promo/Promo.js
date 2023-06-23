import './Promo.css';

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__logo" />
      <div className="promo__info">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <ul className="promo__nav-tab">
          <li>
            <a className="promo__button" href="#about-project">О проекте</a>
          </li>
          <li>
            <a className="promo__button" href="#techs">Технологии</a>
          </li>
          <li>
            <a className="promo__button" href="#about-me">Студент</a>
          </li>
        </ul>
      </div>
    </section>
  )
}
