import gql from "graphql-tag";

export default gql`
  fragment AddressFragment on MailingAddress {
    id
    address1
    address2
    city
    company
    country
    countryCodeV2
    firstName
    lastName
    name
    provinceCode
    zip
    formatted
    formattedArea
  }
`;
