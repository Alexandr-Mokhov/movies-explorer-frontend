import { useLocation } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const { pathname } = useLocation();
  const isMain = pathname === '/';
  const isMovies = pathname === '/movies';
  const isSavedMovies = pathname === '/saved-movies';

  return (
    <>
      {isMain || isMovies || isSavedMovies ?
        <footer className="footer">
          <div className="footer__container">
            <div className="footer__info">
              <p className="footer__copyright">&copy; {new Date().getFullYear()} Киноман. Александр Мохов</p>
              <ul className="footer__links">
                <li className="footer__list">
                  <a className="footer__link" href="https://github.com/Alexandr-Mokhov" target="_blank" rel="noreferrer">
                    Github
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
        : ''}
    </>
  )
}
