import gql from "graphql-tag";

export default gql`
	query RecoverQuery($id: ID!) {
		node(id: $id) {
			id
			... on Checkout {
				id
				webUrl
				lineItems(first: 5) {
					edges {
						node {
							id
							title
							quantity
							variant {
								id
								title
								image {
									id
									originalSrc
								}
								price
							}
						}
					}
				}
			}
		}
	}
`;
