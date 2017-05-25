"use strict";


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  // Of note: Each database request opens a new connection, and closes it when done, to avoid connection remaining open.
  return {

    getUserById: function(id) {
      let userList = db
        .select('*')
        .from('users')
        .where('id', id)
      return userList;
    },

    getUserByName: function(name) {
      return db
        .select('*')
        .from('users')
        .where('username', name)[0];
    },

    getCard: function(id) {
      return db
        .select('*')
        .from('cards')
        .leftJoin('creatures', 'creatures.card_id', 'cards.id')
        .where('id', id);
    },

    getUserDeck: function(userid) {
      return db
        .select('cards.id as id', 'decks.user_id as ownerId', 'cards.name as name', 'cards.type as cardType', 'creatures.front_power as frontPower', 'creatures.side_power as sidePower', 'creatures.type as creatureType' )
        .from('cards')
        .join('deck_cards', 'deck_cards.card_id', 'cards.id')
        .join('decks', 'deck_cards.deck_id', 'decks.id')
        .leftJoin('creatures', 'creatures.card_id', 'cards.id')
        .where('decks.user_id', userid);
    }
  }
}
