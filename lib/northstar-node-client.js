'use strict';

// Package version
var VERSION = require('../package.json').version;

class NorthstarClient {

  constructor(options) {
    this.options = options;
    this.VERSION = VERSION;
  }

  debug() {
    console.dir(this, {colors: true, showHidden: true});
  }

}

module.exports = NorthstarClient;
