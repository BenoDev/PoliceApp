import gql from "graphql-tag";

export default gql`
	mutation customerAuth($token: String, $customer: Customer) {
		customerAuth(token: $token, customer: $customer) @client
	}
`;
