import { ApolloLink, concat } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const shopLink = new HttpLink({
	uri: 'https://graphql.myshopify.com/api/graphql',
	credentials: 'same-origin',
	fetch
});
const shopCache = new InMemoryCache({
	dataIdFromObject: o => o.id
});

const shopifyMiddleware = setContext(() => ({
	// add the authorization to the headers
	headers: {
		'X-Shopify-Storefront-Access-Token': 'dd4d4dc146542ba7763305d71d1b3d38'
	}
}));

const client = new ApolloClient({
	link: concat(shopifyMiddleware, shopLink),
	cache: shopCache
});

export default client;
