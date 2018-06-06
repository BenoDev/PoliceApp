import gql from "graphql-tag";
import CheckoutFragment from "../fragment/checkoutFragment";


export default gql`
	query RecoverQuery($id: ID!) {
		node(id: $id) {
			id
			... on Checkout {
			...CheckoutFragment
			}
		}
	}
	${CheckoutFragment}
`;
