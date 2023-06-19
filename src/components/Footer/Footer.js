import './Footer.css';

function Footer() {
	return (
		<div className="footer">
			<p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
			<div className="footer__line"></div>
			<div className="footer__info">
				<p className="footer__copyright">© 2023</p>
				<ul className="footer__links">
					<li className="footer__list"><a className="footer__link" href="#">Яндекс.Практикум</a></li>
					<li className="footer__list"><a className="footer__link" href="#">Github</a></li>
				</ul>
			</div>
		</div>
	) 
}

export default Footer;
