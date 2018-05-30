import React from 'react';

export default ({ title, quantity, price, image }) => {
	return (
		<div className="cart__product">
			<div className="cart__product__item--article">
				<div className="cart__product__item--image">
					<img src={image} alt="" />
				</div>
				<span className="cart__product__item--title">{title}</span>
			</div>
			<div className="cart__product__item">Taglia</div>
			<div className="cart__product__item">Colore</div>
			<div className="cart__product__item--quantity">{quantity}</div>
			<div className="cart__product__item--price">{price} €</div>
		</div>
	);
};
