import gql from "graphql-tag";
import CheckoutFragment from "../fragment/checkoutFragment";

export default gql`
  mutation checkoutLineItemsUpdate(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemUpdateInput!]!
  ) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      userErrors {
        message
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;
