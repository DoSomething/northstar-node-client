'use strict';

/**
 * NorthstarClient.test
 */
require('dotenv').config({ silent: true });
const NorthstarClient = require('../lib/northstar-client');
const NorthstarUser = require('../lib/northstar-user');
const NorthstarUserAuthorized = require('../lib/northstar-user-authorized');

/**
 * Test Northstar Nodejs client.
 */
describe('NorthstarClient', () => {
  /**
   * Helper: get default client.
   */
  function getUnauthorizedClient() {
    return new NorthstarClient({
      baseURI: process.env.DS_REST_API_BASEURI,
    });
  }
  /**
   * Helper: get default client.
   */
  function getAuthorizedClient() {
    return new NorthstarClient({
      baseURI: process.env.DS_REST_API_BASEURI,
      apiKey: process.env.DS_REST_API_KEY,
    });
  }

  // Without X-DS-REST-API-Key.
  describe('unauthorized', () => {
    /**
     * Helper: validate unauthorized user object.
     */
    function unauthorizedTestUser(user) {
      // TODO: check to be an instance of NorthstarUser.
      user.should.be.an.instanceof(NorthstarUser);

      // Ensure properties and test values.
      user.should.have.properties({
        isAuthorized: false,
        id: '5480c950bffebc651c8b456f',
        firstName: 'test',
        lastInitial: 'L',
        photo: 'https://avatar.dosomething.org/uploads/avatars/5480c950bffebc651c8b456f.jpeg',
        language: 'en-global',
        country: 'US',
        drupalID: '187',
      });

      // Just ensure presence.
      user.should.have.properties(['updatedAt', 'createdAt']);
    }

    // Constructor.
    describe('constructor', () => {
      // Test new instance.
      it('without options should throw a TypeError', () => {
        (() => new NorthstarClient()).should.throw(TypeError);
      });

      // Check API base URL.
      it('base URL option should be set', () => {
        process.env.DS_REST_API_BASEURI.should.be.not.empty();
      });

      // Test new instance.
      it('should create new instance configured correctly', () => {
        const client = getUnauthorizedClient();
        client.should.be.an.instanceof(NorthstarClient);
        client.should.have.property('baseURI').which.is.not.empty();
        client.should.have.property('apiKey').which.is.empty();
      });
    });

    // Get single user.
    describe('getUser()', () => {
      // Check getUser method.
      it('getUser() should be exposed', () => {
        getUnauthorizedClient().getUser.should.be.a.Function();
      });

      // By id.
      it('by id should return correct Northstar user', () => {
        const client = getUnauthorizedClient();
        const response = client.getUser('id', '5480c950bffebc651c8b456f');

        // Check response to be a Promise.
        response.should.be.a.Promise();
        return response.should.eventually.match(unauthorizedTestUser);
      });
    });
  });

  // With X-DS-REST-API-Key.
  describe('authorized', () => {
    /**
     * Helper: validate authorized user object.
     */
    function authorizedTestUser(user) {
      // TODO: check to be an instance of NorthstarUser.
      user.should.be.an.instanceof(NorthstarUser);
      user.should.be.an.instanceof(NorthstarUserAuthorized);

      // Ensure properties and test values.
      user.should.have.properties({
        isAuthorized: true,
        id: '5480c950bffebc651c8b456f',
        firstName: 'test',
        lastName: 'Last',
        lastInitial: 'L',
        photo: 'https://avatar.dosomething.org/uploads/avatars/5480c950bffebc651c8b456f.jpeg',
        email: 'test@dosomething.org',
        mobile: '5555555555',
        interests: [
          'interest number 1',
          'int num 2',
        ],
        birthdate: '1989-05-04 00:00:00',
        addrStreet1: '123',
        addrStreet2: '456',
        addrCity: 'Paris',
        addrState: 'Florida',
        addrZip: '555555',
        source: 'phoenix',
        mobilecommonsID: null,
        parseInstallationIds: [
          'parse-test',
        ],
        mobilecommonsStatus: null,
        language: 'en-global',
        country: 'US',
        drupalID: '187',
      });

      // Just ensure presence.
      user.should.have.properties(['updatedAt', 'createdAt']);
    }

    /**
     * Helper: test user requested with specific type.
     */
    function testUserBy(type, id) {
      const client = getAuthorizedClient();
      const response = client.getUser(type, id);

      // Check response to be a Promise.
      response.should.be.a.Promise();
      return response.should.eventually.match(authorizedTestUser);
    }

    // Constructor.
    describe('constructor', () => {
      // Check API key
      it('Rest API key should be set', () => {
        process.env.DS_REST_API_KEY.should.be.not.empty();
      });

      // Test new instance.
      it('should create new instance configured correctly', () => {
        const client = getAuthorizedClient();
        client.should.be.an.instanceof(NorthstarClient);
        client.should.have.property('baseURI').which.is.not.empty();
        client.should.have.property('apiKey').which.is.not.empty();
      });
    });

    // Get single user.
    describe('getUser()', () => {
      // By id.
      it('by id should return correct Northstar user', () => {
        testUserBy('id', '5480c950bffebc651c8b456f');
      });

      // By email.
      it('by email should return correct Northstar user', () => {
        testUserBy('email', 'test@dosomething.org');
      });

      // By mobile.
      it('by mobile should return correct Northstar user', () => {
        testUserBy('mobile', '5555555555');
      });
    });
  });
});
