import gql from 'graphql-tag';

const CheckoutFragment = gql`
  fragment CheckoutFragment on Checkout {
    id
    webUrl
    totalTax
    subtotalPrice
    totalPrice
    lineItems(first: 250) {
      edges {
        node {
          id
          title
          variant {
            id
            title
            image {
              src
            }
            price
          }
          quantity
        }
      }
    }
  }
`;

export default gql`
  mutation checkoutLineItemsAdd(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemInput!]!
  ) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
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
