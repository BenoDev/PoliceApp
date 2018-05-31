import React, { Component } from "react";
import MiniCartItem from "./miniCartItem";
import { Scrollbars } from "react-custom-scrollbars";

import { graphql, compose } from "react-apollo";

// import getCartStatus from '../../apollo/client/queries/getCartStatus';
import getCheckout from "../../apollo/client/queries/getCheckout";

class MiniCart extends Component {
	renderCartItems() {
		console.log(this.props);
		if (!this.props.checkout.id) {
			return <div>Server Error plese try again</div>;
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
				<MiniCartItem
					key={id}
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
			<div className="mini-cart" onMouseLeave={this.props.switchCart}>
				<Scrollbars
					style={{
						width: "100%",
						height: "20rem",
						position: "relative",
						backgroundColor: "#bbb"
					}}
				>
					<div className="mini-cart__product">
						{this.renderCartItems()}
					</div>
				</Scrollbars>
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
)(MiniCart);
