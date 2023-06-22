import './Promo.css';

function Promo() {
  return (
    <div className="promo">
      <div className="promo__logo" />
      <div className="promo__info">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <div className="promo__button">
          <p className="promo__button-text">Узнать больше</p>
        </div>
      </div>
    </div>
  )
}
export default Promo;
