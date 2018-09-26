'use strict';

/**
 * Imports.
 */
const NorthstarEndpoint = require('./northstar-endpoint');

/**
 * NorthstarEndpointUsers.
 */

class NorthstarEndpointUsers extends NorthstarEndpoint {
  constructor(client) {
    super(client);
    this.endpoint = 'users';
  }

  /**
   * Creates a user.
   */
  create(data) {
    return this
      .executePost(`${this.endpoint}`, data)
      .then(response => NorthstarEndpointUsers.parseUser(response));
  }

  /**
   * get - Gets a user by given type and id.
   * @param {String} type
   * @param {String} id
   * @param {Object} query
   */
  get(type, id, query) {
    // TODO: check type to be in allowed data.
    return this
      .executeGet(`${this.endpoint}/${type}/${id}`, query)
      .then(response => NorthstarEndpointUsers.parseUser(response));
  }

  /**
   * anonGet - Gets a user by given type and id anonymously (non-authenticated)
   *
   * @param {String} type
   * @param {String} id
   * @param {Object} query
   */
  anonGet(type, id, query) {
    const anonymousRequest = true;
    // TODO: check type to be in allowed data.
    return this
      .executeGet(`${this.endpoint}/${type}/${id}`, query, anonymousRequest)
      .then(response => NorthstarEndpointUsers.parseUser(response));
  }

  /**
   * Updates a user.
   */
  update(userId, data) {
    return this
      .executePut(`${this.endpoint}/_id/${userId}`, data)
      .then(response => NorthstarEndpointUsers.parseUser(response));
  }

  /**
   * Helper function to parse response body to a NorthstarUser.
   */
  static parseUser(response) {
    const user = response.body.data;
    if (!user) {
      throw new Error('Cannot parse Northstar API response.body.data.');
    }

    return user;
  }
}

module.exports = NorthstarEndpointUsers;
