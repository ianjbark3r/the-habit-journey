import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from "yup";

import fire from '../config/Fire';
import store from '../Store';

import authRevoke from '../actions/authRevoke';

import cover from '../home-image.jpg';

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, 'Too short!')
    .max(70, 'Too long! Please limit to 70 characters.')
    .required('Required')
})

export default class Login extends Component {
  render() {
    return (
      <div
        style={{ 
          backgroundImage:`url(${cover})`,
          backgroundPosition:"top",
          backgroundSize:"cover", 
          height:"100vh" 
        }}
        className="container-fluid"
      >
        <div className="row justify-content-center">
          <div className="col-lg-4 col-sm-6">
            <h1 className="display-4" style={{ paddingTop: "30vh" }}>Sign Up</h1>
            <p className="lead">Sign up, or <Link to='/login'>login</Link></p>
            <Formik 
              initialValues={{ 
                email: '', 
                password: '', 
                confirmPassword: '' 
              }}
              validationSchema={SignupSchema}
              validate={values => {
                let errors = {};
                if (!values.email) {
                  errors.email = 'Required';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                } else if (
                  values.password !== values.confirmPassword
                ) {
                  errors.confirmPassword = 'Passwords must match';
                }
                return errors;
              }}
              onSubmit={(values,actions) => {
                fire.auth().createUserWithEmailAndPassword(values.email, values.password)
                  .then(cred => {
                    actions.setSubmitting(false);
                  })
                  .catch(err => {
                    actions.setSubmitting(false);
                    store.dispatch(authRevoke());
                    console.log(err.code);
                    console.log(err.message);
                  })
              }}
              render={({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <Field className="form-control mt-2" type="email" name="email" placeholder="Email"/>
                    {errors.email && touched.email && <div>{errors.email}</div>}

                    <Field className="form-control mt-2" type="password" name="password" placeholder="Password"/>
                    {errors.password && touched.password && <div>{errors.password}</div>}
                    
                    <Field className="form-control mt-2" type="password" name="confirmPassword" placeholder="Confirm Password"/>
                    {errors.confirmPassword && touched.confirmPassword && <div>{errors.confirmPassword}</div>}
                    
                    <div className="row">
                      <div className="col text-right">
                        <button style={{ borderRadius:"100px", paddingLeft:"50px", paddingRight:"50px" }}  className="btn btn-primary mt-4 shadow-sm text-right" type="submit" disabled={isSubmitting}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
};