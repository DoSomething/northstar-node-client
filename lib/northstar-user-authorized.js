'use strict';

const NorthstarUser = require('../lib/northstar-user');

/**
 * NorthstarUser.
 */
class NorthstarUserAuthorized extends NorthstarUser {

  // Construct from JSON.
  constructor(data) {
    super(data);

    // Computed.
    this.isAuthorized = true;

    // Data.
    // TODO: check types?
    this.lastName = data.last_name;
    this.email = data.email;
    this.mobile = data.mobile;
    this.interests = data.interests;
    this.birthdate = data.birthdate;
    this.addrStreet1 = data.addr_street1;
    this.addrStreet2 = data.addr_street2;
    this.addrCity = data.addr_city;
    this.addrState = data.addr_state;
    this.addrZip = data.addr_zip;
    this.source = data.source;
    this.mobilecommonsID = data.mobilecommons_id;
    this.parseInstallationIds = data.parse_installation_ids;
    this.mobilecommonsStatus = data.mobilecommons_status;
    this.role = data.role;
  }

}

module.exports = NorthstarUserAuthorized;
