import React from 'react';

import { Link } from 'react-router-dom';

export default (props) => {
	console.log(props,'Header')
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
							Abbigliamento
						</Link>
					</li>
					<li className="header__item">
						<Link className="header__link" to="/shop">
							Armi
						</Link>
					</li>
					<li className="header__item">
						<Link className="header__link" to="/checkout">
							Checkout
						</Link>
					</li>
				</div>
				<div className="header__list--right">
					<li className="header__item" onMouseOver={props.switchCart}>
						<Link className="header__link" to="/cart">
							Carrello
						</Link>
					</li>
				</div>
			</ul>
		</header>
	);
};
