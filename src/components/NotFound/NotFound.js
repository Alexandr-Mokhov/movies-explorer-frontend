import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {

  return (
    <div className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__subtitle">Страница не найдена</p>
      <Link className="not-found__back" to="/">Назад</Link>
    </div>
  )
}
