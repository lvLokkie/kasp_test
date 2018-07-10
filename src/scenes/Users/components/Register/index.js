import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

/**
 * Users page component
 * @author Ryazanov I.A
 */
@inject('usersStore')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.store = props.usersStore;
  }

  async componentDidMount() {
    await this.fetchData();
  }

  async fetchData(e) {
    if (e) e.preventDefault();
    const { store } = this;
    await store.fetchDataByView(
      store.view,
      store.filter,
      store.order,
    );
  }

  render() {
    return (
      <div>
           Oh my god
      </div>
    );
  }
}
