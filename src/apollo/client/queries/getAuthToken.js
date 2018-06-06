import gql from "graphql-tag";

export default gql`
	query getAuthToken {
		auth @client {
			__typename
			token
			customer {
				id
				email
				acceptsMarketing
				firstName
				lastName
				displayName
				phone
				updatedAt
				defaultAddress
				addresses
				orders
			}
		}
	}
`;
