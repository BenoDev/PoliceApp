import React from 'react';

export default ({ title, quantity, price, image }) => {
	return (
		<div>
			<h1>{title}</h1>
			<p>{quantity}</p>
			<p>{price}</p>
			<img src={image} alt="" />
		</div>
	);
};
