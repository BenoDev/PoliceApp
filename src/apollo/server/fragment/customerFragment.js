import gql from "graphql-tag";
import AddressFragment from "./addressFragment";
import OrderFragment from "./orderFragment";

export default gql`
  fragment CustomerFragment on Customer {
    id
    email
    acceptsMarketing
    firstName
    lastName
    displayName
    phone
    updatedAt
    defaultAddress {
      ...AddressFragment
    }
    addresses(first: 250) {
      edges {
        node {
          ...AddressFragment
        }
      }
    }
    orders(first: 250) {
      edges {
        node {
          ...OrderFragment
        }
      }
    }
  }
  ${AddressFragment}
  ${OrderFragment}
`;
