import UsersStore from 'Scenes/Users/store';
import AppStore from './AppStore';

/**
 * App pages stores
 * fixme:// add lazy loading
 */
export default {
  appStore: new AppStore(),
  usersStore: new UsersStore(),
};

