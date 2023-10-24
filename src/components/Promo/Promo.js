import './Promo.css';

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__logo" />
        <div className="promo__info">
          <h1 className="promo__title">Киноман</h1>
          <p className="promo__subtitle_basic">Сервис по поиску фильмов*, просмотру трейлеров и добавлению их в избранное.</p>
          <p className="promo__subtitle_basic">Зарегистрируйтесь чтобы начать просмотр.</p>
          <p className="promo__subtitle_more">* Колличество фильмов ограничено Api (100 шт.)</p>
          <nav className="promo__nav-tab">
            <ul className="promo__nav-tab-list">
              <li><a className="promo__button" href="#about-project">Подробнее</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )
}
