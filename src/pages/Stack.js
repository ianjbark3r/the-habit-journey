import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import store from '../Store';

import additionalHabit from '../components/AdditionalHabit';

import deleteStackCancel from '../actions/deleteStackCancel';
import deleteStackConfirm from '../actions/deleteStackConfirm';
import redirect from '../actions/redirect';
import redirectClear from '../actions/redirectClear';

class Stack extends Component {
  handleClick(e) {
    e.preventDefault();

    if (window.confirm('Are you sure you want to delete?')) {
      const uid = this.props.uid;
      const stackId = this.props.stackId
      
      // API call
      axios.delete(`https://us-central1-the-habit-journey.cloudfunctions.net/app/api/v1/stacks/${uid}/${stackId}`, {
        data: null
      })
      .then(res => {
        if (res.status === 204) {
          store.dispatch(deleteStackConfirm(stackId));

          // Redirect back to dashboard
          store.dispatch(redirect());

          alert('Stack deleted.');

          store.dispatch(redirectClear());
        } else {
          store.dispatch(deleteStackCancel());
        }
      })
      .catch(err => {
        store.dispatch(deleteStackCancel());

        console.log(err);
        
        alert("There was an error.");
      })
    }
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="container-fluid">
          <div className="text-center">
            <div className="spinner-border" role="status" style={{ marginTop: "20vh" }}>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )
    } else if (this.props.redirecting) {
      return <Redirect to='/dashboard'/>
    } else {
      return (
        <div className="container-fluid">
          <div className="row justify-content-center mb-3">
            <div className="col-sm-5">
              <h1 style={{ marginTop:"15vh" }}>{this.props.name}</h1>
            </div>
          </div>
          <div className="row justify-content-center mb-3">
            <div className="col-sm-5">
              <strong>
                <h4 style={{ lineHeight:"1.25" }}>
                  I will {this.props.first_habit} at {this.props.time} in the {this.props.location}.
                </h4>
              </strong>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-sm-5">
              <ul style={{ paddingLeft:"1.1em" }}>
                {this.props.data.map((item, index) => {
                  let lastIndex = index - 1;
                  return additionalHabit(item, this.props.data[lastIndex], index, this.props.first_habit)
                })}
              </ul>
            </div>
          </div>
          <div className="row justify-content-center mt-4 mb-5">
            <div className="col-sm-5 text-right">
              <Link to='/editStack'>
                <button
                  style={{
                    borderRadius:"100px", 
                    paddingRight:"30px", 
                    paddingLeft:"30px",
                    color:"black"
                  }} 
                  className="btn btn-outline-primary shadow-sm"
                >
                  Edit
                </button>
              </Link>
              <button
                style={{ 
                  borderRadius:"100px", 
                  paddingRight:"20px", 
                  paddingLeft:"20px" 
                }} 
                className="btn btn-danger ml-2 shadow-sm" 
                onClick={e => this.handleClick(e)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
};

const mapStateToProps = state => {
  return {
    data: state.stacks.currentStack.data,
    first_habit: state.stacks.currentStack.first_habit,
    isLoading: state.ui.isLoading,
    location: state.stacks.currentStack.location,
    name: state.stacks.currentStack.name,
    redirecting: state.ui.redirecting,
    stackId: state.stacks.currentStack.id,
    time: state.stacks.currentStack.time,
    uid: state.ui.user.uid
  }
}

export default connect(mapStateToProps)(Stack)