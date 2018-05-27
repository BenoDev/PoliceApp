import gql from 'graphql-tag';

export default gql`
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
