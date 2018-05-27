import { ApolloLink, concat } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

import { withClientState } from 'apollo-link-state';

import resolvers from './resolvers';
import defaults from './defaultStates';

import gql from 'graphql-tag';

const shopLink = new HttpLink({
	uri: 'https://graphql.myshopify.com/api/graphql',
	credentials: 'same-origin'
});

const cache = new InMemoryCache({
	dataIdFromObject: o => o.id
});

const shopifyMiddleware = setContext(() => ({
	// add the authorization to the headers
	headers: {
		'X-Shopify-Storefront-Access-Token': 'dd4d4dc146542ba7763305d71d1b3d38'
	}
}));

const stateLink = withClientState({
	cache,
	defaults,
	resolvers
});

const client = new ApolloClient({
	link: new ApolloLink.from([stateLink, concat(shopifyMiddleware, shopLink)]),
	cache
});

export default client;
