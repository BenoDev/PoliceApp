import query from "../client/queries/getCheckout";

export default (_, { checkout }, { cache }) => {
	const previousState = cache.readQuery({ query });

	const data = {
		checkout: {
			...previousState.checkout,
			...checkout.data
		}
	};
	console.log(data, "resolver  update checkout data");

	cache.writeData({ query, data });

	console.log(cache.readQuery({ query }), "resolver");
	return null;
};
