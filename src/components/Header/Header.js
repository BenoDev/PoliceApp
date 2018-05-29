import React from 'react';

import { Link } from 'react-router-dom';

export default () => {
	return (
		<header className="header">
			<ul className="header__list">
				<div className="header__list--left">
					<li className="header__item">
						<a className="header__link" href="#">
							Logo
						</a>
					</li>
				</div>
				<div className="header__list--center">
					<li className="header__item">
						<Link className="header__link" to="/shop">
							Accessori
						</Link>
					</li>
					<li className="header__item">
						<a className="header__link" href="#">
							Abbigliamento
						</a>
					</li>
					<li className="header__item">
						<Link className="header__link" to="/cart">
							Carrello
						</Link>
					</li>
				</div>
				<div className="header__list--right">
					<li className="header__item">
						<a className="header__link" href="#">
							Cart
						</a>
					</li>
				</div>
			</ul>
		</header>
	);
};
