import './NotFound.css';

function NotFound() {
	return (
		<div className="not-found">
			<h3 className="not-found__title">404</h3>
			<p className="not-found__subtitle">Страница не найдена</p>
			<a className="not-found__link-back" href="#">Назад</a>
		</div>
	)
}

export default NotFound;
