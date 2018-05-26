import React, { Component } from 'react';
import { Query } from 'react-apollo';

import gql from 'graphql-tag';

import ProductPreview from '../products/productPreview';

class Shop extends Component {
	onProductClick = id => {
		this.props.history.push(`/product/${id}`);
	};

	renderProductsList() {
		return (
			<Query notifyOnNetworkStatusChange query={PRODUCT_LIST}>
				{({ loading, error, data }) => {
					if (loading) return 'Loading...';
					if (error) return `Error! ${error.message}`;
					return data.shop.products.edges.map(product => {
						console.log(product.node.id);
						return (
							<ProductPreview
								key={product.node.id}
								image={
									product.node.images.edges[0].node
										.originalSrc
								}
								description={product.node.title}
								price={
									product.node.variants.edges[0].node.price
								}
								onClickProduct={() =>
									this.onProductClick(product.node.id)
								}
							/>
						);
					});
				}}
			</Query>
		);
	}

	render() {
		return (
			<div>
				<div className="shop-container">
					{this.renderProductsList()}
				</div>
			</div>
		);
	}
}

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

export default Shop;
