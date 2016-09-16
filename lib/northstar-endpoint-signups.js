'use strict';

/**
 * Imports.
 */
const NorthstarEndpoint = require('./northstar-endpoint');
const NorthstarSignup = require('./northstar-signup');

/**
 * NorthstarEndpointSignups.
 */

class NorthstarEndpointSignups extends NorthstarEndpoint {

  constructor(client) {
    super(client);
    this.endpoint = 'signups';
  }

  /**
   * Get single signup.
   */
  getSignup(id) {
    // TODO: check type to be in allowed data.
    return this.client
      .executeGet(`${this.endpoint}/${id}`)
      .then(response => this.parseSignup(response));
  }

  /**
   * Helper function to parse response body to a NorthstarSignup.
   */
  parseSignup(response) {
    if (!response.body.data) {
      throw new Error('Cannot parse API response as a NorthstarSignup.');
    }

    return new NorthstarSignup(response.body.data);
  }

}

module.exports = NorthstarEndpointSignups;
