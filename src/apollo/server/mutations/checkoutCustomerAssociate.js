import gql from "graphql-tag";
import CheckoutFragment from "../fragment/checkoutFragment";

export default gql`
  mutation checkoutCustomerAssociate(
    $checkoutId: ID!
    $customerAccessToken: String!
  ) {
    checkoutCustomerAssociate(
      checkoutId: $checkoutId
      customerAccessToken: $customerAccessToken
    ) {
      userErrors {
        field
        message
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;
