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
   * executeGet - Helper function to execute a GET request.
   * @param {String} endpoint
   * @param {Object} query
   * @param {Boolean} anonymousRequest
   */
  executeGet(endpoint, query, anonymousRequest) {
    // Flip to make authentication intent more readable
    const shouldAuthenticate = !anonymousRequest;
    const agent = request
      .get(`${this.client.baseURI}/${endpoint}`)
      .accept('json');

    if (shouldAuthenticate) {
      agent.set('X-DS-REST-API-Key', this.client.apiKey);
    }

    // Set query string.
    if (query) {
      agent.query(query);
    }

    return agent;
  }

  /**
   * Helper function to execute a POST request.
   */
  executePost(endpoint, data, query) {
    const agent = request
      .post(`${this.client.baseURI}/${endpoint}`)
      .send(data)
      .accept('json')
      .set('X-DS-REST-API-Key', this.client.apiKey);

    if (query) {
      agent.query(query);
    }

    return agent;
  }

  /**
   * Helper function to execute a PUT request.
   */
  executePut(endpoint, data) {
    const agent = request
      .put(`${this.client.baseURI}/${endpoint}`)
      .send(data)
      .accept('json')
      .set('X-DS-REST-API-Key', this.client.apiKey);

    return agent;
  }
}

module.exports = NorthstarEndpoint;
