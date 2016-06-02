'use strict';

const request = require('superagent');
const NorthstarUser = require('./northstar-user');

/**
 * NorthstarClient
 */

// Package version
const VERSION = require('../package.json').version;

class NorthstarClient {

  constructor(options) {
    const opts = options || {};

    // Ensure API base URI is provided.
    if (!opts.baseURI) {
      throw new TypeError('Option baseURI is required.');
    }

    // Parse options.
    this.baseURI = opts.baseURI;
    this.apiKey = opts.apiKey || null;

    // Defaults.
    this.VERSION = VERSION;
  }

  /**
   * Get single user.
   */
  getUser(type, id) {
    return this
      .executeGet(`${type}/${id}`)
      .then(this.parseUser);
  }

  /**
   * Helper function to execute simple get.
   */
  executeGet(endpoint) {
    return request
      .get(`${this.baseURI}/${endpoint}`)
      .accept('json');
  }

  /**
   * Helper function to parse response body to a NorthstarUser.
   */
  parseUser(response) {
    if (!response.body.data) {
      throw new Error('Cannot parse API response as a NorthstarUser.');
    }

    // TODO: Parse authorized user if (this.authorized).
    return new NorthstarUser(response.body.data);
  }

}

module.exports = NorthstarClient;
