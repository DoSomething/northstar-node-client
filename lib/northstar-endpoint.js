'use strict';

/**
 * NorthstarEndpoint.
 */

class NorthstarEndpoint {

  constructor(client) {
    this.client = client;
  }

  parseResponse(response) {
    if (!response.body) {
      throw new Error('Cannot parse API response.');
    }
    return response.body;
  }

  parseStringResponse(response) {
    if (!response.body) {
      throw new Error('Cannot parse API response.');
    }
    // When a string is returned instead of a JSON, it is formatted
    // as a single-element array containing this string.
    const arrayResponse = response.body;
    return String(arrayResponse[0]);
  }

}

module.exports = NorthstarEndpoint;
