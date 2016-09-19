'use strict';

/**
 * Imports.
 */
const NorthstarEndpoint = require('./northstar-endpoint');
const NorthstarReportback = require('./northstar-reportback');

/**
 * NorthstarEndpointReportbacks.
 */

class NorthstarEndpointReportbacks extends NorthstarEndpoint {

  constructor(client) {
    super(client);
    this.endpoint = 'reportbacks';
  }

  /**
   * Post reportback.
   */
  post(data) {
    return this.client
      .executePost(`${this.endpoint}`, data)
      .then(response => this.parseReportback(response));
  }

  /**
   * Helper function to parse response body to a NorthstarSignup.
   */
  parseReportback(response) {
    if (!response.body.data) {
      throw new Error('Cannot parse API get response as a NorthstarSignup.');
    }

    return new NorthstarReportback(response.body.data);
  }

}

module.exports = NorthstarEndpointReportbacks;
