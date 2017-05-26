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

    renderChat: function() {
      return dataHelpers.getChatsByChannel('global');
    },

    postMessage: function(userId, channel, message) {
      return dataHelpers.insertChat(userId, message);
    },

  }
}
