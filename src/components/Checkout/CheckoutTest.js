import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import updateCheckout from '../../graphql/updateCheckout';

class Checkout extends Component {
	// componentDidMount() {
	// 	<Mutation
	// 		mutation={CREATE_CHECKOUT}
	// 		update={(cache, { data: { checkoutCreate } }) => {
	// 			const { checkout } = cache.readQuery({ query: GET_CHECKOUT });
	// 			cache.writeQuery({
	// 				query: GET_CHECKOUT,
	// 				data: { checkout: { id: 555 } }
	// 			});
	// 		}}
	// 	>
	// 		{checkoutCreate => {
	// 			return <div>Hi</div>;
	// 		}}
	// 	</Mutation>;
	// }

	myfunc(cache, { data }) {
		console.log(data, cache);
	}
	render() {
		return (
			<div>
				<Mutation mutation={updateCheckout}>
					{updateCheckout => {
						return (
							<button
								onClick={() =>
									updateCheckout({
										variables: { checkout: '1' }
									})
								}
							>
								CLick me
							</button>
						);
					}}
				</Mutation>
				<Mutation mutation={CREATE_CHECKOUT} update={this.myfunc}>
					{(checkoutCreate, { data }) => {
						checkoutCreate({ variables: { input: {} } });
						return <div>{console.log(data)}</div>;
					}}
				</Mutation>;
				<Query query={GET_CHECKOUT}>
					{({ data: { checkout } }) => <div>{checkout.id}</div>}
				</Query>
			</div>
		);
	}
}

const CREATE_CHECKOUT = gql`
	mutation checkoutCreate($input: CheckoutCreateInput!) {
		checkoutCreate(input: $input) {
			checkout {
				id
				webUrl
				lineItems(first: 5) {
					edges {
						node {
							title
							quantity
						}
					}
				}
			}
		}
	}
`;

const GET_CHECKOUT = gql`
	query {
		checkout @client {
			id
			webUrl
		}
	}
`;

export default Checkout;
