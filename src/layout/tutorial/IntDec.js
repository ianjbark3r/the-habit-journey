import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Redux store
import store from '../../Store'

// Import Redux actions
import tutorialDismiss from '../../actions/tutorialDismiss';

class IntDec extends Component {
  handleClick(e) {
    e.preventDefault();

    store.dispatch(tutorialDismiss("intDec"));

    // API call to update user preferences
    axios.put(`https://us-central1-the-habit-journey.cloudfunctions.net/app/api/accDataUpdate`, {
      uid: this.props.uid,
      tutorial: {
        active: this.props.tutorial.active.filter(item => {
          if (item === "intDec") {
            return false;
          } else {
            return true;
          }
        }),
        dismissed: this.props.tutorial.dismissed.concat("intDec")
      }
    })
  }

  render() {
    return (
      <div className="alert alert-info alert-dismissible fade show" role="alert">
        <p className="mt-2">
          In order to establish a habit stack within your day, we begin with an <strong>"intention declaration"</strong>. An intention declaration is a written decision to perform a <strong>habit</strong> at a <strong>specific time</strong> in a <strong>specific place</strong>. This combination of habit, time, and location creates a strong psychological commitment that helps begin your stack every day.
        </p>
        <p>
          For your intention declaration, try to pick a habit from your list that you already <i>want</i> to do. This will make starting your habit stack every day considerably more attractive.
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

export default connect(mapStateToProps)(IntDec);