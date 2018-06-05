import customerAccesTokenCreate from "../apollo/server/mutations/customerAccessTokenCreate";
import checkoutCustomerAssociate from "../apollo/server/mutations/checkoutCustomerAssociate";
import { withApollo } from "react-apollo";

const loginCustomer = async (email, password, checkoutId, { client }) => {
  const input = {
    email: email,
    password: password
  };

  const res = await customerAccesTokenCreate({
    variables: { input }
  });

  const customerAccessToken =
    res.data.customerAccessTokenCreate.customerAccessToken;

  if (customerAccessToken) {
    await checkoutCustomerAssociate({
      variables: {
        checkoutId,
        customerAccessToken
      }
    });

    localStorage.setItem("auth-token", JSON.stringify(customerAccessToken));
  } else {
    res.data.customerAccessTokenCreate.userErrors.forEach(error => {
      console.log(error);
    });
  }
};

export default withApollo(loginCustomer);
