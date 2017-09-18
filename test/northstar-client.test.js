'use strict';

require('dotenv').config();

const test = require('ava');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const underscore = require('underscore');

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
  const source = config.testCreateSource;

  const data = {
    email,
    source,
    password: `password+${timestamp}`,
  };

  const client = new NorthstarClient(config);
  const user = await client.Users.create(data);
  user.should.have.property('id');
  t.deepEqual(email, user.email);
  t.deepEqual(source, user.source);
});

test('NorthstarClient.Users.update should return an updated object', async (t) => {
  const userId = config.testUserId;
  const data = {};
  const field = config.testUpdateField;
  const value = underscore.sample(config.testUpdateValues);
  data[field] = value;

  const client = new NorthstarClient(config);
  const user = await client.Users.update(userId, data);
  t.deepEqual(value, user[field]);
});
