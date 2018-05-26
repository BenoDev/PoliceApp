import React, { Component } from 'react';

import HeroSection from './hero-section';
import FeatureSection from './feature-section';
import CategoriesSection from './categories-section';

class App extends Component {
	render() {
		return (
			<div>
				<HeroSection />
				<FeatureSection />
				<CategoriesSection />
			</div>
		);
	}
}

// <Query notifyOnNetworkStatusChange query={query}>
// 				{({ loading, error, data }) => {
// 					console.log(data);
// 					if (loading) return 'Loading...';
// 					if (error) return `Error! ${error.message}`;

// 					return <div>{data.shop.products.edges[0].node.title}</div>;
// 				}}
// 			</Query>

export default App;
