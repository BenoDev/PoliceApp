import gql from "graphql-tag";
import query from "../client/queries/getAuthToken";

export default (_, { token, customer }, { cache }) => {
	const previousState = cache.readQuery({ query });

	const data = {
		auth: {
			...previousState.auth,
			token: token,
			customer: customer
		}
	};

	cache.writeData({ query, data });
	console.log(cache.readQuery({ query }), "resolver Auth Token");
	return null;
};
