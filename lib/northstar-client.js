'use strict';

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

}

module.exports = NorthstarClient;
