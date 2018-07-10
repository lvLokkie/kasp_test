import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Register from './components/Register';

/**
 * Users page component
 * @author Ryazanov I.A
 */
@inject('usersStore')
@observer
export default class Users extends Component {
  constructor(props) {
    super(props);
    this.store = props.usersStore;
  }

  render() {
    return (
      <div className="app_users">
        <Register />
      </div>
    );
  }
}
