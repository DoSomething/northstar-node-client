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
   * Get single signup by id.
   */
  get(id) {
    // TODO: check type to be in allowed data.
    return this.client
      .executeGet(`${this.endpoint}/${id}`)
      .then(response => this.parseGet(response));
  }

  /**
   * Get signups index.
   */
  index(query) {
    return this.client
      .executeGet(`${this.endpoint}`, query)
      .then(response => this.parseIndex(response));
  }

  /**
   * Helper function to parse response body to a NorthstarSignup.
   */
  parseGet(response) {
    if (!response.body.data) {
      throw new Error('Cannot parse API get response as a NorthstarSignup.');
    }

    return new NorthstarSignup(response.body.data);
  }

  /**
   * Helper function to parse response body to an array of NorthstarSignups.
   */
  parseIndex(response) {
    const signups = [];
    if (!response.body.data) {
      throw new Error('Cannot parse API index response.');
    }

    response.body.data.forEach((signup) => {
      signups.push(new NorthstarSignup(signup));
    });

    return signups;
  }
}

module.exports = NorthstarEndpointSignups;
