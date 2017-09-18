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
   * Gets a user by given type and id.
   */
  get(type, id) {
    // TODO: check type to be in allowed data.
    return this
      .executeGet(`${this.endpoint}/${type}/${id}`)
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
