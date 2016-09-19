'use strict';

/**
 * NorthstarReportback.
 */

class NorthstarReportback {

  // Construct from JSON.
  constructor(data) {
    this.id = data.id;
    this.campaign = data.campaign.id;
    this.user = data.user.id;
    this.createdAt = data.created_at;
    this.quantity = data.quantity;
    this.whyParticipated = data.why_participated;
  }

}

module.exports = NorthstarReportback;
