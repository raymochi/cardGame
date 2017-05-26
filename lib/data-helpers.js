"use strict";


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  // Of note: Each database request opens a new connection, and closes it when done, to avoid connection remaining open.
  return {

    getUserById: function(id) {
      return db
        .select('*')
        .from('users')
        .where('id', id)
        .limit(1)
        .then( (user) => {
          return user[0]
        });
    },

    getUserId: function(name) {
      return db
        .select('id')
        .from('users')
        .where('username', 'like', name)
        .limit(1)
        .then( (user) => {
          return user[0].id
        });
    },

    getUserName: function(userId) {
      return db
        .select('username')
        .from('users')
        .where('id', userId)
        .limit(1)
        .then( (user) => {
          return user[0].username
        });
    },

    getUserByName: function(name) {
      return db
        .select('*')
        .from('users')
        .where('username', 'like', name)
        .limit(1)
        .then( (user) => {
          return user[0]
        });
    },

    getUserByEmail: function(email) {
      return db
        .select('*')
        .from('users')
        .where('email', 'like', email)
        .limit(1)
        .then( (user) => {
          return user[0]
        });
    },

    getCard: function(id) {
      return db
        .select('*')
        .from('cards')
        .leftJoin('creatures', 'creatures.card_id', 'cards.id')
        .where('id', id)
        .limit(1)
        .then( (card) => {
          return card[0];
        });
    },

    getUserDeck: function(userid) {
      return db
        .select('cards.id as id', 'decks.user_id as ownerId', 'cards.name as name', 'cards.type as cardType', 'creatures.front_power as frontPower', 'creatures.side_power as sidePower', 'creatures.type as creatureType' )
        .from('cards')
        .join('deck_cards', 'deck_cards.card_id', 'cards.id')
        .join('decks', 'deck_cards.deck_id', 'decks.id')
        .leftJoin('creatures', 'creatures.card_id', 'cards.id')
        .where('decks.user_id', userid)
        .then((rows) => {
          return rows;
        });
    },

    getUserCreds: function(userId) {
      return db
        .select('users.password as password')
        .from('users')
        .where('users.id', userId)
        .limit(1)
        .then( (pass) => {
          return pass[0].password;
        });
    },

    getUserAvatar: function(userId) {
      return db
        .select('users.avatar as avatar')
        .from('users')
        .where('users.id', userId)
        .limit(1)
        .then( (av) => {
          return av[0].avatar;
        });
    },

    setUserPassword: function(userId, password) {
      return db
        .update('users.password', password)
        .from('users')
        .where('users.id', userId)
        .limit(1);
    },

    setUserName: function(userId, newName) {
      return db
        .update('users.username', newName)
        .from('users')
        .where('users.id', userId)
        .limit(1);
    },

    setUserName: function(userId, newName) {
      return db
        .update('users.username', newName)
        .from('users')
        .where('users.id', userId)
        .limit(1);
    },

    setAvatar: function(userId, avatar) {
      return db
        .update('users.avatar', avatar)
        .from('users')
        .where('users.id', userId)
        .limit(1);
    },

    insertUser: function(username, password, email) {
      return db
        .insert({username: username, password: password, email: email, avatar: 'https://image.flaticon.com/icons/png/128/126/126486.png', rating: '1000'})
        .into('users');
    },

    insertChat: function(userId, message) {
      return db
        .insert({ user_id: userId, channel: 'global', message: message })
        .into('chats');
    },

    getChatsByChannel: function(channel) {
      return db
        .select('*')
        .from('chats')
        .where('channel', 'like', channel)
        .then( (chats) => {
          return chats;
        });
    },

    insertGameArchive: function(user1Id, user2Id, winnerId) {
      return db
        .insert({user1_id: user1Id, user2_id: user2Id, date: new Date, winner_id: winnerId })
        .into('game-archives');
    },

    getGameArchives: function(userId) {
      return db
        .select('*')
        .from('game-archives')
        .where('user1_id', 'like', userId)
        .orWhere('user2_id', 'like', userId)
        .then( (archives) => {
          return archives;
        });
    },

    getGameArchiveById: function(archiveId) {
      return db
        .select('*')
        .from('game-archives')
        .where('id', 'like', archiveId)
        .limit(1)
        .then( (archive) => {
          return archive[0];
        });
    },

    getDecksByUser: function(userId) {
      return db
        .select('*')
        .from('decks')
        .where('user_id', 'like', userId)
        .then( (decks) => {
          return decks;
        });
    },

    getDeckById: function(deckId) {
      return db
        .select('*')
        .from('decks')
        .where('id', deckId)
        .then( (deck) => {
          return deck[0];
        });
    },

    insertDeck: function(userId) {
      return db
        .insert({user1_id: user1Id })
        .into('decks');
    },

  }
}
