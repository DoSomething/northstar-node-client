'use strict';

const NorthstarEndpointUsers = require('./northstar-endpoint-users');

const config = require('../config');

class NorthstarClient {
  constructor(options = {}) {
    const errorMessage = config.requiredOptionsMessage;
    if (!options.baseURI) {
      throw new TypeError(errorMessage);
    }
    if (!options.apiKey) {
      throw new TypeError(errorMessage);
    }

    // Parse options.
    this.baseURI = options.baseURI;
    this.apiKey = options.apiKey;

    // Endpoints.
    this.Users = new NorthstarEndpointUsers(this);
  }
}
module.exports = NorthstarClient;
