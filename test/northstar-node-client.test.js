'use strict';

/**
 * NorthstarClient.test
 */
const NorthstarClient = require('../lib/northstar-node-client');

/**
 * Test Northstar Nodejs client.
 */
describe('NorthstarClient', () => {

  /* Constructor. */
  describe('constructor', () => {

    /* Test new instance. */
    it('should create new instance', () => {
      const client = new NorthstarClient();
      client.should.be.an.instanceof(NorthstarClient);
    });

  });


});
