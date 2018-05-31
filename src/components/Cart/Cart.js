import React, { Component } from "react";
import CartItem from "./cartItem";
import { graphql, compose } from "react-apollo";
import getCheckout from "../../apollo/client/queries/getCheckout";
import CheckoutLineItemsRemove from "../../apollo/server/mutations/checkoutLineItemsRemove.js";
import CheckoutLineItemsUpdate from "../../apollo/server/mutations/checkoutLineItemsUpdate.js";
import UpdateCheckout from "../../apollo/client/mutations/updateCheckout";

class Cart extends Component {
	removeItem = async (checkoutId, lineItemId) => {
		const res = await this.props.checkoutLineItemsRemove({
			variables: {
				checkoutId: checkoutId,
				lineItemIds: [lineItemId]
			}
		});

		const data = res.data.checkoutLineItemsRemove.checkout;

		this.props.updateCheckout({ variables: { checkout: { data } } });
	};

	updateItem = async (checkoutId, id, quantity) => {
		console.log(quantity);

		const res = await this.props.checkoutLineItemsUpdate({
			variables: {
				checkoutId: checkoutId,
				lineItems: [{ id, quantity }]
			}
		});

		console.log(res, "cart response");

		const data = res.data.checkoutLineItemsUpdate.checkout;

		await this.props.updateCheckout({ variables: { checkout: { data } } });

		console.log(this.props.checkout);
	};

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
				id,
				title,
				quantity,
				variant: {
					price,
					image: { originalSrc }
				}
			} = lineItem.node;
			return (
				<CartItem
					key={id}
					removeItem={() =>
						this.removeItem(this.props.checkout.id, id)
					}
					updateItem={quantity =>
						this.updateItem(this.props.checkout.id, id, quantity)
					}
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
	graphql(CheckoutLineItemsRemove, { name: "checkoutLineItemsRemove" }),
	graphql(CheckoutLineItemsUpdate, { name: "checkoutLineItemsUpdate" }),
	graphql(UpdateCheckout, { name: "updateCheckout" }),

	graphql(getCheckout, {
		props: ({ data: { checkout } }) => ({
			checkout
		})
	})
)(Cart);
