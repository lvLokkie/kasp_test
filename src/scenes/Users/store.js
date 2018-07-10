import { observable, action, runInAction } from 'mobx';
import { Users } from 'Services/users/endpoint';

const REGISTER_VIEWS = {
  TABLE: 'TABLE',
  CARDS: 'CARDS',
  TILES: 'TILES',
};

/**
 * Users page store
 * @author Ryazanov I.A
 */
export default class UsersStore {
   @observable view = REGISTER_VIEWS.TABLE;
   @observable users = [];
   @observable order = null;
   @observable filter = null;
   @observable state = null;

   @action
   async fetchData(request, done) {
     try {
       const result = await request;
       runInAction(done(result));
     } catch (e) {
       runInAction(() => {
         this.state = 'error';
       });
     }
   }

   async fetchUsers(filter, order) {
     await this.fetchData(Users.getAll(filter, order), (result) => { this.users = result; });
   }

   async fetchCards(filter, order) {
     await this.fetchData(Users.getCards(filter, order), (result) => { this.users = result; });
   }

   async fetchTiles(filter, order) {
     await this.fetchData(Users.getBrief(filter, order), (result) => { this.users = result; });
   }

   async fetchDataByView(viewName, filter, order) {
     switch (viewName) {
       case REGISTER_VIEWS.CARDS: return this.fetchCards(filter, order);
       case REGISTER_VIEWS.TILES: return this.fetchTiles(filter, order);
       case REGISTER_VIEWS.TABLE:
       default:
         return this.fetchUsers(filter, order);
     }
   }
}
