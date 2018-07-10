import { observable, action } from 'mobx';

/**
 * Example of mobx store
 * App store
 */
export default class AppStore {
  @observable authenticated;
  @observable authenticating;

  constructor() {
    this.authenticated = false;
    this.authenticating = false;
  }

  @action
  authenticate() {
    this.authenticated = true;
    this.authenticating = false;
  }
}
