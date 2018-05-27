import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation, Query, graphql, compose } from 'react-apollo';

import updateCheckout from '../../apollo/client/mutations/updateCheckout';
import getCheckout from '../../apollo/client/queries/getCheckout';
import createCheckout from '../../apollo/server/mutations/createCheckout';

class Checkout extends Component {
	componentDidMount() {
		this.initCheckout();
	}

	initCheckout = async () => {
		const res = await this.props.createCheckout({
			variables: { input: {} }
		});
		// console.log(res.data.checkoutCreate.checkout);
		const data = res.data.checkoutCreate.checkout;
		const resolverData = await this.props.updateCheckout({
			variables: { checkout: { data } }
		});

		console.log(resolverData, 'Hi');
	};

	render() {
		return <div />;
	}
}

export default compose(
	graphql(createCheckout, { name: 'createCheckout' }),
	graphql(updateCheckout, { name: 'updateCheckout' }),
	graphql(getCheckout, {
		props: ({ data: { checkout } }) => ({
			checkout
		})
	})
)(Checkout);
