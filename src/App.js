import './style/main.css';

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import ShopPage from './components/Shop/Shop';
import ProductPage from './components/ProductPage/ProductPage';
import Checkout from './components/Checkout/Checkout';

class App extends Component {
	componentWillMount() {}

	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<Header />
					<Route exact path="/" component={HomePage} />
					<Route exact path="/shop" component={ShopPage} />
					<Route exact path="/product/:id" component={ProductPage} />
					<Route exact path="/checkout" component={Checkout} />
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
