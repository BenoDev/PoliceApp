import gql from "graphql-tag";

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
        id
        webUrl
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                title
                price
                image {
                  id
                  originalSrc
                }
              }
            }
          }
        }
      }
    }
  }
`;
