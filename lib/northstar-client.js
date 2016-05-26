'use strict';

const request = require('superagent');

/**
 * NorthstarClient
 */

// Package version
const VERSION = require('../package.json').version;

class NorthstarClient {

  constructor(options) {
    this.options = options || {};
    this.VERSION = VERSION;

    // TODO: actually parse options.
    this.options.baseURI = 'https://northstar-qa.dosomething.org/v1/users';
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
      .get(`${this.options.baseURI}/${endpoint}`)
      .accept('json');
  }

  /**
   * Helper function to parse response body to a NorthstarUser.
   */
  parseUser(response) {
    if (!response.body.data) {
      throw new Error('Cannot parse API response as a NorthstarUser.');
    }

    // Build NorthstarUser.
    const data = response.body.data;
    const northstarUser = {
      id: data.id,
      first_name: data.first_name,
      last_initial: data.last_initial,
      photo: data.photo,
      language: data.language,
      country: data.country,
      drupal_id: data.drupal_id,
      updated_at: data.updated_at,
      created_at: data.created_at,
    };

    // TODO: Parse authorized user if (this.authorized).
    return northstarUser;
  }

}

module.exports = NorthstarClient;
