import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Redux store
import store from '../../Store'

// Import Redux actions
import tutorialDismiss from '../../actions/tutorialDismiss';

class ChooseIds extends Component {
  handleClick(e) {
    e.preventDefault();

    store.dispatch(tutorialDismiss("chooseIds"));

    // API call to update user preferences
    axios.put(`https://us-central1-the-habit-journey.cloudfunctions.net/app/api/accDataUpdate`, {
      uid: this.props.uid,
      tutorial: {
        active: this.props.tutorial.active.filter(item => {
          if (item === "chooseIds") {
            return false;
          } else {
            return true;
          }
        }),
        dismissed: this.props.tutorial.dismissed.concat("chooseIds")
      }
    })
  }

  render() {
    return (
      <div className="alert alert-info alert-dismissible fade show" role="alert">
        <h4 className="alert-heading mt-2">Welcome to your habit journey.</h4>
        <hr />
        <p>
          For our first step, grab piece of paper and pencil (or your favorite text editor). Then, ask yourself the question: <strong>what kind of "people" do I want to be?</strong> 
        </p>
        <p>
          Do you want to be a "fit person"? Maybe a "creative person"? Maybe just a more calm and centered person? Maybe a combination of these or other identities? Simply write down all the "people" you endeavor to be.
        </p>
        <p>
          This step is important, so <strong>take your time, give it some thought, and come back</strong> when you've got a list of the identities you want to embody in your day-to-day life.
        </p>
        <button 
          type="button" 
          className="close" 
          data-dismiss="alert" 
          aria-label="Close"
          onClick = {e => this.handleClick(e)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    uid: state.ui.user.uid,
    tutorial: state.tutorial
  }
}

export default connect(mapStateToProps)(ChooseIds);