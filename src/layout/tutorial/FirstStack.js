import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Redux store
import store from '../../Store'

// Import Redux actions
import tutorialDismiss from '../../actions/tutorialDismiss';

class FirstStack extends Component {
  handleClick(e) {
    e.preventDefault();

    store.dispatch(tutorialDismiss("firstStack"));

    // API call to update user preferences
    axios.put(`https://us-central1-the-habit-journey.cloudfunctions.net/app/api/v1/account`, {
      uid: this.props.uid,
      tutorial: {
        active: this.props.tutorial.active.filter(item => {
          if (item === "firstStack") {
            return false;
          } else {
            return true;
          }
        }),
        dismissed: this.props.tutorial.dismissed.concat("firstStack")
      }
    })
  }

  render() {
    return (
      <div className="alert alert-info alert-dismissible fade show" role="alert">
        <p className="mt-2">
          Obviously, accomplishing this entire list of habits in a day is a tall task &mdash; unless you have a plan. This is where <strong>habit stacks</strong> come in.
        </p>
        <p>
          A habit stack is simply a sequence of habits in which each habit acts as a trigger for the next one. 
        </p>
        <p>
          Normally, you would have to remember to brush your teeth, floss, <i>and</i> wash your face before bed. With a habit stack, your brain <i>only</i> needs to remember to brush your teeth, which automatically reminds you to floss, which automatically reminds you to wash your face.
        </p>
        <p>
          Create one now to begin building your daily routine, incorporating your new list of identity forming habits.
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

export default connect(mapStateToProps)(FirstStack);