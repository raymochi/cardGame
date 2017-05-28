"use strict";


module.exports = function makeUserHelpers(dataHelpers) {

  // Of note: Each database request opens a new connection, and closes it when done, to avoid connection remaining open.
  return {

    validateLogin: function(user) {
      return dataHelpers.getUserId(user)
        .then( (userId) => {
          return dataHelpers.getUserById(userId);
        })
        .then( (result) => {
          return result;
        })
        .catch( () => {
          console.log('invalid username');
          return;
        })
    },

    registerAccount: function(username, password, email) {
      return dataHelpers.getUserByName(username)
        .then( (user) => {
          if (user) {
            console.log('Username already exists');
            return;
          } else {
            return dataHelpers.getUserByEmail(email)
            .then( (user) => {
              if (user) {
                console.log('email already exists');
                return;
              } else {
                console.log('User added');
                return dataHelpers.insertUser(username, password, email);
              }
            })
          }
        })
    },

    postMessage: function(userId, channel, message) {
      return dataHelpers.insertChat(userId, message);
    },

    generateDeck: function(userId) {
      dataHelpers.insertDeck(userId)
      .then( (deckId) => {
        for (let i = 1; i <= 15; i++) {
          let card = Math.floor(Math.rand(12) + 1);
          dataHelpers.insertCardToDeck(deckId, card, i);

        }
      })
    }

  }
}
