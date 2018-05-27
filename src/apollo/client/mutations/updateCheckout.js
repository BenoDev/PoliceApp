import gql from 'graphql-tag';

export default gql`
	mutation updateCheckout($checkout: Checkout!) {
		updateCheckout(checkout: $checkout) @client
	}
`;
