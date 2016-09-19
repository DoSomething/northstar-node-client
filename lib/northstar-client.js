'use strict';

const request = require('superagent');
const EndpointUsers = require('./northstar-endpoint-users');
const EndpointSignups = require('./northstar-endpoint-signups');
const EndpointReportbacks = require('./northstar-endpoint-reportbacks');

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
    this.Users = new EndpointUsers(this);
    this.Signups = new EndpointSignups(this);
    this.Reportbacks = new EndpointReportbacks(this);
  }

  /**
   * Helper function to execute simple get.
   */
  executeGet(endpoint, query) {
    const agent = request
      .get(`${this.baseURI}/${endpoint}`)
      .accept('json');

    // Set api key.
    if (this.authorized) {
      agent.set('X-DS-REST-API-Key', this.apiKey);
    }

    // Set query string.
    if (query) {
      agent.query(query);
    }

    return agent;
  }

  /**
   * Helper function to execute simple post.
   */
  executePost(endpoint, data, query) {
    const agent = request
      .post(`${this.baseURI}/${endpoint}`)
      .send(data)
      .accept('json');

    if (this.authorized) {
      agent.set('X-DS-REST-API-Key', this.apiKey);
    }

    if (query) {
      agent.query(query);
    }

    return agent;
  }
}

module.exports = NorthstarClient;
