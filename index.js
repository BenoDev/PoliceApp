import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import client from './utils/apollo';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);
registerServiceWorker();
