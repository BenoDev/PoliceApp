import UpdateCheckoutResolver from './updateCheckoutResolver';
import switchCartResolver from './switchCartResolver';

export default {
	Mutation: {
		updateCheckout: UpdateCheckoutResolver,
		switchCart : switchCartResolver
	}
};
