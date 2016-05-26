'use strict';

/**
 * NorthstarClient.test
 */
const NorthstarClient = require('../lib/northstar-client');

/**
 * Test Northstar Nodejs client.
 */
describe('NorthstarClient', () => {
  // Constructor.
  describe('constructor', () => {
    // Test new instance.
    it('should create new instance', () => {
      const client = new NorthstarClient();
      client.should.be.an.instanceof(NorthstarClient);
    });
  });

  describe.skip('method', () => {
    const client = new NorthstarClient();

    // Check methods
    it('getUser() should be exposed', () => {
      client.getUser.should.be.a.Function();
    });
  });


  // Without X-DS-REST-API-Key.
  describe.skip('unauthorized', () => {
    /**
     * Helper: validate unauthorized user object.
     */
    function unauthorizedTestUser(user) {
      // TODO: check to be an instance of NorthstarUser.
      user.should.be.an.Object();

      // Ensure properties and test values.
      user.should.have.properties({
        id: '5480c950bffebc651c8b456f',
        first_name: 'test',
        last_initial: 'L',
        photo: 'https://avatar.dosomething.org/uploads/avatars/5480c950bffebc651c8b456f.jpeg',
        language: 'en-global',
        country: 'US',
        drupal_id: '187',
      });

      // Just ensure presence.
      user.should.have.properties(['updated_at', 'created_at']);
    }

    // Get single user.
    describe('getUser()', () => {
      // By id.
      it('by id should return correct Northstar user', () => {
        const client = new NorthstarClient();
        const response = client.getUser('id', '5480c950bffebc651c8b456f');

        // Check response to be a Promise.
        response.should.be.a.Promise();
        return response.should.eventually.match(unauthorizedTestUser);
      });
    });
  });
});
