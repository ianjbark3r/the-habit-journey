import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Provider, connect } from 'react-redux';
import axios from 'axios';

// Import Firebase auth and state store
import fire from './config/Fire';
import store from './Store';

// Import components
import Navigation from './layout/Navigation';
import AccountSettings from './pages/AccountSettings';
import CreateStack from './pages/CreateStack';
import Dashboard from './pages/Dashboard';
import EditStack from './pages/EditStack';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Stack from './pages/Stack';

// Import Redux actions
import authConfirm from './actions/authConfirm';
import authRevoke from './actions/authRevoke';
import dashboardCancel from './actions/dashboardCancel';
import dashboardClear from './actions/dashboardClear';
import dashboardReceive from './actions/dashboardReceive';
import dashboardRequest from './actions/dashboardRequest';

class App extends Component {
  // Run listener on componnet mount
  componentDidMount() {
    this.authListener();
  }
  
  // Firebase listener for changes in authentication status
  authListener() {
      fire.auth().onAuthStateChanged((user) => {
      if (user) {
        // Add user object to state
        store.dispatch(authConfirm(user));

        const uid = user.uid;

        // Async dashboard request start
        store.dispatch(dashboardRequest());

        // API call
        axios.get(`https://us-central1-the-habit-journey.cloudfunctions.net/app/api/stacks/getDashboard/${uid}`, {
          userId: uid
        })
        .then(res => {
          if (res.status === 200) {
            // Check for init doc. If not present, reinitiate account
            if (res.data.filter(e => e.init === true).length === 0) {
              axios.post(`https://us-central1-the-habit-journey.cloudfunctions.net/app/api/accInit`, {
                uid: uid
              })
                .then(() => {
                  // Then retrieve dashboard
                  axios.get(`https://us-central1-the-habit-journey.cloudfunctions.net/app/api/stacks/getDashboard/${uid}`, {
                    userId: uid
                  })
                    .then(res => {
                      // Then save dashboard to state
                      store.dispatch(dashboardReceive(res.data));
                    })
                })
                .catch(err => {
                  // On failure, log user out again
                  fire.auth().signOut()
                    .catch(err => {
                      console.log(err.code);
                      console.log(err.message);
                    })
                  
                  // Then ask them to log in again later
                  alert("There was an error and you have been logged out. Please try logging in again in a little bit.")
                  
                  // Then clear state
                  store.dispatch(dashboardCancel());
                  store.dispatch(authRevoke());
                  console.log(err.code);
                  console.log(err.message);
                })
            }
            // Otherwise, update state with dashboard data
            store.dispatch(dashboardReceive(res.data));
          } else if (res.status === 204) {
            // If the account is brand new, create init docs
            axios.post(`https://us-central1-the-habit-journey.cloudfunctions.net/app/api/accInit`, {
              uid: uid
            })
              .then(() => {
                // Then retrieve dashboard
                axios.get(`https://us-central1-the-habit-journey.cloudfunctions.net/app/api/stacks/getDashboard/${uid}`, {
                  userId: uid
                })
                  .then(res => {
                    // Then save dashboard to state
                    store.dispatch(dashboardReceive(res.data));
                  })
              })
              .catch(err => {
                // On failure, log user out again
                fire.auth().signOut()
                  .catch(err => {
                    console.log(err.code);
                    console.log(err.message);
                  })
                
                // Then ask them to log in again later
                alert("There was an error and you have been logged out. Please try logging in again in a little bit.")
                
                // Then clear state
                store.dispatch(dashboardCancel());
                store.dispatch(authRevoke());
                console.log(err.code);
                console.log(err.message);
              })
          }
        })
        .catch(err => {
          // Cancel on failure
          store.dispatch(dashboardCancel());

          console.log(err);

          alert("There was an error.");
        })
      } else {
        // On logout, clear dashboard and revoke auth
        store.dispatch(dashboardClear());
        store.dispatch(authRevoke()); 
      }
    })
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navigation auth={this.props.auth}/>
            <Switch>
              <Route exact 
                path="/" 
                render={() => (
                  this.props.auth ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <Home user={this.props.user} />
                  )
                )}
              />
              <Route exact path="/learn" component={Learn} />
              <Route exact 
                path="/login" 
                render={() => (
                  this.props.auth ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <Login user={this.props.user} />
                  )
                )} 
              />
              <Route exact 
                path="/signup" 
                render={() => (
                  this.props.auth ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <SignUp user={this.props.user} />
                  )
                )}
              />
              <Route exact 
                path="/dashboard" 
                render={() => (
                  !this.props.auth ? (
                    <Redirect to="/" />
                  ) : (
                    <Dashboard />
                  )
                )} 
              />
              <Route exact 
                path="/accountSettings" 
                render={() => (
                  !this.props.auth ? (
                    <Redirect to="/" />
                  ) : (
                    <AccountSettings />
                  )
                )} 
              />
              <Route exact 
                path="/createStack" 
                render={() => (
                  !this.props.auth ? (
                    <Redirect to="/" />
                  ) : (
                    <CreateStack />
                  )
                )}
              />
              <Route exact 
                path="/editStack" 
                render={() => {
                  if (!this.props.auth) {
                    return <Redirect to="/" />
                  } else if (this.props.auth && !this.props.name) {
                    return <Redirect to="/dashboard" />
                  } else {
                    return <EditStack />
                  }
                }}
              />
              <Route exact 
                path="/stack" 
                render={() => {
                  if (!this.props.auth) {
                    return <Redirect to="/" />
                  } else if (this.props.auth && !this.props.name) {
                    return <Redirect to="/dashboard" />
                  } else {
                    return <Stack />
                  }
                }}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
};

const mapStateToProps = state => {
  return {
    auth: state.ui.auth,
    name: state.stacks.currentStack.name,
    uid: state.ui.user.uid
  }
}

export default connect(mapStateToProps)(App)