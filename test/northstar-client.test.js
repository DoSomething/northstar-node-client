'use strict';

require('dotenv').config();

const test = require('ava');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const config = require('../config');

chai.should();
chai.use(sinonChai);

// Module to test
const NorthstarClient = require('../lib/northstar-client');

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

test('NorthstarClient.Users.create should return an object', async (t) => {
  const timestamp = Date.now();
  const email = `test+northstar-js+${timestamp}@${config.testCreateEmailDomain}`;
  const data = {
    email,
    password: `password+${timestamp}`,
    source: config.testCreateSource,
  };

  const client = new NorthstarClient(config);
  const user = await client.Users.create(data);
  user.should.have.property('id');
  t.deepEqual(email, user.email);
  t.deepEqual(config.testCreateSource, user.source);
});
