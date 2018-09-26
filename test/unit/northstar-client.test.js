'use strict';

require('dotenv').config();

const test = require('ava');
const chai = require('chai');
const Promise = require('bluebird');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const underscore = require('underscore');

const config = require('../../config');
const stubsHelper = require('../helpers/stubs');
const NorthstarEndpoint = require('../../lib/northstar-endpoint');

// Module to test
const NorthstarClient = require('../../lib/northstar-client');

chai.should();
chai.use(sinonChai);
const sandbox = sinon.createSandbox();

test.afterEach(() => {
  sandbox.restore();
});

// Tests
test('NorthstarClient should throw error when config.baseURI is undefined', (t) => {
  const testConfig = {
    apiKey: '123',
  };
  const error = t.throws(() => new NorthstarClient(testConfig), Error);
  t.is(error.message, config.requiredOptionsMessage);
});

test('NorthstarClient should throw error when config.apiKey is undefined', (t) => {
  const testConfig = {
    baseUri: '123',
  };
  const error = t.throws(() => new NorthstarClient(testConfig), Error);
  t.is(error.message, config.requiredOptionsMessage);
});

test('NorthstarClient should respond to Users', () => {
  const client = new NorthstarClient(config);
  client.should.have.property('Users');
});

// Tests
test('NorthstarClient.Users.anonGet should call executeGet w/ anonymousRequest on', async () => {
  const response = {
    body: stubsHelper.getUserResponse(),
  };
  sandbox.stub(NorthstarEndpoint.prototype, 'executeGet').returns(Promise.resolve(response));
  const client = new NorthstarClient(config);

  const user = await client.Users.anonGet('id', stubsHelper.getUserId());

  NorthstarEndpoint.prototype.executeGet.should.have.been.calledWith(
    `users/id/${stubsHelper.getUserId()}`,
    undefined,
    true, // anonymousRequest
  );
  user.should.have.property('id');
});

test('NorthstarClient.Users.create should call executePost', async () => {
  const response = {
    body: stubsHelper.getUserResponse(),
  };
  const newUser = stubsHelper.getCreateUserPayload();
  sandbox.stub(NorthstarEndpoint.prototype, 'executePost')
    .returns(Promise.resolve(response));
  const client = new NorthstarClient(config);

  const user = await client.Users.create(newUser);

  NorthstarEndpoint.prototype.executePost.should.have.been.calledWith(
    'users',
    newUser,
  );
  user.should.have.property('id');
});

test('NorthstarClient.Users.update should call executePut', async () => {
  const userId = stubsHelper.getUserId();
  const updatePayload = stubsHelper.getUpdateUserPayload();
  const response = {
    body: stubsHelper.getUserResponse(),
  };
  sandbox.stub(NorthstarEndpoint.prototype, 'executePut')
    .returns(Promise.resolve(response));
  const client = new NorthstarClient(config);

  const user = await client.Users.update(userId, updatePayload);

  NorthstarEndpoint.prototype.executePut.should.have.been.calledWith(
    `users/_id/${userId}`,
    updatePayload,
  );
  user.should.have.property('id');
});
