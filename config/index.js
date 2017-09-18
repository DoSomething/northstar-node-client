'use strict';

const configVars = {
  apiKey: process.env.DS_NORTHSTAR_API_KEY,
  baseURI: process.env.DS_NORTHSTAR_API_BASEURI,
  requiredOptionsMessage: 'Missing required apiKey or baseURI options.',
  testCreateEmailDomain: 'dosomething.org',
  testCreateSource: 'northstar-js-test',
  testUpdateField: 'sms_status',
  testUpdateValue: 'less',
};

module.exports = configVars;
