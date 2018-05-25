import React from 'react';

export default props => {
	return (
		<figure onClick={props.onClickProduct} className="product-preview">
			<img
				src={props.image}
				alt="Prova"
				className="product-preview__image"
			/>
			<figcaption className="product-preview__detail">
				<p className="product-preview__description">
					{props.description}
				</p>
				<p className="product-preview__price">{props.price} €</p>
			</figcaption>
		</figure>
	);
};
