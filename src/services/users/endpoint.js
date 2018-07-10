import users from './users.json';

/**
 * Order types
 * @type {{ASC: string, DESC: string}}
 */
const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

const USER_GROUPS = [
  'Руководство',
  'Бухгалетрия',
  'Отдел кадров',
  'Дизайнеры',
];

/**
 * Get Number value from bool for comparator func
 * @param {Boolean} value
 * @returns {Number} 1 or -1
 */
const boolToInt = value => (value ? 1 : -1);

/**
 * Compare values for comparator func
 * @param {*} a
 * @param {*} b
 * @returns {Number}
 */
const compare = (a, b) => (a === b ? 0 : boolToInt(a > b));

/**
 * Comparator func for sorting by prop name
 * @param {String} prop name
 * @param {String} order asc/desc
 * @returns {function(*, *): number}
 */
const sortByProp = (prop, order = SORT_ORDER.ASC) =>
  (a, b) => (compare(a[prop], b[prop]) * boolToInt(order === SORT_ORDER.ASC));


/**
 * Waiting function for server response emulating
 * @param {Number} [waitingTime=10] ms
 * @returns {Promise<any>}
 */
async function waitResponse(waitingTime = 10) {
  return new Promise(resolve => setTimeout(resolve, waitingTime));
}

/**
 * Describes sort order
 * @typedef {Object} Order
 * @property {String} type asc, desc
 * @property {String} field name
 */
/**
 * Users endpoint class
 * @author Ryazanov I.A
 */
export default class Users {
  /**
   * Base list method
   * @param {Function} [filter] function
   * @param {Order} [order]
   * @returns {Promise<Object[]>}
   * @private
   */
  static async getList(filter, order) {
    await waitResponse();
    let result = users;
    if (filter) {
      result = result.filter(filter);
    }
    if (order) {
      const { type, field } = order;
      result = result.sort(sortByProp(field, type));
    }
    return result;
  }

  /**
   * Get user list with all information
   * @param {Function} [filter] function
   * @param {Order} [order]
   * @returns {Promise<Object[]>}
   */
  static async getAll(filter, order) {
    return Users.getList(filter, order);
  }

  /**
   * Get users list for user cards
   * @param {Function} [filter] function
   * @param {Order} [order]
   * @returns {Promise<Object[]>}
   */
  static async getCards(filter, order) {
    const list = await Users.getList(filter, order);
    return list.map(el => ({
      picture: el.picture,
      caption: `${el.first_name} ${el.last_name}`,
      email: el.email,
      phone_number: el.phone_number,
    }));
  }

  /**
   * Get user list with short information
   * @param {Function} [filter] function
   * @param {Order} [order]
   * @returns {Promise<Object[]>}
   */
  static async getBrief(filter, order) {
    const list = await Users.getList(filter, order);
    return list.map(el => ({
      caption: `${el.title} ${el.first_name} ${el.last_name}`,
      email: el.email,
      group: USER_GROUPS[el.birthdate % 4],
    }));
  }
}


exports = {
  Users,
  SORT_ORDER,
};
