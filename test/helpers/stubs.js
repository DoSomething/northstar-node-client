'use strict';

const underscore = require('underscore');

const config = require('../../config/index');

function getUserId() {
  return config.testUserId;
}

function getUserResponse() {
  return {
    // TODO: User chance.js to randomize these properties (aside from user id)
    data: {
      id: module.exports.getUserId(),
      _id: module.exports.getUserId(),
      first_name: 'puppet',
      last_initial: 'P',
      photo: null,
      language: null,
      country: 'US',
      drupal_id: '12345',
      role: 'user',
      updated_at: '2018-09-11T20:53:16+00:00',
      created_at: '2017-02-28T20:50:47+00:00',
    },
  };
}

function getCreateUserPayload() {
  const timestamp = Date.now();
  const email = `test+northstar-js+${timestamp}@${config.testCreateEmailDomain}`;
  const source = config.testCreateSource;

  return {
    email,
    source,
    password: `password+${timestamp}`,
  };
}

function getUpdateUserPayload() {
  const data = {};
  const field = config.testUpdateField;
  const value = underscore.sample(config.testUpdateValues);
  data[field] = value;
  return data;
}

module.exports = {
  getUserId,
  getUserResponse,
  getCreateUserPayload,
  getUpdateUserPayload,
};
