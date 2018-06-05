import gql from "graphql-tag";

export default gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      userErrors {
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;
