import gql from "graphql-tag";

export default gql`
  fragment OrderFragment on Order {
    currencyCode
    customerLocale
    customerUrl
    email
    id
    lineItems(first: 250) {
      edges {
        node {
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
    orderNumber
    phone
    processedAt
    shippingAddress {
      formatted
    }
    statusUrl
    subtotalPrice
    totalPrice
    totalPrice
    totalRefunded
    totalShippingPrice
    totalTax
  }
`;
