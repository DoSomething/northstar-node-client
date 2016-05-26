'use strict';

const Promise = require('bluebird');

/**
 * NorthstarClient
 */

// Package version
const VERSION = require('../package.json').version;

class NorthstarClient {

  constructor(options) {
    this.options = options;
    this.VERSION = VERSION;
  }

  getUser() {
    return new Promise(resolve => resolve(true));
  }

  debug() {
    return this;
  }

}

module.exports = NorthstarClient;
