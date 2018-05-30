import React, { Component } from 'react';
import MiniCartItem from './miniCartItem';
import { Scrollbars } from 'react-custom-scrollbars';

import { graphql, compose } from 'react-apollo';

import getCartStatus from '../../apollo/client/queries/getCartStatus';
import getCheckout from '../../apollo/client/queries/getCheckout';

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
			<Scrollbars
				style={{
					width: '20rem',
					height: '20rem',
					position: 'fixed',
					zIndex: 20,
					top: '8rem',
					right: '0',
					backgroundColor: '#bbb'
				}}
			>
				<div className="mini-cart">{this.renderCartItems()}</div>
			</Scrollbars>
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
