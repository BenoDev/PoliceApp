import gql from 'graphql-tag';
import query from '../client/queries/getCheckout';

export default (_, { checkout }, { cache }) => {
	const previousState = cache.readQuery({ query });

	const data = {
		checkout: {
			...checkout.data
		}
	};
	console.log(data, 'hi');

	cache.writeData({ query, data });
	console.log(cache.readQuery({ query }));
	return null;
};
