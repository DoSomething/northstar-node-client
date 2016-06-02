'use strict';

/**
 * NorthstarUser.
 */
class NorthstarUser {

  // Construct from JSON.
  constructor(data) {
    // TODO: object id?
    this.id = data.id;

    // String.
    this.firstName = data.first_name;
    this.lastInitial = data.last_initial;

    // TODO: URL?
    this.photo = data.photo;

    // TODO: Symbol?
    this.language = data.language;
    this.country = data.country;

    // TODO: parse int.
    this.drupalID = data.drupal_id;

    // TODO: parse date.
    this.updatedAt = data.updated_at;
    this.createdAt = data.created_at;

    // Computed.
    this.isAuthorized = false;
  }

}

module.exports = NorthstarUser;
