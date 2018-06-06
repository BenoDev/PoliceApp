import React, { Component } from "react";
import loginCustomer from "../../utils/loginCustomer";
import { Formik } from "formik";
import { compose, graphql } from "react-apollo";
import getCheckout from "../../apollo/client/queries/getCheckout";
import customerAccesTokenCreate from "../../apollo/server/mutations/customerAccessTokenCreate";
import checkoutCustomerAssociate from "../../apollo/server/mutations/checkoutCustomerAssociate";
import { Link } from "react-router-dom";

class LoginForm extends Component {
	onLoginSubmit = async (values, { setSubmitting, setErrors }) => {
		const input = {
			email: values.email,
			password: values.password
		};

		const res = await this.props.customerAccesTokenCreate({
			variables: { input }
		});

		if (res.data.customerAccessTokenCreate.customerAccessToken) {
			const customerAccessToken =
				res.data.customerAccessTokenCreate.customerAccessToken
					.accessToken;

			await this.props.checkoutCustomerAssociate({
				variables: {
					checkoutId: this.props.checkout.id,
					customerAccessToken
				}
			});

			localStorage.setItem(
				"auth-token",
				JSON.stringify(customerAccessToken)
			);
			setSubmitting(false);

			//redirect to home page
			this.props.history.push("/");
		} else {
			// res.data.customerAccessTokenCreate.userErrors.forEach(error => {
			// 	console.log(error);
			// });
			setErrors({ password: "Username e/o password non corretti" });
			setSubmitting(false);
		}
	};

	render() {
		return (
			<div className="login">
				<h1>Registrati </h1>
				{/*
      The benefit of the render prop approach is that you have full access to React's
      state, props, and composition model. Thus there is no need to map outer props
      to values...you can just set the initial values, and if they depend on props / state
      then--boom--you can directly access to props / state.

      The render prop accepts your inner form component, which you can define separately or inline
      totally up to you:
      - `<Formik render={props => <form>...</form>}>`
      - `<Formik component={InnerForm}>`
      - `<Formik>{props => <form>...</form>}</Formik>` (identical to as render, just written differently)
    */}
				<Formik
					onSubmit={this.onLoginSubmit}
					initialValues={{
						email: "",
						password: ""
					}}
					validate={values => {
						// same as above, but feel free to move this into a class method now.
						let errors = {};
						if (!values.email) {
							errors.email = "Campo Email Obbligatorio";
						} else if (
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
								values.email
							)
						) {
							errors.email = "Email non valida";
						}
						return errors;
					}}
					render={({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting
					}) => (
						<form className="login__form" onSubmit={handleSubmit}>
							<label className="login__label">
								{"Email: "}

								<input
									className="login__input"
									type="email"
									name="email"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
							</label>
							{touched.email &&
								errors.email && (
									<div className="login__error">
										{errors.email}
									</div>
								)}
							<label className="login__label">
								{"Password: "}

								<input
									className="login__input"
									type="password"
									name="password"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
								/>
							</label>
							{touched.password &&
								errors.password && (
									<div className="login__error">
										{errors.password}
									</div>
								)}
							<button
								className="login__button"
								type="submit"
								disabled={isSubmitting}
							>
								Submit
							</button>
							<div className="login__forgot">
								<Link to="/forgotpassword">
									Hai dimenticato la password?
								</Link>
							</div>
						</form>
					)}
				/>
			</div>
		);
	}
}

export default compose(
	graphql(customerAccesTokenCreate, { name: "customerAccesTokenCreate" }),
	graphql(checkoutCustomerAssociate, {
		name: "checkoutCustomerAssociate"
	}),
	graphql(getCheckout, {
		props: ({ data: { checkout } }) => ({
			checkout
		})
	})
)(LoginForm);
