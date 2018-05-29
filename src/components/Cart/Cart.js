import React, { Component } from 'react';
import CartItem from './cartItem';
import { graphql, compose } from 'react-apollo';
import getCheckout from '../../apollo/client/queries/getCheckout';

class Cart extends Component {
	componentDidUpdate() {
		console.log(this.props, 'Cart');
	}
	renderCartItems() {
		console.log(this.props);
		if (!this.props.checkout.id) {
			return <div>Loading</div>;
		}

		return this.props.checkout.lineItems.edges.map(lineItem => {
			const {
				title,
				quantity,
				variant: {
					price,
					image: { originalSrc }
				}
			} = lineItem.node;
			return (
				<CartItem
					title={title}
					quantity={quantity}
					price={price}
					image={originalSrc}
				/>
			);
		});
	}

	render() {
		return (
			<div className="cart">
				<p className="cart__text">Il tuo Carrello</p>
				<div>{this.renderCartItems()}</div>
				<CartItem />
			</div>
		);
	}
}
export default compose(
	graphql(getCheckout, {
		props: ({ data: { checkout } }) => ({
			checkout
		})
	})
)(Cart);
