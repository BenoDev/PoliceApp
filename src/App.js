import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style/main.css";

import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import ShopPage from "./components/Shop/Shop";
import ProductPage from "./components/ProductPage/ProductPage";
import Cart from "./components/Cart/Cart";
import MiniCart from "./components/Cart/MiniCart";
import Checkout from "./components/Checkout/Checkout";

import { Query, graphql, compose, withApollo } from "react-apollo";

import updateCheckout from "./apollo/client/mutations/updateCheckout";
import getCheckout from "./apollo/client/queries/getCheckout";
import getCartStatus from "./apollo/client/queries/getCartStatus";
import createCheckout from "./apollo/server/mutations/createCheckout";
import checkoutRecover from "./apollo/server/queries/checkoutRecover";
import switchCart from "./apollo/client/mutations/switchCart";

class App extends Component {
	componentWillMount() {
		console.log(this.props);
		this.initCheckout();
	}

	initCheckout = async () => {
		const checkoutId = localStorage.getItem("checkoutId");

		if (checkoutId) {
			const res = await this.props.client.query({
				query: checkoutRecover,
				variables: {
					id: JSON.parse(checkoutId)
				}
			});

			console.log(res.data, "res datadsa");

			const resolverData = await this.props.updateCheckout({
				variables: { checkout: { data: res.data.node } }
			});

			// const ayaya = await this.props.client.query({
			// 	query: getCheckout
			// });
			// console.log(ayaya, "ayayaya");
			return null;
		}

		const res = await this.props.createCheckout({
			variables: { input: {} }
		});
		// console.log(res.data.checkoutCreate.checkout);
		const data = res.data.checkoutCreate.checkout;
		console.log(res, "Hieererdwee");

		const resolverData = await this.props.updateCheckout({
			variables: { checkout: { data } }
		});

		localStorage.setItem("checkoutId", JSON.stringify(data.id));
		console.log(resolverData, "Hieerere");
	};

	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<Header switchCart={this.props.switchCart} />
					{this.props.cart.isOpen ? (
						<MiniCart switchCart={this.props.switchCart} />
					) : null}
					<Route exact path="/" component={HomePage} />
					<Route
						exact
						path="/shop/:productType"
						component={ShopPage}
					/>
					<Route exact path="/shop" component={ShopPage} />
					<Route exact path="/product/:id" component={ProductPage} />
					<Route exact path="/cart" component={Cart} />
					<Route exact path="/checkout" component={Checkout} />
					<Footer />
					}
				</div>
			</BrowserRouter>
		);
	}
}

export default withApollo(
	compose(
		graphql(createCheckout, { name: "createCheckout" }),
		graphql(updateCheckout, { name: "updateCheckout" }),
		graphql(switchCart, { name: "switchCart" }),
		graphql(getCartStatus, {
			props: ({ data: { cart } }) => ({
				cart
			})
		}),
		graphql(getCheckout, {
			props: ({ data: { checkout } }) => ({
				checkout
			})
		})
	)(App)
);

// graphql(checkoutRecover, {
// 		options: () => ({
// 			variables: {
// 				checkoutId:
// 					"Z2lkOi8vc2hvcGlmeS9DaGVja291dC8zMWU5NDg5MTQwNDhmNWQwNDc1NjA4OWExMDQ3OGIxND9rZXk9Njk5MjYzYTY4YWNiNTVjMWEyYTZlNjIwYzM2ODk0ZjQ="
// 			}
// 		}),
// 		props: ({ data }) => ({
// 			checkout: data
// 		})
// 	})
