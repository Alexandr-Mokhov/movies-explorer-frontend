import './Portfolio.css';

export default function Portfolio() {
  return (
    <div className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <p className="portfolio__item-text">Статичный сайт</p>
          <a
            href="https://alexandr-mokhov.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="portfolio__item-link" />
          </a>
        </li>
        <li className="portfolio__item">
          <p className="portfolio__item-text">Адаптивный сайт</p>
          <a
            href="https://alexandr-mokhov.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="portfolio__item-link" />
          </a>
        </li>
        <li className="portfolio__item">
          <p className="portfolio__item-text">Одностраничное приложение</p>
          <a
            href="https://alexandr-mokhov.github.io/react-mesto-auth/#/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="portfolio__item-link" />
          </a>
        </li>
      </ul>
    </div>
  )
}
