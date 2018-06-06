import UpdateCheckoutResolver from './updateCheckoutResolver';
import SwitchCartResolver from './switchCartResolver';
import CustomerAuthResolver from './customerAuthResolver';

export default {
	Mutation: {
		updateCheckout: UpdateCheckoutResolver,
		switchCart : SwitchCartResolver,
		customerAuth: CustomerAuthResolver
	}
};
