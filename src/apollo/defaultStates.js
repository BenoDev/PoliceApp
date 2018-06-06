export default {
	checkout: {
		__typename: "Checkout",
		id: null,
		webUrl: null,
		lineItems: null
	},
	cart: {
		__typename: "Cart",
		isOpen: true
	},
	auth: {
		__typename: "Auth",
		token: null,
		customer: null
	}
};
