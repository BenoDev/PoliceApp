import gql from "graphql-tag";
import CustomerFragment from "../fragment/customerFragment";

export default gql`
	query getCustomer($customerAccessToken: String!) {
		customer(customerAccessToken: $customerAccessToken) {
			...CustomerFragment
		}
	}
	${CustomerFragment}
`;
