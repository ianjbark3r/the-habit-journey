import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

// Import Redux store
import store from '../../Store'

// Import Redux actions
import tutorialDismiss from '../../actions/tutorialDismiss';

class HabitList extends Component {
  handleClick(e) {
    e.preventDefault();

    store.dispatch(tutorialDismiss("habitList"));

    // API call to update user preferences
    axios.put(`https://us-central1-the-habit-journey.cloudfunctions.net/app/api/accDataUpdate`, {
      uid: this.props.uid,
      tutorial: {
        active: this.props.tutorial.active.filter(item => {
          if (item === "habitList") {
            return false;
          } else {
            return true;
          }
        }),
        dismissed: this.props.tutorial.dismissed.concat("habitList")
      }
    })
  }

  render() {
    return (
      <div className="alert alert-info alert-dismissible fade show" role="alert">
        <p className="mt-2">
          Once you have your first habit established, each habit you add becomes a trigger for the following habit. This sequence of healthy decisions is what makes the system work.
        </p>
        <p>
          Now, go through your list. Consider the time you have available and the times during the day when you can follow-through with your routines. Use as many habits from your list as you can and construct habit stacks until all of your desired habits are structured into your daily life.
        </p>
        <button 
          type="button" 
          className="close" 
          data-dismiss="alert" 
          aria-label="Close"
          onClick={e => this.handleClick(e)}
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

export default connect(mapStateToProps)(HabitList);