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
test('northstarClient should throw error when config.baseURI is undefined', (t) => {
  const testConfig = {
    apiKey: '123',
  };
  const error = t.throws(() => new NorthstarClient(testConfig), Error);
  t.is(error.message, config.requiredOptionsMessage);
});

test('northstarClient should throw error when config.apiKey is undefined', (t) => {
  const testConfig = {
    baseUri: '123',
  };
  const error = t.throws(() => new NorthstarClient(testConfig), Error);
  t.is(error.message, config.requiredOptionsMessage);
});

test('northstarClient should respond to Users', () => {
  const client = new NorthstarClient(config);
  client.should.have.property('Users');
});
