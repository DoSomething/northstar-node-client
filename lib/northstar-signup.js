'use strict';

/**
 * NorthstarSignup.
 */

class NorthstarSignup {

  // Construct from JSON.
  constructor(data) {
    this.id = data.id;
    this.campaign = data.campaign.id;
    this.user = data.user.id;
    this.createdAt = data.created_at;
  }

}

module.exports = NorthstarSignup;
