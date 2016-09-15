'use strict';

const request = require('superagent');
const NorthstarUser = require('./northstar-user');
const NorthstarUserAuthorized = require('./northstar-user-authorized');

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
    this.authorized = !!this.apiKey;

    // Defaults.
    this.VERSION = VERSION;
  }

  /**
   * Get single user.
   */
  getUser(type, id) {
    // TODO: check type to be in allowed data.
    return this
      .executeGet(`users/${type}/${id}`)
      .then(response => this.parseUser(response));
  }

  /**
   * Helper function to execute simple get.
   */
  executeGet(endpoint) {
    const agent = request
      .get(`${this.baseURI}/${endpoint}`)
      .accept('json');

    // Set api key.
    if (this.authorized) {
      agent.set('X-DS-REST-API-Key', this.apiKey);
    }

    return agent;
  }

  /**
   * Helper function to parse response body to a NorthstarUser.
   */
  parseUser(response) {
    if (!response.body.data) {
      throw new Error('Cannot parse API response as a NorthstarUser.');
    }

    let result;
    if (this.authorized) {
      result = new NorthstarUserAuthorized(response.body.data);
    } else {
      result = new NorthstarUser(response.body.data);
    }
    return result;
  }

}

module.exports = NorthstarClient;
