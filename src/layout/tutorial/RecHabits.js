import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Redux store
import store from '../../Store'

// Import Redux actions
import tutorialDismiss from '../../actions/tutorialDismiss';

class RecHabits extends Component {
  handleClick(e) {
    e.preventDefault();

    store.dispatch(tutorialDismiss("recHabits"));

    // API call to update user preferences
    axios.put(`https://us-central1-the-habit-journey.cloudfunctions.net/app/api/accDataUpdate`, {
      uid: this.props.uid,
      tutorial: {
        active: this.props.tutorial.active.filter(item => {
          if (item === "recHabits") {
            return false;
          } else {
            return true;
          }
        }),
        dismissed: this.props.tutorial.dismissed.concat("recHabits")
      }
    })
  }

  render() {
    return (
      <div className="alert alert-info alert-dismissible fade show" role="alert">
        <p className="mt-2">
          Done with your list? Excellent.
        </p>
        <p>
          Now we're going to use this list to build an inventory of healthy habits. For each identity, ask yourself: <strong>what does this "person" do on a daily basis?</strong>
        </p>
        <p>
          For example, a truly "fit" person moves for at least 30 minutes and drinks an appropriate amount of water every day. A truly "financially savvy" person reviews their budget and tracks their spending every day. 
        </p>
        <p>
          Think, "what would a ___________ person do today," and write down the answers that come to mind.
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

export default connect(mapStateToProps)(RecHabits);