import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';

// Import state store
import store from '../Store';

// Import Redux actions
import redirect from '../actions/redirect';
import redirectClear from '../actions/redirectClear';
import updateStack from '../actions/updateStack';
import updateStackConfirm from '../actions/updateStackConfirm';
import updateStackCancel from '../actions/updateStackCancel'

class EditStack extends Component {
  render() {
    if (this.props.redirecting) {
      return <Redirect to="/stack"/>
    } else {
      return (
        <div className="container-fluid">
          <div className="row justify-content-center" style={{ marginTop: "15vh" }}>
            <div className="col-sm-5">
              <Formik
              initialValues={{ 
                id: this.props.id,
                data: this.props.data,
                first_habit: this.props.first_habit,
                location: this.props.location,
                name: this.props.name,
                time: this.props.time,
                type: 'stack'
              }}
              onSubmit={(values, actions) => {

                // Disable submit button
                actions.setSubmitting(true);

                // Async stack update start
                store.dispatch(updateStack());
  
                const uid = this.props.uid;
                const stackId = this.props.stackId
  
                // API call
                axios.put(`https://us-central1-the-habit-journey.cloudfunctions.net/app/api/stacks/${uid}/${stackId}`, {
                  data: values
                })
                .then(res => {
                  if (res.status === 200) {
                    // Update state with returned data
                    store.dispatch(updateStackConfirm(values));

                    // Redirect back to dashboard
                    store.dispatch(redirect());
                    
                    // Re-enable submit button for future
                    actions.setSubmitting(false);

                    alert('Stack edited successfully!');

                    // Redirect clear
                    store.dispatch(redirectClear());
                  }
                })
                .catch(err => {
                  // Cancel on failure
                  store.dispatch(updateStackCancel());
          
                  console.log(err);
                  
                  alert("There was an error.");

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
                        placeholder="First habit"
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
                        placeholder="Time"
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
                        placeholder="location"
                      />
                      <p className="d-inline">.</p>
                      <ErrorMessage name="first_habit" component="div" />
                      <ErrorMessage name="time" component="div" />
                      <ErrorMessage name="location" component="div" />
                    </strong>
                  </div>
                  <FieldArray
                    name="data"
                    render={arrayHelpers => (
                      <div>
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
                                    className="btn btn-outline-dark my-2 ml-1 shadow-sm"
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
                          <button type="button" onClick={() => arrayHelpers.push('')}>
                            {/* show this when user has removed all habits from the list */}
                            Add a habit
                          </button>
                        )}
                      </div>
                    )}
                  />
                  <div className="row mt-4 mb-5">
                    <div className="col text-right">
                      <Link to='/stack'>
                        <button style={{ 
                            borderRadius:"100px", 
                            paddingRight:"20px", 
                            paddingLeft:"20px" 
                          }}  
                          className="btn btn-outline-danger mr-2 shadow-sm"
                        >
                          Cancel
                        </button>
                      </Link>
                      <button 
                        style={{ 
                          borderRadius:"100px", 
                          paddingRight:"20px", 
                          paddingLeft:"20px" 
                        }}  
                        className="btn btn-success shadow-sm" 
                        type="submit" 
                        disabled={isSubmitting}
                      >
                        Save
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
    id: state.stacks.currentStack.id,
    currentStack: state.stacks.currentStack,
    data: state.stacks.currentStack.data,
    first_habit: state.stacks.currentStack.first_habit,
    location: state.stacks.currentStack.location,
    name: state.stacks.currentStack.name,
    redirecting: state.ui.redirecting,
    stackId: state.stacks.currentStack.id,
    time: state.stacks.currentStack.time,
    uid: state.ui.user.uid
  }
}

export default connect(mapStateToProps)(EditStack)