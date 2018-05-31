import gql from 'graphql-tag';


export default gql`
  mutation checkoutLineItemsRemove ($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
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
