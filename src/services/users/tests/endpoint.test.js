import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Users from '../endpoint';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Users endpoint', () => {
  it('Get users list without filter', () => expect(Users.getAll()).to.eventually.be.an('array').that.is.not.empty);
  it('Get users for cards', () => expect(Users.getCards()).to.eventually.be.an('array').that.is.not.empty);
  it('Get users for tiles ', () => expect(Users.getBrief()).to.eventually.be.an('array').that.is.not.empty);
});
