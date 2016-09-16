'use strict';

/**
 * Imports.
 */
const NorthstarEndpoint = require('./northstar-endpoint');
const NorthstarUser = require('./northstar-user');
const NorthstarUserAuthorized = require('./northstar-user-authorized');

/**
 * NorthstarEndpointUsers.
 */

class NorthstarEndpointUsers extends NorthstarEndpoint {

  constructor(client) {
    super(client);
    this.endpoint = 'users';
  }

  /**
   * Get single user.
   */
  get(type, id) {
    // TODO: check type to be in allowed data.
    return this.client
      .executeGet(`${this.endpoint}/${type}/${id}`)
      .then(response => this.parseUser(response));
  }

  /**
   * Helper function to parse response body to a NorthstarUser.
   */
  parseUser(response) {
    if (!response.body.data) {
      throw new Error('Cannot parse API response as a NorthstarUser.');
    }

    let result;
    if (this.client.authorized) {
      result = new NorthstarUserAuthorized(response.body.data);
    } else {
      result = new NorthstarUser(response.body.data);
    }
    return result;
  }

}

module.exports = NorthstarEndpointUsers;
