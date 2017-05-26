"use strict";


module.exports = function makeUserHelpers(dataHelpers) {

  // Of note: Each database request opens a new connection, and closes it when done, to avoid connection remaining open.
  return {

    validateLogin: function(user) {
      let pass = {pass: dataHelpers.getUserDeck(1)}
      return pass;
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
