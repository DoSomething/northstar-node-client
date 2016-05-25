'use strict';

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

  debug() {
    return this;
  }

}

module.exports = NorthstarClient;
