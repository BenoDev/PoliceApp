import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style/main.css";

import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import ShopPage from "./components/Shop/Shop";
import ProductPage from "./components/ProductPage/ProductPage";
import Cart from "./components/Cart/Cart";
import MiniCart from "./components/Cart/MiniCart";
import Order from "./components/Order/Order";
import Checkout from "./components/Checkout/Checkout";

import LoginForm from "./components/Auth/loginForm";
import SignupForm from "./components/Auth/signupForm";

import { Query, graphql, compose, withApollo } from "react-apollo";

import updateCheckout from "./apollo/client/mutations/updateCheckout";
import setCustomer from "./apollo/client/mutations/setCustomer";

import getCheckout from "./apollo/client/queries/getCheckout";
import getCartStatus from "./apollo/client/queries/getCartStatus";
import getAuthToken from "./apollo/client/queries/getAuthToken";

import checkoutRecover from "./apollo/server/queries/checkoutRecover";
import getCustomer from "./apollo/server/queries/getCustomer";

import switchCart from "./apollo/client/mutations/switchCart";
import createCheckout from "./apollo/server/mutations/createCheckout";

class App extends Component {
	componentWillMount() {
		console.log(this.props);
		this.initCustomer();
		this.initCheckout();
	}

	initCustomer = async () => {
		const authToken = localStorage.getItem("auth-token");

		console.log(authToken, "User Token");

		if (authToken) {
			const res = await this.props.client.query({
				query: getCustomer,
				variables: {
					customerAccessToken: JSON.parse(authToken)
				}
			});
			if (res.data.customer) {
				//utente autorizzato
				await this.props.setCustomer({
					variables: {
						token: JSON.parse(authToken),
						customer: res.data.customer
					}
				});
			} else {
				await this.props.setCustomer({
					variables: {
						token: null
					}
				});
			}
			console.log(this.props.auth, "Jolly Cembaloo");
		}
	};

	initCheckout = async () => {
		const checkoutId = localStorage.getItem("checkoutId");

		if (checkoutId) {
			const res = await this.props.client.query({
				query: checkoutRecover,
				variables: {
					id: JSON.parse(checkoutId)
				}
			});
			console.log(res, "proviamo");

			if (res.data.node.id) {
				const resolverData = await this.props.updateCheckout({
					variables: { checkout: { data: res.data.node } }
				});
				return null;
			}
		}

		const res = await this.props.createCheckout({
			variables: { input: {} }
		});
		// console.log(res.data.checkoutCreate.checkout);
		const data = res.data.checkoutCreate.checkout;

		const resolverData = await this.props.updateCheckout({
			variables: { checkout: { data } }
		});

		localStorage.setItem("checkoutId", JSON.stringify(data.id));
	};

	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<Header
						switchCart={this.props.switchCart}
						auth={this.props.auth}
					/>
					{this.props.cart.isOpen ? (
						<MiniCart switchCart={this.props.switchCart} />
					) : null}
					<Switch>
						<Route
							exact
							path="/shop/:productType"
							component={ShopPage}
						/>
						<Route path="/shop" component={ShopPage} />
						<Route path="/product/:id" component={ProductPage} />
						<Route path="/cart" component={Cart} />
						<Route path="/checkout" component={Checkout} />
						<Route path="/login" component={LoginForm} />
						<Route path="/signup" component={SignupForm} />
						{this.props.auth.token ? (
							<Route path="/order" component={Order} />
						) : null}
						<Route path="/" component={HomePage} />
					</Switch>
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
		graphql(setCustomer, { name: "setCustomer" }),
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
		}),
		graphql(getAuthToken, {
			props: ({ data: { auth } }) => ({
				auth
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
