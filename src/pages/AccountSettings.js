import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as Yup from "yup";

// Import Firebase auth and state store
import fire from '../config/Fire';
import firebase from 'firebase';
import store from '../Store';

// Import Redux actions
import redirect from '../actions/redirect';
import redirectClear from '../actions/redirectClear';
import tutorialReset from '../actions/tutorialReset';

const SignupSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(5, 'Too short!')
    .max(70, 'Too long! Please limit to 70 characters.')
    .required('Required')
})

class AccountSettings extends Component {
  handleClick(e) {
    e.preventDefault();

    store.dispatch(tutorialReset());

    // API call to update user preferences
    axios.put(`https://us-central1-the-habit-journey.cloudfunctions.net/app/api/v1/account`, {
      uid: this.props.uid,
      tutorial: {
        active: this.props.tutorial.active.concat(this.props.tutorial.dismissed),
        dismissed: []
      }
    })
      .then(() => {
        alert("Tutorial tips reset!")
      })
  }

  render() {
    if (this.props.redirecting) {
      return <Redirect to="/dashboard"/>
    } else {
      return (
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-sm-6">
              <h1 style={{ paddingTop: "15vh" }} className="display-4">
                Account Settings
              </h1>
              <hr />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-sm-6">
              <h2 className="mb-4">
                General
              </h2>
              <div className="row justify-content-between">
                <div className="col-auto mt-2">
                  <p>
                    Reset tutorial messages
                  </p>
                </div>
                <div className="col-auto text-right">
                  <button
                    style={{ 
                      borderRadius:"100px", 
                      paddingLeft:"25px", 
                      paddingRight:"25px" 
                    }}  
                    className="btn btn-sm btn-outline-danger"
                    onClick={e => this.handleClick(e)}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div style={{ paddingBottom:"10vh", paddingTop:"10vh" }} className="row justify-content-center">
            <div className="col-lg-4 col-sm-6">
              <h2>
                Change Password
              </h2>
              <Formik 
                initialValues={{
                  email: this.props.email,
                  oldPassword: '', 
                  newPassword: '', 
                  confirmPassword: '' 
                }}
                validationSchema={SignupSchema}
                validate={values => {
                  let errors = {};
                  if (
                    values.newPassword !== values.confirmPassword
                  ) {
                    errors.confirmPassword = 'Passwords must match';
                  }
                  return errors;
                }}
                onSubmit={(values,actions) => {
                  let cred = firebase.auth.EmailAuthProvider.credential(
                    values.email,
                    values.oldPassword
                  )                  

                  fire.auth().currentUser.reauthenticateWithCredential(cred)
                    .then(cred => {
                      fire.auth().currentUser.updatePassword(values.newPassword)
                        .then(cred => {
                          store.dispatch(redirect());

                          // Re-enable submit button for future
                          actions.setSubmitting(false);

                          alert("Password has been changed!");

                          store.dispatch(redirectClear());
                        })
                        .catch(err => {
                          // Re-enable submit button for future
                          actions.setSubmitting(false);

                          // Log error info
                          console.log(err.code);
                          alert(err.message);
                        })
                    })
                    .catch(err => {
                      // Re-enable submit button for future
                      actions.setSubmitting(false);

                      // Log error info
                      console.log(err.code);
                      alert(err.message);
                    })
                }}
                render={({ errors, touched, isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <Field 
                        className="form-control mt-4" 
                        type="password" 
                        name="oldPassword" 
                        placeholder="Old password"
                      />
                      <p className="mt-3 ml-1">Passwords must be at least 5 characters long.</p>
                      <Field 
                        className="form-control mt-2" 
                        type="password" 
                        name="newPassword" 
                        placeholder="New password"
                      />
                      {errors.newPassword && touched.newPassword && <div>{errors.newPassword}</div>}
                      
                      <Field 
                        className="form-control mt-2" 
                        type="password" 
                        name="confirmPassword" 
                        placeholder="Confirm password"
                      />
                      {errors.confirmPassword && touched.confirmPassword && <div>{errors.confirmPassword}</div>}
                      
                      <div className="row">
                        <div className="col text-right">
                          <button 
                            style={{ 
                              borderRadius:"100px", 
                              paddingLeft:"25px", 
                              paddingRight:"25px" 
                            }}  
                            className="btn btn-primary mt-4 shadow-sm text-right" 
                            type="submit" 
                            disabled={isSubmitting}
                          >
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
  }
};

const mapStateToProps = state => {
  return {
    cred: state.ui.user,
    email: state.ui.user.email,
    redirecting: state.ui.redirecting,
    tutorial: state.tutorial,
    uid: state.ui.user.uid
  }
}

export default connect(mapStateToProps)(AccountSettings)