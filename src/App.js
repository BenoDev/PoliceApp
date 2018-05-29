import './style/main.css';

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import ShopPage from './components/Shop/Shop';
import ProductPage from './components/ProductPage/ProductPage';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';

import { graphql, compose } from 'react-apollo';

import updateCheckout from './apollo/client/mutations/updateCheckout';
// import getCheckout from '../../apollo/client/queries/getCheckout';
import createCheckout from './apollo/server/mutations/createCheckout';

class App extends Component {
	componentDidMount() {
		this.initCheckout();
	}

	initCheckout = async () => {
		const res = await this.props.createCheckout({
			variables: { input: {} }
		});
		// console.log(res.data.checkoutCreate.checkout);
		const data = await res.data.checkoutCreate.checkout;

		const resolverData = await this.props.updateCheckout({
			variables: { checkout: { data } }
		});

		console.log(resolverData, 'Hi');
	};

	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<Header />
					<Route exact path="/" component={HomePage} />
					<Route exact path="/shop" component={ShopPage} />
					<Route exact path="/product/:id" component={ProductPage} />
					<Route exact path="/cart" component={Cart} />
					<Route exact path="/checkout" component={Checkout} />
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

export default compose(
	graphql(createCheckout, { name: 'createCheckout' }),
	graphql(updateCheckout, { name: 'updateCheckout' })
)(App);
