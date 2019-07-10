import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';

// Import Firebase auth and state store
import fire from '../config/Fire';
import store from '../Store';

// Import Redux actions
import authRevoke from '../actions/authRevoke';

// Import style components
import cover from '../home-image.jpg';

class Login extends Component {
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
            <h1 className="display-4" style={{ paddingTop: "30vh" }}>Login</h1>
            <p className="lead">Login with your email address, or <Link to='/signup'>sign up.</Link></p>
            <Formik 
              initialValues={{ email: '', password: '' }}
              validate={values => {
                let errors = {};
                if (!values.email) {
                  errors.email = 'Required';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                return errors;
              }}
              onSubmit={(values,actions) => {
                fire.auth().signInWithEmailAndPassword(values.email, values.password)
                  .then(cred => {
                    // Re-enable submit button for future
                    actions.setSubmitting(false);
                  })
                  .catch(err => {
                    // Re-enable submit button for future
                    actions.setSubmitting(false);

                    // Revoke auth
                    store.dispatch(authRevoke());

                    // Log error info
                    console.log(err.code);
                    alert(err.message);
                  })
              }}
              render={({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <Field className="form-control mt-2" type="email" name="email" placeholder="Email"/>
                    {errors.email && touched.email && <div>{errors.email}</div>}
                    
                    <Field className="form-control mt-2" type="password" name="password" placeholder="Password"/>
                    
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

const mapStateToProps = state => {
  return {
    uid: state.ui.user.uid,
    email: state.ui.email,
    password: state.ui.password
  }
}

export default connect(mapStateToProps)(Login)