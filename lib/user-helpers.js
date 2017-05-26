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
          console.log("invalid username");
          return;
        })
    },

    registerAccount: function(username, password, email) {
      return dataHelpers.getUserId(username)
        .then( () => {
          console.log("User already exists");
          return;
        })
        .catch( () => {
          dataHelpers.insertUser(username, password, email);
          console.log("User added");
        })
    },

    getUserByName: function(name) {
      return db
        .select('*')
        .from('users')
        .where('username', name)[0];
    }

  }
}
