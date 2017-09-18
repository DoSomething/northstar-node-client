'use strict';

const configVars = {
  apiKey: process.env.DS_NORTHSTAR_API_KEY,
  baseURI: process.env.DS_NORTHSTAR_API_BASEURI,
  requiredOptionsMessage: 'Missing required apiKey or baseURI options.',
  testCreateEmailDomain: 'dosomething.org',
  testCreateSource: 'northstar-js-test',
  testUpdateField: 'sms_status',
  testUpdateValue: 'less',
  testUserId: process.env.DS_NORTHSTAR_TEST_USER_ID || '5480c950bffebc651c8b456f',
};

module.exports = configVars;
