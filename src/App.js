import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Route,
  Switch,
  NavLink,
  withRouter,
} from 'react-router-dom';

// fixme: add lazy loading
import Home from 'Scenes/Home';
import Users from 'Scenes/Users';

/**
 * @author Ryazanov I.A
 * Application routing
 */
@withRouter
@inject('appStore')
@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.appStore;
  }

  componentDidMount() {
    this.authenticate();
  }

  authenticate(e) {
    if (e) e.preventDefault();
    this.store.authenticate();
  }

  render() {
    return (
      <div className="app">
        <div className="app_nav">
          <NavLink to="/">Main</NavLink>
          <NavLink to="/users">Users list</NavLink>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
        </Switch>
      </div>
    );
  }
}

