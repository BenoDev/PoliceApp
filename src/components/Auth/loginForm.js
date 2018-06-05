import React, { Component } from "react";
import loginCustomer from "../../utils/loginCustomer";
import { Formik } from "formik";
import { compose, graphql } from "react-apollo";
import getCheckout from "../../apollo/client/queries/getCheckout";
import customerAccesTokenCreate from "../../apollo/server/mutations/customerAccessTokenCreate";
import checkoutCustomerAssociate from "../../apollo/server/mutations/checkoutCustomerAssociate";

class LoginForm extends Component {
	onLoginSubmit = async (values, { setSubmitting, setErrors }) => {
		const input = {
			email: values.email,
			password: values.password
		};

		const res = await this.props.customerAccesTokenCreate({
			variables: { input }
		});

		const customerAccessToken =
			res.data.customerAccessTokenCreate.customerAccessToken.accessToken;

		if (customerAccessToken) {
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
		} else {
			res.data.customerAccessTokenCreate.userErrors.forEach(error => {
				console.log(error);
			});
		}
	};

	render() {
		return (
			<div>
				<h1>Sign In</h1>
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
						<form onSubmit={handleSubmit}>
							<label>
								{"Email: "}

								<input
									type="email"
									name="email"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
							</label>
							{touched.email &&
								errors.email && <div>{errors.email}</div>}
							<input
								type="password"
								name="password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
							/>
							{touched.password &&
								errors.password && <div>{errors.password}</div>}
							<button type="submit" disabled={isSubmitting}>
								Submit
							</button>
						</form>
					)}
				/>
			</div>
		);
	}
}

export default compose(
	graphql(customerAccesTokenCreate, { name: "customerAccesTokenCreate" }),
	graphql(checkoutCustomerAssociate, { name: "checkoutCustomerAssociate" }),
	graphql(getCheckout, {
		props: ({ data: { checkout } }) => ({
			checkout
		})
	})
)(LoginForm);
