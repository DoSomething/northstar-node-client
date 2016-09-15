'use strict';

const request = require('superagent');
const NorthstarEndpointUsers = require('./northstar-endpoint-users');

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

      // Endpoints.
    this.Users = new NorthstarEndpointUsers(this);
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

}

module.exports = NorthstarClient;
