import React from 'react';

export default () => {
	return (
		<footer className="footer">
			<div className="footer__upper">
				<h3 className="footer__heading">Stay update</h3>
				<p>
					Get the latest news about police shop and other incredible
					things
				</p>
				<form className="footer__form">
					<input
						type="text"
						className="footer__input"
						placeholder="Signup to our mailing list"
					/>
					<button type="submmit" className="button footer__button">
						Subscribe
					</button>
				</form>
			</div>
			<div className="footer__lower">
				<div className="footer__about">
					<ul className="footer__about__list">
						<li className="footer__about__item">
							<a href="#">About us </a>
						</li>
						<li className="footer__about__item">
							<a href="#">Contant us </a>
						</li>
						<li className="footer__about__item">
							<a href="#">Logo</a>
						</li>
						<li className="footer__about__item">
							<a href="#">Privacy </a>
						</li>
						<li className="footer__about__item">
							<a href="#">Work with us </a>
						</li>
					</ul>
				</div>

				<div className="footer__social">
					<ul className="footer__social__list">
						<li className="footer__social__item">
							<a href="#">Facebook </a>
						</li>
						<li className="footer__social__item">
							<a href="#">Google</a>
						</li>
						<li className="footer__social__item">
							<a href="#">Instagram</a>
						</li>
						<li className="footer__social__item">
							<a href="#">Twitter </a>
						</li>
					</ul>
				</div>
				<div className="footer__copyright">
					<p>&copy; 2018-2019, Police Shop.All right reserved</p>
					<p>Credits - Site by Beno</p>
				</div>
			</div>
		</footer>
	);
};
