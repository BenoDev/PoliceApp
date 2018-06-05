import gql from "graphql-tag";
import CheckoutFragment from "./checkoutFragment";

export default gql`
	mutation checkoutCreate($input: CheckoutCreateInput!) {
		checkoutCreate(input: $input) {
			checkout {
				...CheckoutFragment
			}
		}
	}
	${CheckoutFragment}
`;
