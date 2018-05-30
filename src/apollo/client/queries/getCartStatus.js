import gql from 'graphql-tag';

export default gql`
	query getCartStatus {
		cart @client {
			isOpen
		}
	}
`;
