import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';

// Import state store
import store from '../Store';

// Import Redux actions
import createStack from '../actions/createStack';
import createStackCancel from '../actions/createStackCancel';
import createStackConfirm from '../actions/createStackConfirm';
import redirect from '../actions/redirect';
import redirectClear from '../actions/redirectClear';

class CreateStack extends Component {
  render() {
    // Conditional render to handle redirect after stack creation
    if (this.props.redirecting) {
      return <Redirect to="/dashboard"/>
    } else {
      return (
        <div className="container-fluid">
          <div className="row justify-content-center" style={{ marginTop: "15vh" }}>
            <div className="col-sm-5">
              <Formik
                initialValues={{ 
                  name: '',
                  type: 'stack',
                  first_habit: '',
                  time: '',
                  location: '',
                  data: []
                }}
                onSubmit={(values, actions) => {
                  // Disable submit button
                  actions.setSubmitting(true);

                  // Async create stack request start
                  store.dispatch(createStack());

                  const uid = this.props.uid;

                  // API call
                  axios.post(`https://us-central1-the-habit-journey.cloudfunctions.net/app/api/stacks/`, {
                    uid: uid,
                    data: values
                  })
                  .then(res => {
                    if (res.status === 201) {
                      // Update state with returned data
                      store.dispatch(createStackConfirm({
                        id: res.data.id,
                        name: values.name,
                        type: 'stack',
                        first_habit: values.first_habit,
                        time: values.time,
                        location: values.location,
                        data: values.data
                      }));

                      // Redirect back to dashboard
                      store.dispatch(redirect());

                      // Re-enable submit button for future
                      actions.setSubmitting(false);

                      alert("Stack created!");

                      // Redirect clear
                      store.dispatch(redirectClear());
                    } else if (res.status === 204) {
                      
                    }
                  })
                  .catch(err => {
                    // Cancel on failure
                    store.dispatch(createStackCancel());
            
                    console.log(err);
                    
                    alert("Internal server error");

                    // Re-enable submit button for future
                    actions.setSubmitting(false);
                  })
                }}
               >
                {({ values, isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <h2>
                        <Field 
                          style={{ 
                            borderColor:"black",
                            borderTop:"none", 
                            borderLeft:"none", 
                            borderRight:"none",
                            borderRadius:"0px",
                            borderWidth:"2px", 
                            outline: "none",
                            width:"100%"
                          }}
                          className="mb-3"
                          type="text" 
                          name="name" 
                          placeholder="Stack name"
                        />
                      </h2>                      
                      <ErrorMessage name="name" component="div" />
                    </div>
                    <div className="form-group">
                      <strong style={{ fontSize:"1.05em" }}>
                        <p className="d-inline mr-2">I will</p>
                        <Field
                          style={{
                            borderColor:"black",
                            borderTop:"none", 
                            borderLeft:"none", 
                            borderRight:"none",
                            borderRadius:"0px",
                            borderWidth:"2px", 
                            outline: "none",
                            width:"10em"
                          }}
                          className="d-inline mr-2 mb-2"
                          type="text" 
                          name="first_habit" 
                          placeholder="habit"
                        />
                        <p className="d-inline mr-2">at</p> 
                        <Field
                          style={{
                            borderColor:"black",
                            borderTop:"none", 
                            borderLeft:"none", 
                            borderRight:"none",
                            borderRadius:"0px",
                            borderWidth:"2px", 
                            outline: "none",
                            width:"4em"
                        }}
                        className="d-inline mr-2"
                        type="text" 
                        name="time" 
                        placeholder="time"
                      />
                      <p className="d-inline mr-2">in the</p>
                      <Field
                        style={{
                          borderColor:"black",
                          borderTop:"none", 
                          borderLeft:"none", 
                          borderRight:"none",
                          borderRadius:"0px",
                          borderWidth:"2px", 
                          outline: "none",
                          width:"7em"
                        }}
                        className="d-inline"
                        type="text"
                        name="location"
                        placeholder="location"/>
                        <p className="d-inline">.</p>
                      </strong>
                    </div>
                    <FieldArray
                      name="data"
                      render={arrayHelpers => (
                        <>
                          {values.data && values.data.length > 0 ? (
                            values.data.map((data, index) => (
                              <div className="row justify-content-center" key={index}>
                                <div className="col-8" key={index}>
                                  <p className="mb-1 mt-3" key={index}>After that, I will</p>
                                  <Field
                                    style={{
                                      borderColor:"black",
                                      borderTop:"none", 
                                      borderLeft:"none", 
                                      borderRight:"none",
                                      borderRadius:"0px",
                                      borderWidth:"2px", 
                                      outline: "none",
                                      fontWeight:"bold"
                                    }}
                                    className="form-control" 
                                    name={`data.${index}`} 
                                  />
                                </div>
                                <div className="col-4 text-right mt-3" key={index}>   
                                  <div className="form-group" key={index}>                               
                                    <button
                                      className="btn btn-outline-dark my-2 ml-1 shadow-sm"
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                      key={index}
                                    >
                                      -
                                    </button>
                                    <button
                                      className="btn btn-outline-dark my-2 shadow-sm"
                                      type="button"
                                      onClick={() => arrayHelpers.insert(index + 1, '')} // insert an empty string at a position
                                      key={index}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <button 
                              style={{ 
                                borderRadius:"100px", 
                                paddingRight:"20px", 
                                paddingLeft:"20px" 
                              }}
                              className="btn btn-outline-dark mt-2"
                              type="button"
                              onClick={() => arrayHelpers.push('')}
                            >
                              {/* show this when user has removed all habits from the list */}
                              Add a habit
                            </button>
                          )}
                        </>
                      )}
                    />
                    <div className="row my-2">
                      <div className="col text-right">
                        <button 
                          style={{ 
                            borderRadius:"100px", 
                            paddingRight:"20px", 
                            paddingLeft:"20px" 
                          }}
                          className="btn btn-success mt-4 mb-5 shadow-sm"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      );
    }
  }
};

const mapStateToProps = state => {
  return {
    uid: state.ui.user.uid,
    redirecting: state.ui.redirecting
  }
}

export default connect(mapStateToProps)(CreateStack)