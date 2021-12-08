import React, { Component } from 'react';
import Login from './components/Login/Loginpage';
import Dashboard from './components/Dashboard/Dashboard'
import history from './history';
import { Router, Switch, Route } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css'
import NewDashBoard from './components/Dashboard/NewDashBoard';

class App extends Component {

  render() {
    return (
        <Router history={history}>
          <Switch>
            {/* <Route exact path='/dashboard' component={Dashboard} /> */}
            <Route path='/' exact component={Login} />
            <Route path='/dashboard/' component={Dashboard} />
          </Switch>
        </Router>
    );
  }
}

export default App;
