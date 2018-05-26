import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const PRODUCT_LIST = gql`
	query {
		shop {
			products(first: 20) {
				edges {
					node {
						id
						title
						variants(first: 1) {
							edges {
								node {
									price
								}
							}
						}
						images(first: 1) {
							edges {
								node {
									originalSrc
								}
							}
						}
					}
				}
			}
		}
	}
`;

export default () => {
	return (
		<Query notifyOnNetworkStatusChange query={PRODUCT_LIST}>
			{({ loading, error, data }) => {
				console.log(data);
				if (loading) return 'Loading...';
				if (error) return `Error! ${error.message}`;
				return <div>Ciao</div>;
			}}
		</Query>
	);
};
