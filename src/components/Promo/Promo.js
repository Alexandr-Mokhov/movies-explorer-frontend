import './Promo.css';

function Promo() {
  return (
    <div className="promo">
      <div className="promo__logo" />
      <div className="promo__info">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <ul className="promo__nav-tab">
          <li><a className="promo__button" href="#">О проекте</a></li>
          <li><a className="promo__button" href="#">Технологии</a></li>
          <li><a className="promo__button" href="#">Студент</a></li>
        </ul>
      </div>
    </div>
  )
}
export default Promo;
