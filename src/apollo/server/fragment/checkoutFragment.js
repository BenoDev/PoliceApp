import gql from "graphql-tag";

export default gql`
  fragment CheckoutFragment on Checkout {
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
`;
