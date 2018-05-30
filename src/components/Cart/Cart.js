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
			return <div>Errore Caricamento Carrello</div>;
		}
		if (this.props.checkout.lineItems.edges.length < 1) {
			return <div>Il tuo Carrello è vuoto</div>;
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
				<div className="cart__head">
					<span className="cart__head--item cart__head--item-1">
						Articolo
					</span>
					<span className="cart__head--item cart__head--item-2">
						Taglia
					</span>
					<span className="cart__head--item cart__head--item-3">
						Colore
					</span>
					<span className="cart__head--item cart__head--item-4">
						Unità
					</span>
					<span className="cart__head--item cart__head--item-5">
						Prezzo
					</span>
				</div>
				<div>{this.renderCartItems()}</div>
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
