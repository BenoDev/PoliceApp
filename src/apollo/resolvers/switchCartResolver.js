import gql from 'graphql-tag';
import query from '../client/queries/getCartStatus';

export default (_,value, { cache }) => {
	const previousState = cache.readQuery({ query });

	const data = {
		cart: {
			...previousState.cart,
			isOpen : !previousState.cart.isOpen
		}
	};

	cache.writeData({ query, data });
	console.log(cache.readQuery({ query }), 'resolver Switch Cart');
	return null;
};