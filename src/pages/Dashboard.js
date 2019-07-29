import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Import components
import dashItem from '../components/DashItem';
import ChooseIds from '../layout/tutorial/ChooseIds';
import RecHabits from '../layout/tutorial/RecHabits';
import FirstStack from '../layout/tutorial/FirstStack';

class Dashboard extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <div className="container-fluid">
          <div className="text-center">
            <div 
              className="spinner-border" 
              role="status" 
              style={{ marginTop: "20vh" }}
              data-test="spinner"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container-fluid" data-test="dashboard">
          <div style={{ marginTop:"5vh" }} className="row justify-content-center">
            <div className="col-sm-5">
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-5">
              {this.props.tutActive.includes("chooseIds") && <ChooseIds />}
            </div>
          </div>
          <div style={{ marginBottom:"5vh" }} className="row justify-content-center">
            <div className="col-sm-5">
              {this.props.tutActive.includes("recHabits") && <RecHabits />}
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-3 col-8">
              <h2 className="mb-0">My Stacks</h2>
            </div>
            <div className="col-sm-2 col-4 text-right">
              <Link to='/createStack'>
                <button style={{ 
                  borderRadius:"100px", 
                  paddingRight:"20px", 
                  paddingLeft:"20px" 
                  }} 
                  className="btn btn-primary btn-sm my-auto shadow-sm"
                >+ Create</button>
              </Link>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-sm-5">
              {this.props.tutActive.includes("firstStack") && <FirstStack />}
            </div>
          </div>            
          <div className="row justify-content-center">
            <div className="col-sm-5 mt-4">
              {this.props.storedStacks.map((item, index) => {
                return dashItem(item, index)
              })}
            </div>
          </div>
        </div>
      );
    }
  }
};

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    redirecting: state.ui.redirecting,
    storedStacks: state.stacks.storedStacks,
    tutActive: state.tutorial.active,
    uid: state.ui.user.uid
  }
}

export default connect(mapStateToProps)(Dashboard);