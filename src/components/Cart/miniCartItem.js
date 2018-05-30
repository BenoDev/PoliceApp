import React from 'react';

export default ({ title, quantity, price, image }) => {
	return (
		<div className="mini-cart__item">
			<div className="mini-cart__item--image">
				<img src={image} />
			</div>
			<span className="mini-cart__item--title">{title}</span>
			<span className="mini-cart__item--price">{price}€</span>
		</div>
	);
};
