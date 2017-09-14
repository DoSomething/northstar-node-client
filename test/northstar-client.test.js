'use strict';

/**
 * NorthstarClient.test
 */
require('dotenv').config({ silent: true });
const NorthstarClient = require('../lib/northstar-client');
const NorthstarUser = require('../lib/northstar-user');
const NorthstarUserAuthorized = require('../lib/northstar-user-authorized');
const NorthstarSignup = require('../lib/northstar-signup');

const publicUserProperties = [
  'country',
  'createdAt',
  'drupalID',
  'firstName',
  'lastInitial',
  'id',
  'isAuthorized',
  'language',
  'photo',
  'updatedAt',
];
const privateUserProperties = [
  'addrCity',
  'addrStreet1',
  'addrStreet2',
  'addrState',
  'addrZip',
  'birthdate',
  'email',
  'interests',
  'lastName',
  'mobile',
  'mobilecommonsID',
  'mobilecommonsStatus',
  'parseInstallationIds',
  'role',
  'source',
];
const testUserId = '5480c950bffebc651c8b456f';

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
      // Ensure result to be an instance of NorthstarUser.
      user.should.be.an.instanceof(NorthstarUser);

      // Just ensure presence.
      user.should.have.properties(publicUserProperties);
      user.should.not.have.properties(privateUserProperties);
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
    describe('Users.get()', () => {
      // Check getUser method.
      it('Users.get() should be exposed', () => {
        getUnauthorizedClient().Users.get.should.be.a.Function();
      });

      // By id.
      it('by id should return correct Northstar user', () => {
        const client = getUnauthorizedClient();
        const response = client.Users.get('id', testUserId);

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
      // Ensure result to be an instance of NorthstarUserAuthorized.
      user.should.be.an.instanceof(NorthstarUser);
      user.should.be.an.instanceof(NorthstarUserAuthorized);

      // Just ensure presence.
      user.should.have.properties(publicUserProperties);
      user.should.have.properties(privateUserProperties);
    }

    /**
     * Helper: test user requested with specific type.
     */
    function testUserBy(type, id) {
      const client = getAuthorizedClient();
      const response = client.Users.get(type, id);

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
    describe('Users.get()', () => {
      // By id.
      it('by id should return a Northstar user', () => {
        testUserBy('id', testUserId);
      });

      // By email.
      it('by email should return a Northstar user', () => {
        testUserBy('email', 'test@dosomething.org');
      });

      // By mobile.
      it('by mobile should return a Northstar user', () => {
        testUserBy('mobile', '5555555555');
      });
    });

    // Create user.
    describe('Users.create()', () => {
      const client = getAuthorizedClient();
      const timestamp = Date.now();
      const response = client.Users.create({
        email: `test+northstar-js+${timestamp}@dosomething.org`,
        password: `password+${timestamp}`,
        source: 'northstar-js-test',
      });

      response.should.be.a.Promise();
      return response.should.eventually.match(authorizedTestUser);
    });
  });

  describe('signups', () => {
    /**
     * Helper: validate signup object.
     */
    function testSignup(signup) {
      signup.should.be.an.instanceof(NorthstarSignup);
      signup.should.have.properties(['id', 'campaign', 'user', 'createdAt']);
    }
    /**
     * Helper: validate array of signup objects.
     */
    function testSignups(signups) {
      signups.should.be.an.instanceof(Array);
      const signup = signups[0];
      signup.should.match(testSignup);
    }

    describe('Signups.get()', () => {
      it('should be exposed', () => {
        getUnauthorizedClient().Signups.get.should.be.a.Function();
      });

      it('should return a Northstar signup when passed valid id', () => {
        const client = getUnauthorizedClient();
        const response = client.Signups.get(3072);

        response.should.be.a.Promise();
        return response.should.eventually.match(testSignup);
      });

      it('should return an error when Signup is missing User or Campaign', () => {
        const client = getUnauthorizedClient();
        const response = client.Signups.get(23);

        response.should.be.a.Promise();
        return response.should.eventually.throw();
      });
    });

    describe('Signups.index()', () => {
      it('Signups.index() should be exposed', () => {
        getUnauthorizedClient().Signups.index.should.be.a.Function();
      });

      it('Signups.index() should return an array of Northstar signups', () => {
        const client = getUnauthorizedClient();
        const response = client.Signups.index({ user: testUserId });

        response.should.be.a.Promise();
        return response.should.eventually.match(testSignups);
      });
    });
  });
});
