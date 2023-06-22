import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <p className="portfolio__item-text">Статичный сайт</p>
          <a href="#"><div className="portfolio__item-link" /></a>
        </li>
        <li className="portfolio__item">
          <p className="portfolio__item-text">Адаптивный сайт</p>
          <a href="#"><div className="portfolio__item-link" /></a>
        </li>
        <li className="portfolio__item">
          <p className="portfolio__item-text">Одностраничное приложение</p>
          <a href="#"><div className="portfolio__item-link" /></a>
        </li>
      </ul>
    </div>
  )
}

export default Portfolio;
