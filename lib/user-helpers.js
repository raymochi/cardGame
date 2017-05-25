"use strict";


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeUserHelpers(db) {

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
    }
    // Saves a tweet to `db`
    // saveTweet: function(newTweet, callback) {
    //   simulateDelay(() => {
    //     db.connect(url, (err, db) => {
    //       if (err) {
    //         console.error(`Failed to connect: ${url}`);
    //         throw err;
    //       }
    //       // We have a connection to the "tweeter" db, starting here.
    //       db.collection("tweets").insert(newTweet);
    //       db.close();
    //     });
    //     callback(null, true);
    //   });
    // },
  }
}
