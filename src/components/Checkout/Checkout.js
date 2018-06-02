import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, Query, graphql, compose } from "react-apollo";

import updateCheckout from "../../apollo/client/mutations/updateCheckout";
import getCheckout from "../../apollo/client/queries/getCheckout";
import createCheckout from "../../apollo/server/mutations/createCheckout";

class Checkout extends Component {
	componentDidUpdate() {
		console.log(this.props.checkout.id, "Checkout Test");
	}
	render() {
		return (
			<div>
				<Query
					query={RecoverQuery}
					variables={{
						id: this.props.checkout.id
					}}
				>
					{(loading, error, data) => {
						console.log(loading, error, data, "QueryOpOP");
						if (loading) return "Loading...";
						if (error) return `Error! ${error.message}`;
						return <div>{data.webUrl}</div>;
					}}
				</Query>
			</div>
		);
	}
}

export default compose(
	graphql(createCheckout, { name: "createCheckout" }),
	graphql(updateCheckout, { name: "updateCheckout" }),
	graphql(getCheckout, {
		props: ({ data: { checkout } }) => ({
			checkout
		})
	})
)(Checkout);

const RecoverQuery = gql`
	query RecoverQuery($id: ID!) {
		node(id: $id) {
			id
			... on Checkout {
				id
				webUrl
			}
		}
	}
`;
