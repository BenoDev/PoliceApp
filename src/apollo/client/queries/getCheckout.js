import gql from 'graphql-tag';

export default gql`
	query GetCheckout {
		checkout @client {
			__typename
			id
			webUrl
		}
	}
`;
