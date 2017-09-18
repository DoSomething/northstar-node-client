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
   * Create user.
   */
  create(data) {
    // Note: if https://github.com/DoSomething/northstar/issues/406 happens,
    // we can remove this create_drupal_user param.
    return this
      .executePost(`${this.endpoint}`, data, { create_drupal_user: 1 })
      .then(response => NorthstarEndpointUsers.parseUser(response));
  }

  /**
   * Get single user.
   */
  get(type, id) {
    // TODO: check type to be in allowed data.
    return this
      .executeGet(`${this.endpoint}/${type}/${id}`)
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

    return response.body.data;
  }
}

module.exports = NorthstarEndpointUsers;
