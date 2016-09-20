'use strict';

const request = require('superagent');

/**
 * NorthstarEndpoint.
 */

class NorthstarEndpoint {

  constructor(client) {
    this.client = client;
  }

  /**
   * Helper function to execute simple get.
   */
  executeGet(endpoint, query) {
    const agent = request
      .get(`${this.client.baseURI}/${endpoint}`)
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
