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
    if (data.campaign_run) {
      this.campaignRun = {
        id: data.campaign_run.id,
        current: data.campaign_run.current,
      };
    }
    if (data.reportback) {
      this.reportback = {
        id: data.reportback.id,
        quantity: data.reportback.quantity,
      };
    }
  }

}

module.exports = NorthstarSignup;
