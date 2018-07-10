import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('appStore')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.store = props.appStore;
  }

  render() {
    return (
      <div>
        Welcome to user register app! Glad to see u :)
      </div>
    );
  }
}

