import React, { Component } from "react";
import { Formik } from "formik";

import { graphql, compose } from "react-apollo";
import customerCreate from "../../apollo/server/mutations/customerCreate";

class SignupForm extends Component {
  handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const input = {
      email: values.email,
      password: values.password
    };

    const res = await this.props.customerCreate({
      variables: { input }
    });

    console.log(res, "customre create res");

    if (res.data.customerCreate.customer) {
      console.log(res.data.customerCreate.customer, "Customer creato");
    } else {
      res.data.customerCreate.userErrors.forEach(error => {
        if (error.field) {
          console.log(error.field);
        } else {
          console.log(error.message);
        }
      });
    }

    console.log(input, "Signup");
  };
  render() {
    return (
      <div>
        <h1>Registrazione</h1>
        <p>This can be anywhere in your application</p>
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
          onSubmit={this.handleSubmit}
          initialValues={{
            email: "",
            password: "",
            passwordConfirm: ""
          }}
          validate={values => {
            // same as above, but feel free to move this into a class method now.
            let errors = {};
            if (!values.email) {
              errors.email = "Inserire Email";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Email non valida";
            }

            if (values.password.length < 5) {
              errors.password = "Lunghezza minima password 5 caratteri";
            }

            if (values.password !== values.passwordConfirm) {
              errors.passwordConfirm = "Le password devono coincidere";
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
              <div>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </label>
                {touched.email && errors.email && <div>{errors.email}</div>}
              </div>

              <div>
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {touched.password &&
                    errors.password && <div>{errors.password}</div>}
                </label>
              </div>
              <div>
                <label>
                  Conferma password:
                  <input
                    type="password"
                    name="passwordConfirm"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordConfirm}
                  />
                  {touched.passwordConfirm &&
                    errors.passwordConfirm && (
                      <div>{errors.passwordConfirm}</div>
                    )}
                </label>
              </div>

              <div>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </form>
          )}
        />
      </div>
    );
  }
}

export default compose(graphql(customerCreate, { name: "customerCreate" }))(
  SignupForm
);
