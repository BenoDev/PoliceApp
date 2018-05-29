import gql from 'graphql-tag';

export default gql`
	query GetCheckout {
		checkout @client {
			__typename
			id
			webUrl
			lineItems {
				edges {
					node {
						id
						title
						quantity
						variant {
							id
							title
							price
							image {
								id
								originalSrc
							}
						}
					}
				}
			}
		}
	}
`;
